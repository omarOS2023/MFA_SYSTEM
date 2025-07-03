const express = require("express");
const {
  signup,
  verifyEmailUser,
  protectCode,
  protectforget,

  uploadUserImage,
  resizeImage,
  faceLogin,
  uploadFaceImage,
  checkOTPLogin,

  forgetPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../services/authService");

// validator function
const {
  resetValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();
// user endpoint
router.post("/signup", uploadUserImage, resizeImage, signup);
router.post("/verifyEmailUser", protectCode, verifyEmailUser);

router.post(
  "/login",

  uploadFaceImage,
  faceLogin
);
router.post("/checkOTP", checkOTPLogin);


router.post("/forgetpass", forgetPassword);
router.post("/verifycode", protectforget, verifyPassResetCode);
router.put("/resetpassword", protectforget, resetValidator, resetPassword);

module.exports = router;
