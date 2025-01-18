import { Schema, model, Types } from 'mongoose';

const AccountSchema = new Schema({
  userid: { type: String, required: true },       
  accountName: { type: String, required: true },    
  accountNumber: { type: String, required: true }, 
  accountType: { 
    type: String, 
    enum: ['Bank', 'Cash', 'MobileMoney'], 
    required: true 
  },                                             
  accountBalance: { type: Number, default: 0 },
}, { timestamps: true });

export const Account = model('Account', AccountSchema);
