import { Schema, model, Document } from 'mongoose';

const BudgetSchema = new Schema(
    {
        userId: { type: String, required: true },
        categoryName: { type: String, required: true },
        amount: {type: Number,required: true},
        startDate: {type: Date,required: true},
        endDate: {type: Date,required: true},
    },
    {timestamps: true} // Automatically adds `createdAt` and `updatedAt` fields
);

export const Budget = model('Budget', BudgetSchema);

