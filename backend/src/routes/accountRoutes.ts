import express from 'express';
import { createAccount, getAccounts, updateAccount, deleteAccount } from '../controllers/accountController';
import { authMiddleware } from '../middleware/authMiddleware';

const accountRouter = express.Router();

accountRouter.post('/', authMiddleware, createAccount);
accountRouter.get('/', authMiddleware, getAccounts);
accountRouter.put('/:id', authMiddleware, updateAccount);
accountRouter.delete('/:id', authMiddleware, deleteAccount);

export default accountRouter;
