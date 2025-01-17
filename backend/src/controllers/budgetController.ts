import { Request, Response } from 'express';
import {Budget} from '../models/Budget';

export interface CreateBudgetRequestBody {
    userid: string;
    amount: number;          // Budget amount
    startDate: Date;         // Start date of the budget period
    endDate: Date;           // End date of the budget period
}

export interface UpdateBudgetRequestBody {
    amount?: number;         // Optional update for budget amount
    startDate?: Date;        // Optional update for start date
    endDate?: Date;          // Optional update for end date
}


// Create a new budget
export const createBudget = async (req: Request, res: Response) => {
    try {
        const { userid,amount, startDate, endDate } = req.body as CreateBudgetRequestBody;
        const budget = new Budget({ user: userid, amount, startDate, endDate });
        await budget.save();
        res.status(201).json(budget);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Get all budgets
export const getBudgets = async (req: Request, res: Response) => {
    try {
        const { userid } = req.params;
        const budgets = await Budget.find({ user: userid });
        res.status(200).json(budgets);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Update a budget
export const updateBudget = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updatedBudget = await Budget.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBudget);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a budget
export const deleteBudget = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Budget.findByIdAndDelete(id);
        res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

