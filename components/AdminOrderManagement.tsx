import React, { useState } from 'react';
import { useAdmin, Order } from './AdminContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Search, Eye, Package, Truck } from 'lucide-react';
import { toast } from 'sonner';

export const AdminOrderManagement: React.FC = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Status pesanan #${orderId} berhasil diubah`);
    
    // Update selected order if it's currently being viewed
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Menunggu</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Diproses</Badge>;
      case 'shipped':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Dikirim</Badge>;
      case 'delivered':
        return <Badge variant="default" className="bg-green-100 text-green-800">Selesai</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Dibatal</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusActions = (order: Order) => {
    const actions: Order['status'][] = [];
    
    switch (order.status) {
      case 'pending':
        actions.push('processing', 'cancelled');
        break;
      case 'processing':
        actions.push('shipped', 'cancelled');
        break;
      case 'shipped':
        actions.push('delivered');
        break;
      default:
        break;
    }
    
    return actions;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'processing': return 'Diproses';
      case 'shipped': return 'Dikirim';
      case 'delivered': return 'Selesai';
      case 'cancelled': return 'Dibatal';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Manajemen Pesanan</h2>
        <p className="text-gray-600">Kelola semua pesanan dari pelanggan</p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari pesanan berdasarkan ID, nama, atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="shipped">Dikirim</SelectItem>
                <SelectItem value="delivered">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Orders Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {orders.filter(o => o.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Menunggu</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'processing').length}
            </p>
            <p className="text-sm text-gray-600">Diproses</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {orders.filter(o => o.status === 'shipped').length}
            </p>
            <p className="text-sm text-gray-600">Dikirim</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
            <p className="text-sm text-gray-600">Selesai</p>
          </div>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Donasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{order.userName}</p>
                      <p className="text-sm text-gray-500">{order.userEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">
                        {order.products.length} item{order.products.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">
                        {order.products[0]?.productTitle}
                        {order.products.length > 1 && ` +${order.products.length - 1} lainnya`}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    Rp {order.totalAmount.toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 font-medium">
                      Rp {order.donationAmount.toLocaleString('id-ID')}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {formatDate(order.orderDate)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {getStatusActions(order).map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(order.id, status)}
                          className="text-xs"
                        >
                          {status === 'processing' && <Package className="w-3 h-3 mr-1" />}
                          {status === 'shipped' && <Truck className="w-3 h-3 mr-1" />}
                          {getStatusText(status)}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Tidak ada pesanan yang sesuai dengan filter'
                      : 'Belum ada pesanan'
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Pesanan #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Status Pesanan</p>
                  <p className="text-sm text-gray-600">{formatDate(selectedOrder.orderDate)}</p>
                </div>
                {getStatusBadge(selectedOrder.status)}
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Informasi Pelanggan</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nama</p>
                    <p className="font-medium">{selectedOrder.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedOrder.userEmail}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Alamat Pengiriman</p>
                    <p className="font-medium">{selectedOrder.shippingAddress}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Produk Pesanan</h4>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{product.productTitle}</p>
                        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      </div>
                      <p className="font-medium">
                        Rp {(product.price * product.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Donasi ke Panti Asuhan</span>
                    <span>Rp {selectedOrder.donationAmount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Metode Pembayaran</h4>
                <p>{selectedOrder.paymentMethod}</p>
              </div>

              {/* Status Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {getStatusActions(selectedOrder).map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    onClick={() => handleStatusChange(selectedOrder.id, status)}
                    className="flex items-center"
                  >
                    {status === 'processing' && <Package className="w-4 h-4 mr-2" />}
                    {status === 'shipped' && <Truck className="w-4 h-4 mr-2" />}
                    Ubah ke {getStatusText(status)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};