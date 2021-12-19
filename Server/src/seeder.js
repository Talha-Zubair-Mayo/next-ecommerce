const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const users = require("./data/users");
const User = require("./models/UserModel");

const Product = require("./models/ProductModel");
const products = require("./data/ProductsData");

const connectDb = require("./db/DB");

dotenv.config();
connectDb;

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleData);
    console.log("Data Imported!!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const dataDestory = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destory".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  dataDestory();
} else {
  importData();
}
