import React, { useMemo } from 'react';
import { useAdmin } from './AdminContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Heart, Award } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { stats, products, orders, users } = useAdmin();

  // Generate monthly data for charts
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const currentMonth = new Date().getMonth();
    
    return months.map((month, index) => {
      const isPastMonth = index <= currentMonth;
      return {
        month,
        revenue: isPastMonth ? Math.floor(Math.random() * 5000000) + 1000000 : 0,
        orders: isPastMonth ? Math.floor(Math.random() * 50) + 10 : 0,
        users: isPastMonth ? Math.floor(Math.random() * 30) + 5 : 0,
        donations: isPastMonth ? Math.floor(Math.random() * 1000000) + 200000 : 0,
      };
    }).slice(0, currentMonth + 1);
  }, []);

  // Category distribution data
  const categoryData = useMemo(() => {
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCount).map(([category, count]) => ({
      name: category,
      value: count
    }));
  }, [products]);

  // Order status distribution
  const orderStatusData = useMemo(() => {
    const statusCount = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusLabels = {
      pending: 'Menunggu',
      processing: 'Diproses',
      shipped: 'Dikirim',
      delivered: 'Selesai',
      cancelled: 'Dibatal'
    };

    return Object.entries(statusCount).map(([status, count]) => ({
      name: statusLabels[status as keyof typeof statusLabels] || status,
      value: count
    }));
  }, [orders]);

  // Colors for charts
  const categoryColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
  const orderStatusColors = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'];

  // Recent performance metrics
  const currentMonthRevenue = monthlyData[monthlyData.length - 1]?.revenue || 0;
  const lastMonthRevenue = monthlyData[monthlyData.length - 2]?.revenue || 0;
  const revenueGrowth = lastMonthRevenue > 0 ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

  const topProducts = useMemo(() => {
    return products
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5);
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics & Reports</h2>
        <p className="text-gray-600">Insight mendalam tentang performa platform KariaKita</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Bulan Ini</p>
              <p className="text-3xl font-bold text-gray-900">
                Rp {currentMonthRevenue.toLocaleString('id-ID')}
              </p>
              <div className="flex items-center mt-2">
                {revenueGrowth >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-600 ml-1">vs bulan lalu</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {((orders.length / Math.max(users.length, 1)) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {orders.length} pesanan dari {users.length} pengguna
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900">
                Rp {(stats.totalRevenue / Math.max(stats.totalOrders, 1)).toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Rata-rata nilai per pesanan
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Donation Impact</p>
              <p className="text-3xl font-bold text-gray-900">
                Rp {stats.totalDonations.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-green-600 mt-2">
                20% dari total revenue
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tren Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis 
                stroke="#6b7280"
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Revenue']}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders & Users Growth */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Pesanan & Pengguna</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" name="Pesanan" />
              <Bar dataKey="users" fill="#10b981" name="Pengguna Baru" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Kategori Produk</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Order Status Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Status Pesanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={orderStatusColors[index % orderStatusColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Products & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Produk (By Likes)</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">#{index + 1}</span>
                </div>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 truncate">{product.title}</p>
                  <p className="text-sm text-gray-600">
                    Rp {product.price.toLocaleString('id-ID')} • {product.likes} likes
                  </p>
                </div>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="text-gray-500 text-center py-8">Belum ada produk</p>
            )}
          </div>
        </Card>

        {/* Key Insights */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <p className="font-medium text-green-800">Pertumbuhan Positif</p>
              </div>
              <p className="text-sm text-green-700">
                Platform mengalami pertumbuhan {stats.monthlyGrowth.revenue}% dalam revenue bulan ini
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <Heart className="w-5 h-5 text-blue-600 mr-2" />
                <p className="font-medium text-blue-800">Impact Sosial</p>
              </div>
              <p className="text-sm text-blue-700">
                Total Rp {stats.totalDonations.toLocaleString('id-ID')} telah disalurkan ke panti asuhan
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                <p className="font-medium text-purple-800">User Engagement</p>
              </div>
              <p className="text-sm text-purple-700">
                Tingkat verifikasi user mencapai {((users.filter(u => u.isVerified).length / Math.max(users.length, 1)) * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center mb-2">
                <Package className="w-5 h-5 text-orange-600 mr-2" />
                <p className="font-medium text-orange-800">Inventory Insight</p>
              </div>
              <p className="text-sm text-orange-700">
                {products.filter(p => p.isAvailable).length} dari {products.length} produk masih tersedia
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};