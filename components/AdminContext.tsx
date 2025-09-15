import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  condition: 'Seperti Baru' | 'Sangat Baik' | 'Baik' | 'Cukup Baik';
  seller: {
    name: string;
    email: string;
    phone: string;
    rating: number;
    totalSales: number;
  };
  likes: number;
  isAvailable: boolean;
  dateAdded: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedDate?: string;
  approvedBy?: string;
  rejectionReason?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  products: {
    productId: string;
    productTitle: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  donationAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  joinDate: string;
  totalPurchases: number;
  totalDonations: number;
  isVerified: boolean;
  status: 'active' | 'suspended';
}

export interface DonationRecord {
  id: string;
  amount: number;
  orderId: string;
  orphanageName: string;
  date: string;
  status: 'pending' | 'sent' | 'received';
}

export interface AdminStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalDonations: number;
  monthlyGrowth: {
    products: number;
    users: number;
    revenue: number;
  };
}

interface AdminContextType {
  products: Product[];
  orders: Order[];
  users: AdminUser[];
  donations: DonationRecord[];
  stats: AdminStats;
  categories: string[];
  
  // Product management
  addProduct: (product: Omit<Product, 'id' | 'dateAdded'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Product approval
  approveProduct: (id: string, approvedBy: string) => void;
  rejectProduct: (id: string, reason: string, rejectedBy: string) => void;
  getPendingProducts: () => Product[];
  getApprovedProducts: () => Product[];
  
  // Order management
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // User management
  updateUserStatus: (userId: string, status: AdminUser['status']) => void;
  
  // Category management
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  
  // Stats
  refreshStats: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Mock data
const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Sepatu Sneakers Nike Air Max 90',
    description: 'Sepatu sneakers Nike Air Max 90 dalam kondisi sangat baik, nyaman dipakai untuk aktivitas sehari-hari.',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
    category: 'Fashion & Pakaian',
    condition: 'Sangat Baik',
    seller: {
      name: 'Ahmad Rizki',
      email: 'ahmad.rizki@example.com',
      phone: '+62 812-3456-7890',
      rating: 4.8,
      totalSales: 45
    },
    likes: 23,
    isAvailable: true,
    dateAdded: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'approved',
    approvedDate: new Date(Date.now() - 86400000 * 4).toISOString(),
    approvedBy: 'admin@kariakita.com'
  },
  {
    id: '2',
    title: 'Buku Programming React.js Complete Guide',
    description: 'Panduan lengkap belajar React.js dari dasar hingga advanced. Cocok untuk developer pemula maupun berpengalaman.',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop',
    category: 'Buku & Edukasi',
    condition: 'Seperti Baru',
    seller: {
      name: 'Sarah Putri',
      email: 'sarah.putri@example.com',
      phone: '+62 812-9876-5432',
      rating: 4.9,
      totalSales: 67
    },
    likes: 18,
    isAvailable: true,
    dateAdded: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: 'approved',
    approvedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    approvedBy: 'admin@kariakita.com'
  },
  {
    id: '3',
    title: 'Tas Ransel Vintage Leather',
    description: 'Tas ransel kulit vintage dengan kualitas premium, cocok untuk traveling dan aktivitas outdoor.',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
    category: 'Fashion & Pakaian',
    condition: 'Baik',
    seller: {
      name: 'Dinda Maharani',
      email: 'dinda.maharani@example.com',
      phone: '+62 856-1234-5678',
      rating: 4.7,
      totalSales: 23
    },
    likes: 0,
    isAvailable: true,
    dateAdded: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: 'pending'
  }
];

const initialOrders: Order[] = [
  {
    id: '1001',
    userId: '1',
    userName: 'Budi Santoso',
    userEmail: 'budi@example.com',
    products: [
      {
        productId: '1',
        productTitle: 'Sepatu Sneakers Nike Air Max 90',
        price: 450000,
        quantity: 1
      }
    ],
    totalAmount: 450000,
    donationAmount: 90000,
    status: 'processing',
    orderDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    shippingAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
    paymentMethod: 'Credit Card'
  }
];

const initialUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    role: 'user',
    joinDate: new Date(Date.now() - 86400000 * 30).toISOString(),
    totalPurchases: 5,
    totalDonations: 150000,
    isVerified: true,
    status: 'active'
  }
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [donations] = useState<DonationRecord[]>([]);
  const [categories, setCategories] = useState<string[]>([
    'Fashion & Pakaian',
    'Buku & Edukasi', 
    'Furniture & Rumah'
  ]);
  
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalDonations: 0,
    monthlyGrowth: {
      products: 12,
      users: 8,
      revenue: 15
    }
  });

  // Load data from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin_products');
    const savedOrders = localStorage.getItem('admin_orders');
    const savedUsers = localStorage.getItem('admin_users');
    
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
    
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
    
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Error loading users:', error);
      }
    }
  }, []);

  // Update stats whenever data changes
  useEffect(() => {
    refreshStats();
  }, [products, orders, users, donations]);

  const refreshStats = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalDonations = orders.reduce((sum, order) => sum + order.donationAmount, 0);
    
    setStats({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: orders.length,
      totalRevenue,
      totalDonations,
      monthlyGrowth: {
        products: Math.floor(Math.random() * 20) + 5,
        users: Math.floor(Math.random() * 15) + 3,
        revenue: Math.floor(Math.random() * 25) + 10
      }
    });
  };

  const addProduct = (product: Omit<Product, 'id' | 'dateAdded'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      status: 'pending' // New products start as pending
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, productUpdate: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...productUpdate } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
  };

  const updateUserStatus = (userId: string, status: AdminUser['status']) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(cat => cat !== category));
  };

  // Product approval functions
  const approveProduct = (id: string, approvedBy: string) => {
    const updatedProducts = products.map(product =>
      product.id === id 
        ? { 
            ...product, 
            status: 'approved' as const,
            approvedDate: new Date().toISOString(),
            approvedBy 
          } 
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  const rejectProduct = (id: string, reason: string, rejectedBy: string) => {
    const updatedProducts = products.map(product =>
      product.id === id 
        ? { 
            ...product, 
            status: 'rejected' as const,
            approvedDate: new Date().toISOString(),
            approvedBy: rejectedBy,
            rejectionReason: reason
          } 
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  const getPendingProducts = () => {
    return products.filter(product => product.status === 'pending');
  };

  const getApprovedProducts = () => {
    return products.filter(product => product.status === 'approved');
  };

  return (
    <AdminContext.Provider value={{
      products,
      orders,
      users,
      donations,
      stats,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      approveProduct,
      rejectProduct,
      getPendingProducts,
      getApprovedProducts,
      updateOrderStatus,
      updateUserStatus,
      addCategory,
      removeCategory,
      refreshStats
    }}>
      {children}
    </AdminContext.Provider>
  );
};