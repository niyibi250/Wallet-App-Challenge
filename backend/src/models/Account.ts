import { Schema, model, Types } from 'mongoose';

const AccountSchema = new Schema({
  userid: { type: String, required: true },              // User ID
  accountName: { type: String, required: true },        // Account name
  accountNumber: { type: String, required: true },    // Account number
  accountType: { 
    type: String, 
    enum: ['Bank', 'Cash', 'MobileMoney'], 
    required: true 
  },                                                   // Account type
  accountBalance: { type: Number, default: 0 },       // Account balance
}, { timestamps: true });

export const Account = model('Account', AccountSchema);
