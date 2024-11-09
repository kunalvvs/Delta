import api from './api';
import { toast } from 'react-hot-toast';

export interface WorkerStats {
  earnings: number;
  jobsCompleted: number;
  rating: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Booking {
  id: string;
  customerName: string;
  service: string;
  location: string;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const workerService = {
  async getStats(): Promise<WorkerStats> {
    try {
      const { data } = await api.get('/worker/stats');
      return data;
    } catch (error) {
      toast.error('Failed to fetch worker stats');
      throw error;
    }
  },

  async getWalletBalance(): Promise<number> {
    try {
      const { data } = await api.get('/worker/wallet/balance');
      return data.balance;
    } catch (error) {
      toast.error('Failed to fetch wallet balance');
      throw error;
    }
  },

  async withdrawFunds(amount: number, bankAccountId: string): Promise<void> {
    try {
      await api.post('/worker/wallet/withdraw', { amount, bankAccountId });
      toast.success('Withdrawal request submitted successfully');
    } catch (error) {
      toast.error('Failed to process withdrawal');
      throw error;
    }
  },

  async getTransactions(): Promise<Transaction[]> {
    try {
      const { data } = await api.get('/worker/transactions');
      return data;
    } catch (error) {
      toast.error('Failed to fetch transactions');
      throw error;
    }
  },

  async getBookings(): Promise<Booking[]> {
    try {
      const { data } = await api.get('/worker/bookings');
      return data;
    } catch (error) {
      toast.error('Failed to fetch bookings');
      throw error;
    }
  },
};