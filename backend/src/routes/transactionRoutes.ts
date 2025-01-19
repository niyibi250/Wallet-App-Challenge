import { Router } from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController';

const transactionRouter = Router();

transactionRouter.post('/', createTransaction); // Create a transaction
transactionRouter.get('/', getTransactions); // Get all transactions
transactionRouter.put('/:id', updateTransaction); // Update a transaction by ID
transactionRouter.delete('/:id', deleteTransaction); // Delete a transaction by ID

export default transactionRouter;

