import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useAdmin } from './AdminContext';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AdminProductManagement } from './AdminProductManagement';
import { AdminOrderManagement } from './AdminOrderManagement';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminAnalytics } from './AdminAnalytics';
import { ProductApprovalSystem } from './ProductApprovalSystem';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Heart,
  ArrowLeft,
  DollarSign
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const { stats, products, orders, getPendingProducts } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  
  const pendingProducts = getPendingProducts();
  const pendingCount = pendingProducts.length;


  const recentOrders = orders.slice(0, 5);
  const recentProducts = products.slice(-5);

  const handleLogout = () => {
    logout();
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Website
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">
                KariaKita Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Admin
              </Badge>
              <div className="text-sm text-gray-600">
                Selamat datang, {user?.name}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approval" className="relative">
              Approval
              {pendingCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="orders">Pesanan</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Produk</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{stats.monthlyGrowth.products}% bulan ini
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{stats.monthlyGrowth.users}% bulan ini
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{stats.monthlyGrowth.revenue}% bulan ini
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Donasi</p>
                    <p className="text-3xl font-bold text-gray-900">
                      Rp {stats.totalDonations.toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <Heart className="w-3 h-3 mr-1" />
                      Membantu panti asuhan
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pesanan Terbaru</h3>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">#{order.id}</p>
                        <p className="text-sm text-gray-600">{order.userName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          Rp {order.totalAmount.toLocaleString('id-ID')}
                        </p>
                        <Badge 
                          variant={
                            order.status === 'delivered' ? 'default' :
                            order.status === 'processing' ? 'secondary' :
                            order.status === 'pending' ? 'outline' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {order.status === 'pending' ? 'Menunggu' :
                           order.status === 'processing' ? 'Diproses' :
                           order.status === 'shipped' ? 'Dikirim' :
                           order.status === 'delivered' ? 'Selesai' : 'Dibatal'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {recentOrders.length === 0 && (
                    <p className="text-gray-500 text-center py-8">Belum ada pesanan</p>
                  )}
                </div>
              </Card>

              {/* Recent Products */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Produk Terbaru</h3>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 truncate">{product.title}</p>
                        <p className="text-sm text-gray-600">
                          Rp {product.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <Badge 
                        variant={product.isAvailable ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {product.isAvailable ? 'Tersedia' : 'Habis'}
                      </Badge>
                    </div>
                  ))}
                  {recentProducts.length === 0 && (
                    <p className="text-gray-500 text-center py-8">Belum ada produk</p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Product Approval System */}
          <TabsContent value="approval">
            <ProductApprovalSystem />
          </TabsContent>

          {/* Product Management */}
          <TabsContent value="products">
            <AdminProductManagement />
          </TabsContent>

          {/* Order Management */}
          <TabsContent value="orders">
            <AdminOrderManagement />
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <AdminUserManagement />
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};