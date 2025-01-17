import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';

// Interface for creating a transaction
export interface CreateTransactionRequestBody {
    userid: string;
    type: 'income' | 'expense'; // Type of transaction (e.g., 'income' or 'expense')
    amount: number;             // Amount of the transaction
    accountid: string;          // Associated account ID for the transaction
    categoryid?: string;        // Optional category ID for the transaction
    description?: string;       // Optional description for the transaction
    date?: Date;                // Optional transaction date
}

// Interface for updating a transaction
export interface UpdateTransactionRequestBody {
    type?: 'income' | 'expense'; // Optional update for transaction type
    amount?: number;             // Optional update for transaction amount
    accountid?: string;          // Optional update for associated account
    categoryid?: string;         // Optional update for transaction category
    description?: string;        // Optional update for transaction description
    date?: Date;                 // Optional update for transaction date
}

// Create a transaction
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userid, type, amount, accountid, categoryid, description, date } = req.body as CreateTransactionRequestBody;

        const transaction = new Transaction({ 
            userid, 
            type, 
            amount, 
            accountid, 
            categoryid, 
            description, 
            date: date || new Date() 
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
        const { userid } = req.body;

        const transactions = await Transaction.find({ userid });
        res.status(200).json({ success: true, transactions });
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
