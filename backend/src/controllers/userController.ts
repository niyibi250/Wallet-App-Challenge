import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/User';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ success: true, message: 'User registered successfully', user });
    } catch (error:any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });

        return res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error:any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get current user details
export const getUserProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.user.id; // `req.user` is populated by the authentication middleware
        const user = await User.findById(userId).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, user });
    } catch (error:any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
