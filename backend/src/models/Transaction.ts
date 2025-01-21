import mongoose, { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: String },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense', 'saving'], required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
}, { timestamps: true });

export const Transaction = model('Transaction', TransactionSchema);
