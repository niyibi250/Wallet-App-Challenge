import { Schema, model, Types } from 'mongoose';

const CategorySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  parentCategory: { type: Types.ObjectId, ref: 'Category', default: null },
}, { timestamps: true });

export const Category = model('Category', CategorySchema);
