import { useState, useEffect } from 'react';
import { workerService, WorkerStats, Transaction, Booking } from '../services/worker';

export function useWorkerStats() {
  const [stats, setStats] = useState<WorkerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await workerService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching worker stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}

export function useWallet() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWalletData = async () => {
    try {
      const [balanceData, transactionsData] = await Promise.all([
        workerService.getWalletBalance(),
        workerService.getTransactions(),
      ]);
      setBalance(balanceData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const withdrawFunds = async (amount: number, bankAccountId: string) => {
    await workerService.withdrawFunds(amount, bankAccountId);
    fetchWalletData(); // Refresh wallet data after withdrawal
  };

  return { balance, transactions, loading, withdrawFunds };
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await workerService.getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading };
}