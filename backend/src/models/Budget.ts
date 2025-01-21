import mongoose, { Schema, model, Document } from 'mongoose';

const BudgetSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    },
    { timestamps: true }
);

export const Budget = model('Budget', BudgetSchema);
