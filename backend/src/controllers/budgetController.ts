import { Request, Response } from 'express';
import {Budget} from '../models/Budget';

export const setBudget = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { amount, startDate, endDate } = req.body;
        const budget = new Budget({ amount, startDate, endDate });
        await budget.save();
        return res.status(201).json({ success: true, budget });
    } catch (error:any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const checkBudget = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { budgetId, currentExpenses } = req.body;
        const budget = await Budget.findById(budgetId);
        if (!budget) return res.status(404).json({ success: false, message: 'Budget not found' });

        const exceeded = currentExpenses > budget.amount;
        return res.status(200).json({ success: true, exceeded, budget });
    } catch (error:any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
