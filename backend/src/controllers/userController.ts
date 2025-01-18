import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// Register a user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)

        // Validate input
        if (!password || typeof password !== 'string') {
            return next(new Error('Invalid password'));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(200).json({ message: 'User already exists', success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(200).json({ message: 'User registered successfully', user });
    } catch (error: any) {
        console.error('Error registering user:', error.message);
        next(error);
    }
};

// Login a user
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new Error('Invalid email or password'));
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new Error('Invalid email or password'));
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error: any) {
        console.error('Error logging in user:', error.message);
        next(error);
    }
};

// Get current user's profile
export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userid } = req.params;
        const userId = userid // Ensure this is set by authentication middleware
        if (!userId) {
            return next(new Error('Unauthorized'));
        }

        // Fetch the user and exclude the password field
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return next(new Error('User not found'));
        }

        res.status(200).json(user);
    } catch (error: any) {
        console.error('Error fetching user profile:', error.message);
        next(error);
    }
};

