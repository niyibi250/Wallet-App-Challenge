import { Schema, model, Types } from 'mongoose';

const SubCategorySchema = new Schema({
  name: { type: String, required: true },
  id: { type: Types.ObjectId, default: Types.ObjectId },
});

const CategorySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  categoryName: { type: String, required: true },
  subcategories: [SubCategorySchema]
}, { timestamps: true });

export const Category = model('Category', CategorySchema);

