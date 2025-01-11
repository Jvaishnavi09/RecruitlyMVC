import { body, validationResult } from "express-validator";
const rulesLogin = [
  body("email").trim().notEmpty().isEmail().withMessage("Enter valid email!"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Password should be minimum of length 5!"),
];
const validateRequest = async (req, res, next) => {
  await Promise.all(rulesLogin.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);
  //  if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("login", {
      data: validationErrors.array()[0].msg,
    });
  }
  next();
};
export default validateRequest;
