import express from 'express';
import {createNotification,getNotificationsForUser,markNotificationAsRead,deleteNotification,} from '../controllers/notificationController';

const router = express.Router();

router.post('/', createNotification);
router.get('/user/:userId', getNotificationsForUser);
router.patch('/:id/read', markNotificationAsRead);
router.delete('/:id', deleteNotification);

export default router;