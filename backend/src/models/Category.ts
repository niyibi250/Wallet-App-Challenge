import mongoose, { Schema, model, Types } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subcategories: [{ name: { type: String, required: true } }],
}, { timestamps: true });

export const Category = model('Category', CategorySchema);


