import { Request, Response } from 'express';
import { Notification } from '../models/Notification';

// Create a new notification
export const createNotification = async (req: Request, res: Response) => {
  try {
    const { user, message } = req.body;
    const notification = await Notification.create({ user, message });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getNotificationsForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!notification) 
    res.status(404).json({ message: 'Notification not found' });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification){
    res.status(404).json({ message: 'Notification not found' });
    return
    } 
    res.status(200).json({ message: 'Notification deleted successfully' });
    return
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
