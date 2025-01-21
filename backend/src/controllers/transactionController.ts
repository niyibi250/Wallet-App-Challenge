import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { Account } from '../models/Account';

interface AuthenticatedRequest extends Request {
  user?: { id: string; firstName: string; lastName: string; email: string };
}

export const createTransaction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user?.id;
    const { account, category, subcategory, amount, type, date, notes } = req.body;

    const requiredFields = ['account', 'category', 'amount', 'type'].filter(field => !req.body[field]);
    if (requiredFields.length > 0) {
      res.status(400).json({ message: `Missing required fields: ${requiredFields.join(', ')}` });
      return;
    }

    const accountToUpdate = await Account.findById(account);
    if (!accountToUpdate) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }

    if (type === 'income') {
      accountToUpdate.balance += amount;
    } else if (type === 'expense') {
      accountToUpdate.balance -= amount;
    } else {
      res.status(400).json({ message: 'Invalid transaction type' });
      return;
    }

    await accountToUpdate.save();

    const transaction = new Transaction({
      user,
      account,
      category,
      subcategory,
      amount,
      type,
      date,
      notes,
    });

    await transaction.save();

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

export const getTransactions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const transactions = await Transaction.find({ user: userId })
      .populate('account', 'accountName accountNumber balance accountType')
      .populate('category', 'name subcategories')
      .populate('subcategory', 'name')
      .exec();

    if (!transactions || transactions.length === 0) {
      res.status(404).json({ message: 'No transactions found' });
      return;
    }

    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const updates = req.body;

    if (!id) {
      res.status(400).json({ message: 'Transaction ID is required' });
      return;
    }

    const transaction = await Transaction.findByIdAndUpdate(id, updates, { new: true });

    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    res.status(200).json({ message: 'Transaction updated successfully', transaction });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating transaction', error: error.message });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ message: 'Transaction ID is required' });
      return;
    }

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }
    res.status(200).json({ message: 'Transaction deleted successfully', transaction });

  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
};

