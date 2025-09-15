import React, { useState } from 'react';
import { useAdmin, Product } from './AdminContext';
import { useAuth } from './AuthContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { CheckCircle, XCircle, Clock, Eye, User, Package } from 'lucide-react';
import { toast } from 'sonner';

export const ProductApprovalSystem: React.FC = () => {
  const { products, approveProduct, rejectProduct } = useAdmin();
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const allProductsByStatus = {
    pending: products.filter(product => product.status === 'pending'),
    approved: products.filter(product => product.status === 'approved'),
    rejected: products.filter(product => product.status === 'rejected')
  };

  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const handleApprove = (product: Product) => {
    if (!user?.email) {
      toast.error('Tidak dapat menentukan admin yang melakukan approval');
      return;
    }

    approveProduct(product.id, user.email);
    toast.success(`Produk "${product.title}" berhasil diapprove dan akan muncul di marketplace`);
  };

  const handleReject = (product: Product) => {
    setSelectedProduct(product);
    setIsRejectDialogOpen(true);
  };

  const confirmReject = () => {
    if (!selectedProduct || !user?.email) return;
    
    if (!rejectionReason.trim()) {
      toast.error('Harap berikan alasan penolakan');
      return;
    }

    rejectProduct(selectedProduct.id, rejectionReason, user.email);
    toast.success(`Produk "${selectedProduct.title}" ditolak`);
    setIsRejectDialogOpen(false);
    setSelectedProduct(null);
    setRejectionReason('');
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Seperti Baru':
        return 'bg-emerald-100 text-emerald-800';
      case 'Sangat Baik':
        return 'bg-green-100 text-green-800';
      case 'Baik':
        return 'bg-blue-100 text-blue-800';
      case 'Cukup Baik':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const currentProducts = allProductsByStatus[selectedTab];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Sistem Approval Produk</h2>
          <p className="text-gray-600">Review dan kelola produk yang disubmit oleh penjual</p>
        </div>
        
        {/* Stats Cards */}
        <div className="flex gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{allProductsByStatus.pending.length}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{allProductsByStatus.approved.length}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{allProductsByStatus.rejected.length}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </Card>
        </div>
      </div>

      {/* Status Tabs */}
      <Card className="p-4">
        <div className="flex gap-2">
          {(['pending', 'approved', 'rejected'] as const).map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? 'default' : 'outline'}
              onClick={() => setSelectedTab(tab)}
              className={selectedTab === tab ? 'gradient-primary text-white' : ''}
            >
              {tab === 'pending' && <Clock className="w-4 h-4 mr-2" />}
              {tab === 'approved' && <CheckCircle className="w-4 h-4 mr-2" />}
              {tab === 'rejected' && <XCircle className="w-4 h-4 mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({allProductsByStatus[tab].length})
            </Button>
          ))}
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Foto</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Penjual</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{product.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{product.seller.name}</p>
                        <p className="text-xs text-gray-500">{product.seller.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">Rp {product.price.toLocaleString('id-ID')}</p>
                      <p className="text-xs text-pink-600">
                        Donasi: Rp {(product.price * 0.2).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getConditionColor(product.condition)}>
                      {product.condition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status === 'pending' && 'Menunggu Review'}
                      {product.status === 'approved' && 'Disetujui'}
                      {product.status === 'rejected' && 'Ditolak'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(product.dateAdded).toLocaleDateString('id-ID')}</p>
                      {product.approvedDate && (
                        <p className="text-xs text-gray-500">
                          {product.status === 'approved' ? 'Disetujui' : 'Ditolak'}: {new Date(product.approvedDate).toLocaleDateString('id-ID')}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {product.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleApprove(product)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReject(product)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {currentProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="h-8 w-8 text-gray-400" />
                      <p>Tidak ada produk dengan status {selectedTab}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* View Product Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Produk</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedProduct.title}</h3>
                  <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge className={getStatusColor(selectedProduct.status)}>
                      {selectedProduct.status}
                    </Badge>
                    <Badge className={getConditionColor(selectedProduct.condition)}>
                      {selectedProduct.condition}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Kategori</Label>
                  <p className="text-sm">{selectedProduct.category}</p>
                </div>
                <div>
                  <Label>Harga</Label>
                  <p className="text-sm">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
              
              <div>
                <Label>Informasi Penjual</Label>
                <div className="bg-gray-50 p-3 rounded-lg mt-1">
                  <p><strong>Nama:</strong> {selectedProduct.seller.name}</p>
                  <p><strong>Email:</strong> {selectedProduct.seller.email}</p>
                  <p><strong>Phone:</strong> {selectedProduct.seller.phone}</p>
                  <p><strong>Rating:</strong> ⭐ {selectedProduct.seller.rating}</p>
                </div>
              </div>
              
              <div>
                <Label>Perkiraan Dampak Sosial</Label>
                <div className="bg-pink-50 p-3 rounded-lg mt-1 border border-pink-200">
                  <p className="text-pink-800">
                    <strong>Donasi untuk Panti:</strong> Rp {(selectedProduct.price * 0.2).toLocaleString('id-ID')} (20%)
                  </p>
                  <p className="text-green-800">
                    <strong>Pendapatan Penjual:</strong> Rp {(selectedProduct.price * 0.7).toLocaleString('id-ID')} (70%)
                  </p>
                </div>
              </div>
              
              {selectedProduct.rejectionReason && (
                <div>
                  <Label>Alasan Penolakan</Label>
                  <div className="bg-red-50 p-3 rounded-lg mt-1 border border-red-200">
                    <p className="text-red-800">{selectedProduct.rejectionReason}</p>
                  </div>
                </div>
              )}
              
              {selectedProduct.status === 'pending' && (
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => handleApprove(selectedProduct)}
                    className="gradient-primary text-white flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Setujui Produk
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleReject(selectedProduct)}
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Tolak Produk
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Product Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Produk</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Anda akan menolak produk "{selectedProduct?.title}". Harap berikan alasan penolakan:</p>
            <div>
              <Label htmlFor="rejection-reason">Alasan Penolakan *</Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Berikan alasan yang jelas untuk penolakan produk ini..."
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={confirmReject}>
                <XCircle className="w-4 h-4 mr-2" />
                Tolak Produk
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};