export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    ENDPOINTS: {
      AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        VERIFY_OTP: '/auth/verify-otp',
      },
      WORKER: {
        STATS: '/worker/stats',
        BOOKINGS: '/worker/bookings',
        WALLET: '/worker/wallet',
        TRANSACTIONS: '/worker/transactions',
        WITHDRAW: '/worker/wallet/withdraw',
        PROFILE: '/worker/profile',
      },
      USER: {
        STATS: '/user/stats',
        BOOKINGS: '/user/bookings',
        NOTIFICATIONS: '/user/notifications',
        PROFILE: '/user/profile',
      },
      SERVICES: {
        LIST: '/services',
        CATEGORIES: '/categories',
        SEARCH: '/services/search',
      },
    },
  };