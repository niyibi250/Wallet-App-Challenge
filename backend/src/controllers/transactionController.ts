import { Request, Response } from 'express';
import {Transaction} from '../models/Transaction';

export interface CreateTransactionRequestBody {
    userid: string;
    type: string;          // Type of transaction (e.g., 'income' or 'expense')
    amount: number;        // Amount of the transaction
    account: string;       // Associated account for the transaction
    category: string;      // Category for the transaction
}

export interface UpdateTransactionRequestBody {
    type?: string;          // Optional update for transaction type
    amount?: number;        // Optional update for transaction amount
    account?: string;       // Optional update for associated account
    category?: string;      // Optional update for transaction category
}
// Create a transaction
export const createTransaction = async (req: Request, res: Response) => {
    try {
        const { userid,type, amount, account, category } = req.body as CreateTransactionRequestBody
        const transaction = new Transaction({ user: userid, type, amount, account, category });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Get all transactions
export const getTransactions = async (req: Request, res: Response) => {
    try {
        const { userid } = req.params;
        const transactions = await Transaction.find({ user: userid });
        res.status(200).json(transactions);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedTransaction);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};
