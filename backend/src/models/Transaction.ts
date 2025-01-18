import { Schema, model, Types } from 'mongoose';

const TransactionSchema = new Schema({
  userId: {type: String,required:true},
  accountName: { type:String, required: true },
  type: { type: String, enum: ['Income', 'Expense', 'Saving'], required: true },
  amount: { type: Number, required: true },
  categoryName: { type: String, required: false },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Transaction = model('Transaction', TransactionSchema);
