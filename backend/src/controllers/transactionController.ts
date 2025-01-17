import { Request, Response } from 'express';
import {Transaction} from '../models/Transaction';

export const addTransaction = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { amount, type, account, category, description, date } = req.body;
        const transaction = new Transaction({ amount, type, account, category, description, date });
        await transaction.save();
        return res.status(201).json({ success: true, transaction });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getTransactions = async (req: Request, res: Response): Promise<Response> => {
    try {
        const transactions = await Transaction.find().populate('account').populate('category');
        return res.status(200).json({ success: true, transactions });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
