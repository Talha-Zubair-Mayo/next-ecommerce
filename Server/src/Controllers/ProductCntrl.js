const Product = require("../Models/ProductModel");

const ProductCntrl = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find({});
      if (products) {
        res.json(products);
        console.log("Products Fetched".green.inverse);
      } else {
        res.status(404).json({ message: "Products Not Found" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else if (!product) {
        res.status(404).json({ message: "Product Not Found" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = ProductCntrl;
