import { Router } from 'express';
import {createCategory,getCategories,updateCategory,deleteCategory,createSubCategory,} from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const categoryRouter = Router();

categoryRouter.post('/', authMiddleware,createCategory);
categoryRouter.get('/', authMiddleware, getCategories);
categoryRouter.put('/:id', authMiddleware, updateCategory);
categoryRouter.delete('/:id', authMiddleware, deleteCategory);
categoryRouter.post('/:id/subcategory', authMiddleware, createSubCategory);

export default categoryRouter;

