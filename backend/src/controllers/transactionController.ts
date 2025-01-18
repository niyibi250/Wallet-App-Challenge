import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { User } from '../models/User';

// Interface for creating a transaction
export interface CreateTransactionRequestBody {
    userId: string;
    type: 'income' | 'expense';
    amount: number;
    accountName: string;
    categoryName?: string;
    description?: string;
    date?: Date;
}

// Interface for updating a transaction
export interface UpdateTransactionRequestBody {
    type?: 'income' | 'expenses' | 'savings';
    amount?: number;
    accountName?: string;
    categoryName?: string;
    description?: string;
    date?: Date;
}

// Create a transaction
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    try {
        const { userId, type, amount, accountName, categoryName, description, date } = req.body as CreateTransactionRequestBody;

        const transaction = new Transaction({
            userId,
            type,
            amount,
            accountName,
            categoryName,
            description,
            date: date || new Date(),
        });

        await transaction.save();
        res.status(201).json({ success: true, transaction });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all transactions for a user
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.query;
        const userExists = await User.findById( userId );
        if (userExists) {
            const transactions = await Transaction.find({ userId });
        res.status(200).json({ success: true, transactions });
        } else {
            res.status(404).json({ success: false, message: 'User does not exist' });
        }
        
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body as UpdateTransactionRequestBody, { new: true });

        if (!updatedTransaction) {
            res.status(404).json({ success: false, message: 'Transaction not found' });
            return;
        }

        res.status(200).json({ success: true, transaction: updatedTransaction });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            res.status(404).json({ success: false, message: 'Transaction not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'Transaction deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
