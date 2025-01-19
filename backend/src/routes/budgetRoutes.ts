import { Router } from 'express';
import { createBudget, getBudgets, updateBudget, deleteBudget } from '../controllers/budgetController';

const burgetRouter = Router();

burgetRouter.post('/', createBudget); // Create a new budget
burgetRouter.get('/', getBudgets); // Get all budgets
burgetRouter.put('/:id', updateBudget); // Update a budget by ID
burgetRouter.delete('/:id', deleteBudget); // Delete a budget by ID

export default burgetRouter;
