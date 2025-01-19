import { Request, Response } from 'express';
import { Account } from '../models/Account';
import { User } from '../models/User';

// Interface for updating an account
export interface UpdateAccountRequestBody {
    accountName?: string;    // Optional update for account name
    accountType?: string;    // Optional update for account type
    accountBalance?: number; // Optional update for account balance
}

// Interface for creating an account
export interface CreateAccountRequestBody {
    userid: string;
    accountName: string;     // Name of the account
    accountNumber: string;   // Unique identifier for the account
    accountType: string;     // Type of the account (e.g., Bank, Cash, MobileMoney)
    accountBalance: number;  // Initial balance of the account
}

export const createAccount = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    try {
        const { userid,accountName, accountNumber, accountType, accountBalance } = req.body as CreateAccountRequestBody;
        const userExists = await User.findById( userid );
        if (userExists) {
            const account = new Account({ userid,accountName, accountNumber, accountType, accountBalance });
            await account.save();
            res.status(201).json({ success: true, account });
        } else {
            res.status(404).json({ success: false, message: 'User does not exist' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getAccounts = async (req: Request, res: Response): Promise<void> => {
    console.log(req.query)
    try {
        const { userId } = req.query;
        const userExists = await User.findById( userId );
        if (userExists) {
            const accounts = await Account.find();
            res.status(200).json({ success: true, accounts });
        } else {
            res.status(404).json({ success: false, message: 'User does not exist' });
        }
        
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedAccount = await Account.findByIdAndUpdate(id, req.body as UpdateAccountRequestBody, { new: true });
        if (!updatedAccount) {
            res.status(404).json({ success: false, message: 'Account not found' });
            return;
        }
        res.status(200).json({ success: true, account: updatedAccount });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndDelete(id);
        if (!account) {
            res.status(404).json({ success: false, message: 'Account not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Account deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
