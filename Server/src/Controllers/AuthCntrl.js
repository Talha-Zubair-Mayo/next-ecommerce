const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CLIENT_URL = process.env.Client_URL;
const SendMail = require("../middlewares/SendEmail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");
const FotgotPassword = require("../EmailTemplates/FotgotPassword");
const ConfirmAccount = require("../EmailTemplates/ConfirmAccount");
const client = new OAuth2(process.env.Mail_Service_Client_ID);

const AuthCntrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      if (!fullname || !username || !email || !password || !gender) {
        return res.status(404).json({
          msg: "Please Fill All Fields",
        });
      }
      const User_Email = email.toLowerCase();
      const emailexist = await User.findOne({ email: User_Email });
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
        fullname,
        email,
        password: passwordHash,
        gender,
      });
      const UserActivation = { _id: newUser._id, isEmailVerified: true };

      const Activation_Token = ActivationToken(UserActivation);

      const url = `${CLIENT_URL}/api/activateEmail/${Activation_Token}`;
      const html = await ConfirmAccount(url);
      await SendMail(email, html, "Confirm Your Account");
      await newUser.save();

      res.status(200).json({
        msg: "Register Success! Please Confirm your email to start.",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;

      const user = jwt.verify(activation_token, process.env.AccessTokenKey);
      const { _id, isEmailVerified } = user;
      const newData = { isEmailVerified: isEmailVerified };
      await User.findByIdAndUpdate({ _id: _id }, newData, {
        new: true,
      });
      res.json({ msg: "Account has been activated! Please Login" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
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
        return res.status(422).json({ msg: " User Does'nt Exist" });
      }
      if (!user.isEmailVerified) {
        return res
          .status(422)
          .json({ msg: "Please Verify Your Email First..." });
      }
      if (user.isGoogleLogged) {
        return res.status(422).json({ msg: "Please Login With Google" });
      }
      if (user.isFacebookLogged) {
        return res.status(422).json({ msg: "Please Login With Facebook" });
      }

      // Comparing Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect email or password." });
      }
      // Create Cookie After Logged in
      const AccessToken = CreateAccessToken({ _id: user._id });
      const RefreshToken = CreateRefreshToken({ _id: user._id });

      res.cookie("SocialToken", RefreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        msg: "Login Success!",
        AccessToken,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      try {
        res.clearCookie("SocialToken");
        res.status(200).json({ msg: "Logged out Successfully" });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    } catch (error) {}
  },
  generateAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.SocialToken;

      if (!rf_token) {
        res.status(422).json({ msg: "Please Login orrrr register " });
      }
      jwt.verify(rf_token, process.env.ReFreshTokenKey, async (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now." });
        const userr = await User.findById(user._id)
          .select(
            "avatar fullname  email gender mobile"
          )
          .populate(
            "avatar  fullname  "
          );

        if (!userr)
          return res.status(400).json({ msg: "This does not exist." });

        const access_token = CreateAccessToken({ _id: user._id });

        res.json({
          token: access_token,
          user: userr,
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const activationToken = ActivationToken({ _id: user._id });
      const url = `${CLIENT_URL}/api/resetpass/${activationToken}`;
      const html = FotgotPassword(url);

      SendMail(email, html, "Forget Password ?");
      res
        .status(200)
        .json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, cf_password } = req.body;
      if (password !== cf_password) {
        res.status(422).json({ msg: "Password Does not match!" });
      }
      // Password length
      if (password.length < 6) {
        return res
          .status(422)
          .json({ msg: "Password Must Be Greater Than 6 " });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          password: passwordHash,
          isGoogleLogged: false,
        },
        {
          new: true,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;
      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.Mail_Service_Client_ID,
      });
      const { name, email, picture, email_verified } = verify.payload;
      const password = email + process.env.Google_Password_Key;
      const passwordHash = await bcrypt.hash(password, 12);

      const str = email;
      const ressss = str.split("@")[0];

      if (!email_verified)
        return res.status(400).json({ msg: "Email verification failed." });

      const user = await User.findOne({ email: email });

      if (user) {
        if (!user.isGoogleLogged) {
          return res
            .status(422)
            .json({ msg: "Please Login With Email And Password..." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });
        const RefreshToken = CreateRefreshToken({ _id: user._id });

        res.cookie("SocialToken", RefreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success!" });
      } else {
        const newUserr = new User({
          fullname: name,
          email,
          isEmailVerified: email_verified,
          isGoogleLogged: email_verified,
          password: passwordHash,
          avatar: { url: picture },
        });
        await newUserr.save();
        const RefreshToken = CreateRefreshToken({ _id: newUserr._id });

        res.cookie("SocialToken", RefreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success!" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const { accessToken, userID } = req.body;
      const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });
      const { email, name, picture } = data;
      const password = email + process.env.Facebook_Password_Key;
      const passwordHash = await bcrypt.hash(password, 12);
      const string = email;
      const user = await User.findOne({ email: email });

      if (user) {
        if (user.isGoogleLogged) {
          return res.status(422).json({
            msg: "Email Associate with this Account Already Used Via Google login....",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });
        const RefreshToken = CreateRefreshToken({ _id: user._id });

        res.cookie("SocialToken", RefreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success!" });
      } else {
        const newUserr = new User({
          fullname: name,
          email,
          isEmailVerified: true,
          isFacebookLogged: true,
          password: passwordHash,
          avatar: { url: picture.data.url },
        });
        await newUserr.save();
        const RefreshToken = CreateRefreshToken({ _id: newUserr._id });

        res.cookie("SocialToken", RefreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success!" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
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
const ActivationToken = (payload) => {
  return jwt.sign(payload, process.env.AccessTokenKey, {
    expiresIn: "60m",
  });
};

module.exports = AuthCntrl;
