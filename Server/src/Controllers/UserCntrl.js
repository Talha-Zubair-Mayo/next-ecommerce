const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserCntrl = {
  register: async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    try {
      //Checking Existing Email
      const emailexist = await User.findOne({ email: email });
      // Checking All Feilds Available
      if (!name || !email || !password || !confirmpassword) {
        res.status(422).json({ msg: "Please Fill All Feilds" });
      } else if (password !== confirmpassword) {
        res.status(422).json({ msg: "Password Does not match!" });
      }
      if (emailexist) {
        return res.status(422).json({ msg: "Email Already Exist" });
      }
      // Password length
      if (password.length < 6) {
        return res
          .status(422)
          .json({ msg: "Password Must Be Greater Than 6 " });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email: email,
        password: passwordHash,
      });

      // save to mongoDB
      const regUser = await newUser.save();
      console.log(regUser);

      // Create JsonWebToken to AuthenTication
      const AccessToken = CreateAccessToken({ _id: newUser._id });
      const RefreshToken = CreateRefreshToken({ _id: newUser._id });
      res.cookie("ShoppingApptoken", RefreshToken, {
        httpOnly: true,
        path: "user/RefreshToken",
      });
      //   res.send(AccessToken);
      res.status(200).json({ msg: "User Registered Successfully" });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Checking All Feilds Available
      if (!email || !password) {
        return res.status(422).json({ msg: "Please Fill All Feilds" });
      }
      const emaill = email.toLowerCase();

      //Checking Existing User
      const user = await User.findOne({ email: emaill });
      if (!user) {
        return res
          .status(422)
          .json({ msg: " User Does'nt Exist", status: 422 });
      }
      // Comparing Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect email or password." });
      }
      // Create Cookie After Logged in
      const AccessToken = CreateAccessToken({ _id: user._id });
      const RefreshToken = CreateRefreshToken({ _id: user._id });

      res.cookie("ShoppingApptoken", RefreshToken, {
        httpOnly: true,
        path: "user/RefreshToken",
      });
      res.status(200).json({ msg: "Logged in...." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.ShoppingApptoken;

      if (!rf_token) {
        res.status(422).json({ msg: "Please Login or register " });
      } else {
        jwt.verify(rf_token, process.env.ReFreshTokenKey, (err, user) => {
          if (err) res.status(422).json({ msg: "Please Login or register " });
          const accesstoken = CreateAccessToken({ _id: user._id });
          res.status(200).json({ user, accesstoken, rf_token });
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("ShoppingApptoken", { path: "user/RefreshToken" });
      res.status(200).json({ msg: "Logged out Successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  userProfile: async (req, res) => {
    try {
      const userProfile = await User.findById(req.user._id).select("-password");
      if (userProfile) {
        res.json(userProfile);
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server Error" });
    }
  },
  fullname: "",
  mobile: "",
  address: "",
  website: "",
  story: "",
  gender: "",
};

const CreateAccessToken = (user) => {
  return jwt.sign(user, process.env.AccessTokenKey, {
    expiresIn: "1d",
  });
};

const CreateRefreshToken = (user) => {
  return jwt.sign(user, process.env.ReFreshTokenKey, {
    expiresIn: "7d",
  });
};
module.exports = UserCntrl;
