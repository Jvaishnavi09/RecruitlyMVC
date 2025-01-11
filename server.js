import path from "path";
import JobController from "./src/Controller/job.controller.js";
import UserController from "./src/Controller/user.controller.js";
import ApplicantController from "./src/Controller/applicant.controller.js";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import validateRegisterForm from "./src/Middlewares/RegisterFormvalidation.middleware.js";
import validateLoginForm from "./src/Middlewares/LoginFormvalidation.middleware.js";
import paramroutevalidation from "./src/Middlewares/paramroutevalidation.middleware.js";
import applicantFormValidation from "./src/Middlewares/applicantFormValidation.middleware.js";
import jobFormValidation from "./src/Middlewares/JobPostFormValidation.middleware.js";
import { uploadFile } from "./src/Middlewares/multerMiddleware.js";
import { userAuth, recruiterAuth } from "./src/Middlewares/AuthMiddleware.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import setLastVisit from "./src/Middlewares/cookieParser.middleware.js";
import dotenv from "dotenv";
dotenv.config();

const server = express();

//using Veiw Engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "Views"));

//Global Middlewares
server.use(expressEjsLayouts);
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

//Implement Session
server.use(
  session({
    secret: "{-EO{V%LNL#B2TP",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//CookieParser
server.use(cookieParser());
server.use(setLastVisit);

//dynamically setting locals based on session
server.use((req, res, next) => {
  res.locals.login = req.session?.userEmail ? true : false;
  res.locals.access = req.session?.userAccess === "recruiter" ? true : false;
  res.locals.email = req.session?.userEmail ? req.session.userEmail : "";
  next();
});

//Object creation for controllers
const jobController = new JobController();
const userController = new UserController();
const applicantController = new ApplicantController();
//Routes Handling
server.get("/", jobController.getHomePage);
server.get("/jobs", jobController.getJobs);
server.get("/jobs/:id", paramroutevalidation, jobController.getJobById);
server.get("/login", userController.login);
server.get("/register", userController.register);
server.get("/newjobs", recruiterAuth, jobController.getNewJobPage);
server.get("/jobs/:id/apply", userAuth, applicantController.getApplyForm);
server.get("/Error", jobController.getErrorPage);
server.get("/jobs/:id/edit", recruiterAuth, jobController.getEditForm);
server.get("/jobsCreated", recruiterAuth, jobController.getCreatedJobPage);
server.get("/jobs/:id/delete", jobController.deleteJobById);
server.get("/logout", userController.logoutUser);
server.get(
  "/jobs/:id/fetchApplicants",
  recruiterAuth,
  jobController.fetchApplicants
);
server.get("/appliedJobs", userAuth, jobController.getAppliedJobsByUserEmail);
server.get("/search", jobController.getJobsByName);
server.post("/login", validateLoginForm, userController.postlogin);
server.post("/register", validateRegisterForm, userController.postRegister);
server.post(
  "/newjobs",
  jobFormValidation,
  recruiterAuth,
  jobController.addjobs
);
server.post(
  "/jobs/:id/apply",
  uploadFile.single("resume"),
  applicantFormValidation,
  applicantController.postapply
);
server.post("/jobs/:id/edit", recruiterAuth, jobController.updateJob);

// Catch-all route for unmatched paths
server.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error); // Pass the error to the error-handling middleware
});
//Error handler middleware
server.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).render("Error", { error: err });
});

server.listen(3001);

export default server;
