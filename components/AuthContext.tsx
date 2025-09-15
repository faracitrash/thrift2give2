import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  totalPurchases: number;
  totalDonations: number;
  isVerified: boolean;
  role?: 'user' | 'admin';
}

interface Notification {
  id: string;
  type: 'like' | 'purchase' | 'donation' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  productId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  notifications: Notification[];
  unreadCount: number;
  likedProducts: string[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  toggleLike: (productId: string, productTitle: string) => void;
  isLiked: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedUser = localStorage.getItem('kariakita_user');
    const savedNotifications = localStorage.getItem('kariakita_notifications');
    const savedLikes = localStorage.getItem('kariakita_likes');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('kariakita_user');
      }
    }

    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Error loading notifications:', error);
        localStorage.removeItem('kariakita_notifications');
      }
    } else {
      // Add welcome notifications for demo
      const welcomeNotifications: Notification[] = [
        {
          id: '1',
          type: 'system',
          title: 'Selamat Datang di KariaKita! 🌱',
          message: 'Mulai belanja sustainable dan bantu panti asuhan Indonesia',
          timestamp: new Date().toISOString(),
          isRead: false,
        },
        {
          id: '2', 
          type: 'donation',
          title: 'Panti Asuhan Terbantu',
          message: 'Rp 25,000 telah disalurkan ke Panti Kasih Ibu Jakarta dari pembelian terbaru',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isRead: false,
          avatar: '🏠'
        }
      ];
      setNotifications(welcomeNotifications);
      localStorage.setItem('kariakita_notifications', JSON.stringify(welcomeNotifications));
    }

    if (savedLikes) {
      try {
        setLikedProducts(JSON.parse(savedLikes));
      } catch (error) {
        console.error('Error loading likes:', error);
        localStorage.removeItem('kariakita_likes');
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email && password.length >= 6) {
      const userData: User = {
        id: Date.now().toString(),
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, '').toUpperCase() || 'User',
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        joinDate: new Date().toISOString(),
        totalPurchases: Math.floor(Math.random() * 50) + 5,
        totalDonations: Math.floor(Math.random() * 500000) + 100000,
        isVerified: Math.random() > 0.3,
        role: email === 'admin@kariakita.com' ? 'admin' : 'user'
      };
      
      setUser(userData);
      localStorage.setItem('kariakita_user', JSON.stringify(userData));
      
      // Add login notification
      addNotification({
        type: 'system',
        title: 'Login Berhasil! 🎉',
        message: `Selamat datang kembali, ${userData.name}! Yuk lanjutkan misi sustainable living`
      });
      
      return true;
    }
    return false;
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    if (name && email && password.length >= 6) {
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        joinDate: new Date().toISOString(),
        totalPurchases: 0,
        totalDonations: 0,
        isVerified: false,
        role: email === 'admin@kariakita.com' ? 'admin' : 'user'
      };
      
      setUser(userData);
      localStorage.setItem('kariakita_user', JSON.stringify(userData));
      
      // Add welcome notifications
      const welcomeNotifications = [
        {
          type: 'system' as const,
          title: 'Pendaftaran Berhasil! 🎊',
          message: `Halo ${name}! Akun Anda telah berhasil dibuat. Mari mulai berkontribusi untuk lingkungan`
        },
        {
          type: 'system' as const,
          title: 'Tips: Verifikasi Akun 📋',
          message: 'Verifikasi akun Anda untuk mendapat akses penuh dan badge member terpercaya'
        }
      ];

      welcomeNotifications.forEach(notif => addNotification(notif));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kariakita_user');
    // Keep notifications and likes for better UX
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.map(notif => 
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      );
      localStorage.setItem('kariakita_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(notif => ({ ...notif, isRead: true }));
      localStorage.setItem('kariakita_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, 50); // Keep only latest 50
      localStorage.setItem('kariakita_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleLike = (productId: string, productTitle: string) => {
    setLikedProducts(prev => {
      const isCurrentlyLiked = prev.includes(productId);
      let updated: string[];
      
      if (isCurrentlyLiked) {
        updated = prev.filter(id => id !== productId);
      } else {
        updated = [...prev, productId];
        
        // Add notification for like
        if (user) {
          addNotification({
            type: 'like',
            title: 'Produk Ditambahkan ke Wishlist 💝',
            message: `"${productTitle}" berhasil ditambahkan ke wishlist Anda`
          });
        }
      }
      
      localStorage.setItem('kariakita_likes', JSON.stringify(updated));
      return updated;
    });
  };

  const isLiked = (productId: string): boolean => {
    return likedProducts.includes(productId);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      notifications,
      unreadCount,
      likedProducts,
      login,
      register,
      logout,
      markNotificationRead,
      markAllNotificationsRead,
      addNotification,
      toggleLike,
      isLiked
    }}>
      {children}
    </AuthContext.Provider>
  );
};