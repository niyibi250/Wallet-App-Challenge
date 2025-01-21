import mongoose,{ Schema, model, Types } from 'mongoose';

const AccountSchema = new Schema({
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String, enum: ['debit', 'credit', 'saving'], required: true },
  balance: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Account = model('Account', AccountSchema);
