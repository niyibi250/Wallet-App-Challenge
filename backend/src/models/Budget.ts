import { Schema, model, Document } from 'mongoose';

const BudgetSchema = new Schema(
    {
        amount: {type: Number,required: true,min: [0, 'Budget amount must be a positive number']},
        startDate: {type: Date,required: true},
        endDate: {type: Date,required: true},
    },
    {timestamps: true} // Automatically adds `createdAt` and `updatedAt` fields
);

export const Budget = model('Budget', BudgetSchema);

