const mongoose = require("mongoose");
const DB = process.env.DB_Connect;
const dotenv = require("dotenv");

/* Creating a Database */
mongoose
  .connect(
    "mongodb+srv://tkashi328:Talha328@cluster0.nhvqq.mongodb.net/NextEcommeraceApp?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Connected To Online Db Successfully...... `.inverse.yellow);
  })
  .catch((err) => {
    console.log(`${err}`.inverse.red);
  });
