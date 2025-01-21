import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';


interface CreateUserRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

const registerUserRules = [
    check('firstName').isLength({ min: 1 }).withMessage('First name is required').escape(),
    check('lastName').isLength({ min: 1 }).withMessage('Last name is required').escape(),
    check('email').isEmail().normalizeEmail().withMessage('Email is not valid').escape(),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').escape(),
  ];

// Register a user
    
export const registerUser = async (req: Request, res: Response)=> {
    try {
        const { firstName, lastName, email, password } = req.body as CreateUserRequestBody
     
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).send({ message: 'User already exists'});
            return 
            
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();
        const userpayload= {
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        }
        const token = jwt.sign(userpayload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.status(200).json({ message: 'User registered successfully', token, 
            user:{
                id:user._id,
                firstName, 
                lastName , 
                email} });
        return 
    } catch (error) {
        const message =
          (error as { detail?: string }).detail || 'Internal Server Error';
          res.status(500).send(message);
          return 
      }
};

// Login a user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
           res.status(404).send({ message: 'User Not Found' });
           return 
          }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send({ message: 'Password does not match' });
            return   
        }

        const userpayload= {
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        }
        const token = jwt.sign(userpayload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.status(200).json({ message: 'User login successfully', token, user:{
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
        } });
        return 
        
    } catch (error) {
        const message =(error as { detail?: string }).detail || 'Internal Server Error';
          res.status(500).send(message);
          return 
      }
};

