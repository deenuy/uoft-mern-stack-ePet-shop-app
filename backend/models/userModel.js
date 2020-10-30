// User models holds all the users authorized to use the app.
// User password will be safely saved in the database using cryptography
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
