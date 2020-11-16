import express from 'express';
import Product from '../models/productModel';
import Order from '../models/orderModel';
import data from '../data.js';

const router = express.Router();

router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();
    for (var i =1; i<= 9; i++) {
      var newProducts = data.products.map((prod) => { return {...prod, name: prod.name + " - T" + i}});
      var insertedProds = await Product.insertMany(newProducts);
    }
    res.send(insertedProds);	
  } catch (error) {
    res.status(404).send({msg: "ERROR => " + error});
  }
});

router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const petClass = req.query.petClass ? { petClass: req.query.petClass } : {};
  console.log("petClass = " + JSON.stringify(petClass));
  console.log("category = " + JSON.stringify(category));
  const products = await Product.find({ ...category, ...petClass });
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});

router.post('/:id/reviews', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {

      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if(product) {
    product.petClass = req.body.petClass;
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', async (req, res) => {
  const product = new Product({
    petClass: req.body.petClass,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

export default router;
