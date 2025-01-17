import { Router } from 'express';
import { createBudget, getBudgets, updateBudget, deleteBudget } from '../controllers/budgetController';
import { authMiddleware } from '../middleware/authMiddleware';

const burgetRouter = Router();

burgetRouter.post('/', authMiddleware, createBudget); // Create a new budget
burgetRouter.get('/', authMiddleware, getBudgets); // Get all budgets
burgetRouter.put('/:id', authMiddleware, updateBudget); // Update a budget by ID
burgetRouter.delete('/:id', authMiddleware, deleteBudget); // Delete a budget by ID

export default burgetRouter;
