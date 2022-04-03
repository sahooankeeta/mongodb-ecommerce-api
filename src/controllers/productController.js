const Product = require("./../models/product");
//create new product
module.exports.createProduct = async function (req, res) {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        status: "fail",
        message: "product name missing",
      });
    }
    const newProduct = await Product.create(req.body);
    return res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
      message: "new product added",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//fetch all products
module.exports.getProducts = async function (req, res) {
  try {
    let products = await Product.find();
    return res.status(200).json({
      status: "success",
      data: {
        product: products,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//delete a product with the help of id
module.exports.deleteProduct = async function (req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      status: "success",
      data: {
        message: "product deleted",
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//update product quantity
module.exports.updateProduct = async function (req, res) {
  try {
    //fetch product
    const product = await Product.findById(req.params.id);
    //update quantity
    product.quantity = req.query.number;
    //save changes
    await product.save();
    return res.status(201).json({
      status: "success",
      data: {
        product,
        message: "product updated ",
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
