import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { id: string; firstName: string; lastName: string; email: string };
}

interface UserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    req.user = { id: decoded.id, firstName: decoded.firstName, lastName: decoded.lastName, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token verification failed' });
  }
};
