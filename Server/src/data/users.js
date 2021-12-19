const bcrypt = require("bcryptjs");
const users = [
  {
    name: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123123", 10),
    isAdmin: true,
  },
  {
    name: "Talhha",
    email: "Talhha@xyz.com",
    password: bcrypt.hashSync("123123", 10),
  },
  {
    name: "user",
    email: "user@user.com",
    password: bcrypt.hashSync("123123", 10),
  },
];
module.exports = users;
