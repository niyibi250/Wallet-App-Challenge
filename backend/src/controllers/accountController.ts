import { Request, Response } from 'express';
import {Account} from '../models/Account';

export const createAccount = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, type, balance } = req.body;
        const account = new Account({ name, type, balance });
        await account.save();
        return res.status(201).json({ success: true, account });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getAccounts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const accounts = await Account.find();
        return res.status(200).json({ success: true, accounts });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
