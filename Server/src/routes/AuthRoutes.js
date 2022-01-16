const router = require("express").Router();

const AuthCntrl = require("../Controllers/AuthCntrl");
const AccountAuth = require("../middlewares/Auth");

router.post("/register", AuthCntrl.register);
router.post("/login", AuthCntrl.login);
router.get("/logout", AuthCntrl.logout);
router.get("/refresh_Token", AuthCntrl.generateAccessToken);
router.patch("/activateEmail", AuthCntrl.activateEmail);
router.post("/forgotPassword", AuthCntrl.forgotPassword);
router.patch("/resetpassword", AccountAuth, AuthCntrl.resetPassword);
router.post("/googleLogin", AuthCntrl.googleLogin);
router.post("/facebookLogin", AuthCntrl.facebookLogin);

module.exports = router;
