const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      trim: true,
      maxlength: 50,
    },
    // username: {
    //   type: String,
    //   require: true,
    //   trim: true,
    //   maxlength: 50,
    //   unique: true,
    //   lowercase: true,
    // },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true,
      lowercase: true,
      maxlength: 50,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: Object,
      default: {
        url: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isGoogleLogged: {
      type: Boolean,
      required: true,
      default: false,
    },
    isFacebookLogged: {
      type: Boolean,
      required: true,
      default: false,
    },
    // gender: { type: String, default: "male" },
    phone: { type: String, default: "" },
    // adress: { type: String, default: "" },

    // story: {
    //   type: String,
    //   require: true,
    //   trim: true,
    //   maxlength: 200,
    // },
    // website: { type: String, default: "" },

    // following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    // followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
