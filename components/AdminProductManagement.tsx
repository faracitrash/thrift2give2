import React, { useState } from 'react';
import { useAdmin, Product } from './AdminContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

// Form state types:
// We keep "price" as string in the form for easier input handling,
// then convert to number when calling addProduct / updateProduct.
type ProductFormData = Omit<
  Product,
  'id' | 'dateAdded' | 'approvedDate' | 'approvedBy' | 'rejectionReason'
>;

type FormState = Omit<ProductFormData, 'price'> & { price: string };

export const AdminProductManagement: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, addCategory } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<FormState>({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    condition: 'Baik' as Product['condition'],
    seller: {
      name: '',
      email: '',
      phone: '',
      rating: 4.5,
      totalSales: 0
    },
    likes: 0,
    isAvailable: true,
    status: 'pending'
  });

  const [newCategory, setNewCategory] = useState('');

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      image: '',
      category: '',
      condition: 'Baik',
      seller: {
        name: '',
        email: '',
        phone: '',
        rating: 4.5,
        totalSales: 0
      },
      likes: 0,
      isAvailable: true,
      status: 'pending'
    });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      toast.error('Harap lengkapi semua field yang wajib diisi');
      return;
    }

    const productData: Omit<Product, 'id' | 'dateAdded'> = {
      title: formData.title,
      description: formData.description,
      price: Number.parseInt(formData.price, 10) || 0,
      image: formData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      category: formData.category,
      condition: formData.condition,
      seller: {
        // ensure seller object matches Product type (email & phone required)
        name: formData.seller.name,
        email: formData.seller.email || '',
        phone: formData.seller.phone || '',
        rating: formData.seller.rating,
        totalSales: formData.seller.totalSales
      },
      likes: formData.likes,
      isAvailable: formData.isAvailable,
      status: (formData.status as Product['status']) || 'pending'
    };

    addProduct(productData);
    toast.success('Produk berhasil ditambahkan');
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      condition: product.condition,
      seller: {
        name: product.seller.name,
        email: product.seller.email || '',
        phone: product.seller.phone || '',
        rating: product.seller.rating,
        totalSales: product.seller.totalSales
      },
      likes: product.likes,
      isAvailable: product.isAvailable,
      status: product.status
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const productUpdate: Partial<Product> = {
      title: formData.title,
      description: formData.description,
      price: Number.parseInt(formData.price, 10) || 0,
      image: formData.image,
      category: formData.category,
      condition: formData.condition,
      seller: {
        name: formData.seller.name,
        email: formData.seller.email || '',
        phone: formData.seller.phone || '',
        rating: formData.seller.rating,
        totalSales: formData.seller.totalSales
      },
      likes: formData.likes,
      isAvailable: formData.isAvailable,
      status: formData.status as Product['status']
    };

    updateProduct(editingProduct.id, productUpdate);
    toast.success('Produk berhasil diperbarui');
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${product.title}"?`)) {
      deleteProduct(product.id);
      toast.success('Produk berhasil dihapus');
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      addCategory(newCategory);
      setNewCategory('');
      toast.success('Kategori berhasil ditambahkan');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Manajemen Produk</h2>
          <p className="text-gray-600">Kelola semua produk di marketplace KariaKita</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Produk Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Judul Produk *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Masukkan judul produk"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Harga *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Masukkan harga"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Deskripsi *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Masukkan deskripsi produk"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Kategori *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="condition">Kondisi</Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value as Product['condition']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Seperti Baru">Seperti Baru</SelectItem>
                      <SelectItem value="Sangat Baik">Sangat Baik</SelectItem>
                      <SelectItem value="Baik">Baik</SelectItem>
                      <SelectItem value="Cukup Baik">Cukup Baik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image">URL Gambar</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Masukkan URL gambar (opsional)"
                />
              </div>

              <div>
                <Label htmlFor="seller">Nama Penjual</Label>
                <Input
                  id="seller"
                  value={formData.seller.name}
                  onChange={(e) => setFormData({...formData, seller: {...formData.seller, name: e.target.value}})}
                  placeholder="Masukkan nama penjual"
                />
              </div>

              <div>
                <Label htmlFor="seller-email">Email Penjual</Label>
                <Input
                  id="seller-email"
                  value={formData.seller.email}
                  onChange={(e) => setFormData({...formData, seller: {...formData.seller, email: e.target.value}})}
                  placeholder="Masukkan email penjual (opsional)"
                />
              </div>

              <div>
                <Label htmlFor="seller-phone">No. Telepon Penjual</Label>
                <Input
                  id="seller-phone"
                  value={formData.seller.phone}
                  onChange={(e) => setFormData({...formData, seller: {...formData.seller, phone: e.target.value}})}
                  placeholder="Masukkan nomor telepon penjual (opsional)"
                />
              </div>

              {/* Add New Category */}
              <div className="border-t pt-4">
                <Label>Tambah Kategori Baru</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nama kategori baru"
                  />
                  <Button type="button" variant="outline" onClick={handleAddCategory}>
                    Tambah
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" className="gradient-primary text-white">
                  Tambah Produk
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Gambar</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
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
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    Rp {product.price.toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        product.condition === 'Seperti Baru' ? 'default' :
                        product.condition === 'Sangat Baik' ? 'secondary' : 'outline'
                      }
                    >
                      {product.condition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.isAvailable ? "default" : "destructive"}>
                      {product.isAvailable ? 'Tersedia' : 'Habis'}
                    </Badge>
                    <div className="text-xs text-gray-500">{product.status}</div>
                  </TableCell>
                  <TableCell>{product.likes}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteProduct(product)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Tidak ada produk yang sesuai dengan filter'
                      : 'Belum ada produk ditambahkan'
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Produk</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProduct} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Judul Produk *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Harga *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Deskripsi *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Kategori *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-condition">Kondisi</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value as Product['condition']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Seperti Baru">Seperti Baru</SelectItem>
                    <SelectItem value="Sangat Baik">Sangat Baik</SelectItem>
                    <SelectItem value="Baik">Baik</SelectItem>
                    <SelectItem value="Cukup Baik">Cukup Baik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-image">URL Gambar</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-available"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="edit-available">Produk tersedia</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="gradient-primary text-white">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
