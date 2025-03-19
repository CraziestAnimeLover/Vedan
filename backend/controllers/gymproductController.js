import Product from "../models/GymProduct.js";

// @desc Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Create a new product
export const createProduct = async (req, res) => {
    console.log("Files received:", req.files); // Debugging step
    console.log("Body received:", req.body);

    if (!req.body.name || !req.body.category || !req.body.price) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const productData = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        manufacturingBy: req.body.manufacturingBy,
        image: req.files?.image ? req.files.image[0].filename : null, 
        description: req.files?.description ? req.files.description[0].filename : null, 
    };

    try {
        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc Update a product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.manufacturingBy = req.body.manufacturingBy || product.manufacturingBy;
    
    if (req.file) {
      product.image = req.file.path;
    }
    if (req.files["description"]) {
      product.description = req.files["description"][0].path;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
