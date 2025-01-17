import { Request, Response } from 'express';
import {Category} from '../models/Category';

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, parentCategory } = req.body;
        const category = new Category({ name, parentCategory });
        await category.save();
        return res.status(201).json({ success: true, category });
    } catch (error:any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ success: true, categories });
    } catch (error:any) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
