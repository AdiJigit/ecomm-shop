import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    descriptionOne: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    no: { type: String, unique: true },
    category: { type: String, required: true },
    categoryLink: { type: String, unique: true },
    countInStock: { type: Number, required: true, default: 0 },
    imageIntro: { type: String, required: true },
    imagesColor: [{ type: String, required: true }],
    imagesDifColor: [{ type: String }],
    price: { type: Number, required: true },
    sizes: [{ type: Object, required: true }],
    colors: [{ type: Object }],
    descriptionTwo: [{ type: Object, required: true }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models?.Product || mongoose.model('Product', productSchema);

export default Product;
