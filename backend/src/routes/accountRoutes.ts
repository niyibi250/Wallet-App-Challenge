import express from 'express';
import { createAccount, getAccounts, updateAccount, deleteAccount } from '../controllers/accountController';

const accountRouter = express.Router();

accountRouter.post('/create', createAccount);
accountRouter.get('/accounts', getAccounts);
accountRouter.put('/update/:id', updateAccount);
accountRouter.delete('/delete/:id', deleteAccount);

export default accountRouter;
