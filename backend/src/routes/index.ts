import { Router } from 'express';
import userRoutes from './userRoutes';
import budgetRoutes from './budgetRoutes';
import transactionRoutes from './transactionRoutes';
import categoryRoutes from './categoryRoutes';
import accountRouter from './accountRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/accounts', accountRouter);
router.use('/budgets', budgetRoutes);
router.use('/transactions', transactionRoutes);
router.use('/categories', categoryRoutes);

export default router;
