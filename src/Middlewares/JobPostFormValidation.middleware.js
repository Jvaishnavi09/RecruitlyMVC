import { body, validationResult } from "express-validator";
import { skills } from "../../constants/dropDownMenu.js";
import { jobCategories as jobCate } from "../../constants/dropDownMenu.js";
import { jobDesignations as jobDesi } from "../../constants/dropDownMenu.js";
import { locations } from "../../constants/dropDownMenu.js";
const rules = [
  body("jobCategory")
    .trim()
    .notEmpty()
    .withMessage("JOB Category cannot be empty !"),
  body("jobdesignation")
    .trim()
    .notEmpty()
    .withMessage("JOB Designation cannot be empty !"),
  body("companyname")
    .trim()
    .notEmpty()
    .withMessage("Company Name  cannot be empty !"),
  body("jobLocation")
    .trim()
    .notEmpty()
    .withMessage("JOB Location cannot be empty !"),
  body("skillsrequired")
    .notEmpty()
    .isArray()
    .withMessage("Skills Required  must have an value .")
    .custom((array) => array.length > 0) // Custom validation to check array length
    .withMessage("Skills Required  must have an value ."),
  body("numberofopenings")
    .notEmpty()
    .withMessage("Number of openings must have value")
    .isString()
    .matches(/^\d+$/)
    .withMessage("Number of openings must be an integer"),
  body("applyby").notEmpty().isString().withMessage("Please select a Date"),
  body("minimumpay")
    .notEmpty()
    .withMessage("Minimum Pay must have value")
    .isString()
    .matches(/^\d+$/)
    .withMessage("Minimum Pay must be an integer"),
  body("maximumpay")
    .notEmpty()
    .withMessage("Maximum Pay must have value")
    .isString()
    .matches(/^\d+$/)
    .withMessage("Maximum Pay must be an integer"),
];
const validateRequest = async (req, res, next) => {
  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);
  //  if errros, return the error message
  if (!validationErrors.isEmpty()) {
    console.log(req.url, validationErrors);
    if (req.url === "/newjobs") {
      console.log(req.body);
      return res.render("JobPostForm", {
        skills,
        jobCate,
        jobDesi,
        locations,
        data: validationErrors.array()[0].msg,
      });
    }
  }
  next();
};
export default validateRequest;
