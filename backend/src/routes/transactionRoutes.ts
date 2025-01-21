import { Router } from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const transactionRouter = Router();

transactionRouter.post('/', authMiddleware, createTransaction);
transactionRouter.get('/', authMiddleware, getTransactions);
transactionRouter.put('/:id', authMiddleware, updateTransaction);
transactionRouter.delete('/:id', authMiddleware, deleteTransaction);

export default transactionRouter;

