const router = require("express").Router();
const UserCntrl = require("../Controllers/UserCntrl");
// const auth = require("../middlewares/auth");

router.post("/login", UserCntrl.login);
router.get("/token", UserCntrl.refreshtoken);
router.get("/logout", UserCntrl.logout);
// router.get("/userProfile", auth, UserCntrl.userProfile);
router.get("/userProfile", UserCntrl.userProfile);

router.post("/register", UserCntrl.register);
// router.patch("/updateUser", auth , UserCntrl.updateUser);

module.exports = router;
