import { Request, Response } from 'express';
import { Budget } from '../models/Budget';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const createBudget = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { category, amount, startDate, endDate } = req.body;

    if (!category || !amount || !startDate || !endDate) {
      res.status(400).json({ message: 'Missing required fields: name, amount, startDate, endDate' });
      return;
    }

    const budget = new Budget({
      category,
      user: userId,
      amount,
      startDate,
      endDate,
    });

    await budget.save();
    res.status(201).json({ message: 'Budget created successfully', budget });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating budget', error: error.message });
  }
};

export const getBudgets = async (req: AuthenticatedRequest, res: Response) => {
  try {
   const userId = req.user?.id;
     
         if (!userId) {
           res.status(401).json({ message: 'Not authorized' });
           return;
         }
     
         const budgets = await Budget.find({ user: userId })
         .populate('category', 'name')
         .exec();
     
         if (!budgets || budgets.length === 0) {
           res.status(404).json({ message: 'No budgets found' });
           return;
         }
     
         res.status(200).json(budgets);
         return
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching budgets', error: error.message });
  }
};

export const getBudgetById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const budget = await Budget.findOne({ _id: id, user: userId }).populate('categories', 'name');

    if (!budget) {
      res.status(404).json({ message: 'Budget not found' });
      return;
    }

    res.status(200).json(budget);
    return
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching budget', error: error.message });
    return
  }
};

export const updateBudget = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const updates = req.body;

    const budget = await Budget.findOneAndUpdate({ _id: id, user: userId }, updates, { new: true });

    if (!budget) {
      res.status(404).json({ message: 'Budget not found' });
      return;
    }

    res.status(200).json({ message: 'Budget updated successfully', budget });
    return
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating budget', error: error.message });
    return
  }
};

export const deleteBudget = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const budget = await Budget.findOneAndDelete({ _id: id, user: userId });

    if (!budget) {
      res.status(404).json({ message: 'Budget not found' });
      return;
    }

    res.status(200).json({ message: 'Budget deleted successfully', budget });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting budget', error: error.message });
  }
};
