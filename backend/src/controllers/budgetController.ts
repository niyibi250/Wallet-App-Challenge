import { Request, Response } from 'express';
import { Budget } from '../models/Budget';
import { User } from '../models/User';

export interface CreateBudgetRequestBody {
    userId: string;
    categoryName: string;
    amount: number;          // Budget amount
    startDate: Date;         // Start date of the budget period
    endDate: Date;           // End date of the budget period
}

export interface UpdateBudgetRequestBody {
    amount?: number;         // Optional update for budget amount
    startDate?: Date;        // Optional update for start date
    endDate?: Date;          // Optional update for end date
    categoryName?: string;   // Optional update for category name
}

// Create a new budget
export const createBudget = async (req: Request, res: Response) => {
    try {
        const { userId, categoryName, amount, startDate, endDate } = req.body as CreateBudgetRequestBody;
        const burgetexists = await Budget.findOne({ categoryName: categoryName });
        if (burgetexists) {
            res.status(400).json({ success: false, message: 'Budget already exists' });
            return
        }
        const budget = new Budget({ userId, categoryName, amount, startDate, endDate });
        await budget.save();
        res.status(201).json(budget);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Get all budgets
export const getBudgets = async (req: Request, res: Response) => {
    console.log(req.query);
    try {
        const { userId } = req.params;
        const userExists = await User.find({ _id: userId });   
        if (userExists) {
            const budgets = await Budget.find();
            res.status(200).json(budgets);
            return
        } else {
            res.status(404).json({ success: false, message: 'User does not exist' });
            return
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Update a budget
export const updateBudget = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedBudget = await Budget.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBudget);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a budget
export const deleteBudget = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Budget.findByIdAndDelete(id);
        res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
