import { body, validationResult } from "express-validator";
const rules = [
  body("InputEmail")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Enter valid email!"),
  body("InputName").trim().notEmpty().withMessage("name should not be Empty!"),
  body("InputContact")
    .isMobilePhone()
    .withMessage("Enter Valid Mobile Number "),
  body("resume").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("File is Not Uploaded");
    }
    return true;
  }),
];
const validateRequest = async (req, res, next) => {
  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);
  //  if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("ApplyJob", {
      error: validationErrors.array()[0].msg,
      id: req.params.id,
    });
  }
  next();
};
export default validateRequest;
