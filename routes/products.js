const express = require("express");
const bodyParser = require("body-parser");
const productController = require("./../controllers/productController");
const router = express.Router();

//to add new product to the database
router.post("/create", productController.createProduct);

//update a specific product in the database
router.patch("/:id/update_quantity", productController.updateProduct);

//delete a specific product in the database
router.delete("/:id", productController.deleteProduct);

//fetch all products from the database
router.get("/", productController.getProducts);

module.exports = router;
