import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  budget: { type: Number, default: 0 },
  notificationThreshold: { type: Number, default: 0.9 },
}, { timestamps: true });

export const User = model('User', UserSchema);
