import { Schema, model, Types } from 'mongoose';

const CategorySchema = new Schema({
  userId: { type: String, required: true },
  categoryName: { type: String, required: true },
  subcategories: [{ type: String }]
}, { timestamps: true });

export const Category = model('Category', CategorySchema);


