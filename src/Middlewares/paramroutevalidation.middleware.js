import { param, validationResult } from "express-validator";
const rules = [
  param("id").isInt().withMessage("ID must be an integer").toInt(), // Converts the param to an integer
];
const validateRequest = async (req, res, next) => {
  await Promise.all(rules.map((rule) => rule.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export default validateRequest;
