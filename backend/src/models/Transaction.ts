import { Schema, model, Types } from 'mongoose';

const TransactionSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  account: { type: Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  category: { type: Types.ObjectId, ref: 'Category', required: false },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Transaction = model('Transaction', TransactionSchema);
