import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { User } from '../models/User';

interface AuthenticatedRequest extends Request {
    user?: { id: string; firstName: string; lastName: string; email: string };
  }

export const createCategory = async (req: AuthenticatedRequest, res: Response) => {
  console.log(req.body)
  try {
    const user = req.user?.id;
    const { name, subcategories } = req.body;

    const requiredFields = ['name', 'subcategories'].filter(field => !req.body[field]);
    if (requiredFields.length > 0) {
      res.status(400).json({ message: `Missing required fields: ${requiredFields.join(', ')}` });
      return 
    }

    const category = new Category({
      name,
      user,
      subcategories,
    });
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
    return

  } catch (error: any) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
    return
  }
};

export const getCategories = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Not authorized' });
      return 
    }

    const categories = await Category.find({ user: userId });

    if (!categories || categories.length === 0) {
      res.status(404).json({ message: 'No categories found' });
      return 
    }

    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
    return 
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, subcategories } = req.body;

    if (!name && !subcategories) {
      res.status(400).json({ message: 'Category name or subcategories are required' });
      return 
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, subcategories },
      { new: true }
    );

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return 
    }

    res.status(200).json({ message: 'Category updated successfully', category });
    return 
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
    return 
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return 
    }

    res.status(200).json({ message: 'Category deleted successfully', category });
    return 
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
    return 
  }
};

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Subcategory name is required' });
      return 
    }

    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return 
    }

    // Add the subcategory to the category's subcategories array
    category.subcategories.push({ name });
    await category.save();

    res.status(201).json({ message: 'Subcategory added successfully', category });
    return 
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating subcategory', error: error.message });
    return 
  }
};
