const jwt = require("jsonwebtoken");
const Users = require("../Models/UserModel");

const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(422).json({ msg: "Invalid Authentication " });
    }
    const TokenData = jwt.verify(token, process.env.AccessTokenKey);
    if (!TokenData) {
      res.status(422).json({ msg: "Invalid Authentication " });
    } else {
      const userr = await Users.findById({ _id: TokenData._id }).select(
        "avatar fullname username email gender mobile  adress story following followers  website"
      );      req.user = userr;
      next();
    }

    // else {
    //       jwt.verify(token, process.env.AccessTokenKey, (err, user) => {
    //     if (err) {
    //       res.status(422).json({ msg: err.message });
    //     } else {
    //       const userr = Users.findOne({ _id: user._id });
    //       console.log(userr)
    //       req.user = userr;
    //       next();
    //     }
    //   });
    //}
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

module.exports = Auth;
