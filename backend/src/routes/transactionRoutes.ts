import { Router } from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const transactionRouter = Router();

transactionRouter.post('/', authMiddleware, createTransaction); // Create a transaction
transactionRouter.get('/', authMiddleware, getTransactions); // Get all transactions
transactionRouter.put('/:id', authMiddleware, updateTransaction); // Update a transaction by ID
transactionRouter.delete('/:id', authMiddleware, deleteTransaction); // Delete a transaction by ID

export default transactionRouter;

