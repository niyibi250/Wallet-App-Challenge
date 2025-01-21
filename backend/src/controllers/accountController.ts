import { Request, Response } from 'express';
import { Account } from '../models/Account';

interface AuthenticatedRequest extends Request {
    user?: { id: string; firstName: string; lastName: string; email: string };
  }

export const createAccount = async (req: AuthenticatedRequest, res: Response) => {
  console.log(req.body)
  try {
    const user = req.user?.id;
    const { accountName, accountNumber, accountType, balance } = req.body;

    const requiredFields = ['accountName', 'accountNumber', 'accountType', 'balance'].filter(field => !req.body[field]);
    if (requiredFields.length > 0) {
      res.status(400).json({ message: `Missing required fields: ${requiredFields.join(', ')}` });
      return 
    }

    const account = new Account({
      accountName,
      accountNumber,
      accountType,
      balance,
      user,
    });
    await account.save();
    res.status(201).json({ message: 'Account created successfully', account });
    return 

  } catch (error: any) {
    res.status(500).json({ message: 'Error creating account', error: error.message });
    return 
  }
};

// Get all accounts for a specific user
export const getAccounts = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
  
      if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }
  
      const accounts = await Account.find({ user: userId });
  
      if (!accounts || accounts.length === 0) {
        res.status(404).json({ message: 'No accounts found' });
        return;
      }
      res.status(200).json(accounts);
      return

    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching accounts', error: error.message });
      return
    }
  };
  

// Update an existing account
export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const updates = req.body;

    const account = await Account.findByIdAndUpdate(id, updates, { new: true });

    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return 
    }

    res.status(200).json({ message: 'Account updated successfully', account });
    return 
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating account', error: error.message });
    return 
  }
};

// Delete an account
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const account = await Account.findByIdAndDelete(id);

    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return 
    }

    res.status(200).json({ message: 'Account deleted successfully', account });
    return 
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting account', error: error.message });
    return 
  }
};
