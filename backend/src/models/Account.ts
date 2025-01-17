import { Schema, model, Types } from 'mongoose';

const AccountSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
}, { timestamps: true });

export const Account = model('Account', AccountSchema);
