import { body, validationResult } from "express-validator";

const rules = [
  body("email").trim().notEmpty().isEmail().withMessage("Enter valid email!"),
  body("password1")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Password should be minimum of length 5!"),

  body("password2")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Password should be minimum of length 5")
    .custom((value, { req }) => {
      return value === req.body.password1;
    })
    .withMessage("Password doesnt match!"),

  body("options")
    .trim()
    .custom((value, { req }) => {
      return value === "jobseeker" || value === "recruiter";
    })
    .withMessage("Something Went wrong!"),
];
const validateRequest = async (req, res, next) => {
  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);
  //  if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("register", {
      data: validationErrors.array()[0].msg,
    });
  }
  next();
};
export default validateRequest;
