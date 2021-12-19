require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
dotenv.config();
require("colors");
const app = express();
const cors = require("cors");
require("./db/DB");
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(cookieparser());
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
app.use("/api/", product);

app.listen(process.env.PORT || port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on Port ${port}`.inverse
  );
});
