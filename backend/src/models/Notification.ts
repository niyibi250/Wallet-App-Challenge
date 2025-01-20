import mongoose, { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  });

  export const Notification = model('Notification', notificationSchema);