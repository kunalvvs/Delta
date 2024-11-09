import api from './api';
import { toast } from 'react-hot-toast';

export interface UserStats {
  totalBookings: number;
  activeBookings: number;
  averageRating: number;
}

export interface UserBooking {
  id: string;
  workerName: string;
  service: string;
  dateTime: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const userService = {
  async getStats(): Promise<UserStats> {
    try {
      const { data } = await api.get('/user/stats');
      return data;
    } catch (error) {
      toast.error('Failed to fetch user stats');
      throw error;
    }
  },

  async getBookings(): Promise<UserBooking[]> {
    try {
      const { data } = await api.get('/user/bookings');
      return data;
    } catch (error) {
      toast.error('Failed to fetch bookings');
      throw error;
    }
  },

  async getNotifications(): Promise<Notification[]> {
    try {
      const { data } = await api.get('/user/notifications');
      return data;
    } catch (error) {
      toast.error('Failed to fetch notifications');
      throw error;
    }
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await api.put(`/user/notifications/${notificationId}/read`);
    } catch (error) {
      toast.error('Failed to update notification');
      throw error;
    }
  },
};