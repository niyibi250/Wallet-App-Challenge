import { Router } from 'express';
import {createBudget,getBudgets,updateBudget,deleteBudget,getBudgetById,} from '../controllers/budgetController';
import { authMiddleware } from '../middleware/authMiddleware';

const budgetRouter = Router();

budgetRouter.post('/', authMiddleware, createBudget); 
budgetRouter.get('/', authMiddleware, getBudgets); 
budgetRouter.get('/:id', authMiddleware, getBudgetById);
budgetRouter.put('/:id', authMiddleware, updateBudget);
budgetRouter.delete('/:id', authMiddleware, deleteBudget);

export default budgetRouter;
