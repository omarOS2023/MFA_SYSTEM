const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%*?&])[A-Za-z\d#$@!%*?&]{8,}$/;




exports.resetValidator = [
  check("newPassword")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 6 characters")
    .custom((newPassword, { req }) => {
      if (newPassword !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }
      if (!strongPasswordRegex.test(newPassword)) {
        throw new Error(
          "Password must be at least 8 characters ,have at least one capital letter ,have at least one small letters ,have at least one digit and one special charachter"
        );
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirmation required"),
  validatorMiddleware,
];
