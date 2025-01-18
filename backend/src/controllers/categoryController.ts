import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { User } from '../models/User';

// Interface for creating a category
export interface CreateCategoryRequestBody {
    userId: string;
    categoryName: string;
    subcategories?: string[];
}

// Interface for updating a category
export interface UpdateCategoryRequestBody {
    categoryName?: string;
    subcategories?: string[];
}

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    try {
        const { userId, categoryName, subcategories } = req.body as CreateCategoryRequestBody;
        const userExists = await User.findById(userId);

        if (userExists) {
            const category = new Category({ userId, categoryName, subcategories });
            await category.save();
            res.status(201).json({ success: true, category });
        } else {
            res.status(404).json({ success: false, message: 'User does not exist' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId} = req.query;
        const userExists = await User.findById(userId);

        if (userExists) {
            const categories = await Category.find({ userId });
        res.status(200).json({ success: true, categories });
        } else {
            res.status(404).json({ success: false, message: 'User does not exist' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body as UpdateCategoryRequestBody, { new: true });
        if (!updatedCategory) {
            res.status(404).json({ success: false, message: 'Category not found' });
            return;
        }
        res.status(200).json({ success: true, category: updatedCategory });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            res.status(404).json({ success: false, message: 'Category not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create subcategory for a given category
export const createSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        
        // Check if category exists
        const category = await Category.findById(id);
        if (category) {
            // Add subcategory to the category
            category.subcategories.push(name);  // Add string name directly
            await category.save();
            res.status(201).json({ success: true, category });
        } else {
            res.status(404).json({ success: false, message: 'Category not found' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
