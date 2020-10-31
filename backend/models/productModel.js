// Product Model holds all the products available in the virtual pet store.
// Admin users will be able to do all the CRUD operations on this model.
// Ordinary users (Buyers) can only read it.
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema(
  {
    petClass: { type: String, required: true},
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
