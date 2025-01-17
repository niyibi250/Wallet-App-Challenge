import { Router } from 'express';
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    createSubCategory,
} from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const categoryRouter = Router();

categoryRouter.post('/create', createCategory); // Create a category
categoryRouter.get('/getcategories', getCategories); // Get all categories
categoryRouter.put('/update/:id', updateCategory); // Update a category by ID
categoryRouter.delete('/delete/:id', deleteCategory); // Delete a category by ID
categoryRouter.post('/create/:id/subcategory', authMiddleware, createSubCategory); // Add a subcategory to a category

export default categoryRouter;

