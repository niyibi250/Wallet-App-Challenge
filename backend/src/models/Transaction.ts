import { Schema, model, Types } from 'mongoose';

const TransactionSchema = new Schema({
  userid: {type: String,required:true},
  accountid: { type:String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  categoryid: { type: String, required: false },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Transaction = model('Transaction', TransactionSchema);
