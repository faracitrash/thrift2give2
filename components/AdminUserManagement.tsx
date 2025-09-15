import React, { useState } from 'react';
import { useAdmin, AdminUser } from './AdminContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Search, UserCheck, UserX, Shield, User } from 'lucide-react';
import { toast } from 'sonner';

export const AdminUserManagement: React.FC = () => {
  const { users, updateUserStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleStatusChange = (userId: string, newStatus: AdminUser['status']) => {
    updateUserStatus(userId, newStatus);
    toast.success(`Status user berhasil diubah menjadi ${newStatus === 'active' ? 'aktif' : 'suspended'}`);
    
    // Update selected user if it's currently being viewed
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }
  };

  const handleViewUser = (user: AdminUser) => {
    setSelectedUser(user);
    setIsDetailDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: AdminUser['status']) => {
    return status === 'active' 
      ? <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>
      : <Badge variant="destructive">Suspended</Badge>;
  };

  const getRoleBadge = (role: AdminUser['role']) => {
    return role === 'admin'
      ? <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      : <Badge variant="outline">
          <User className="w-3 h-3 mr-1" />
          User
        </Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Manajemen Pengguna</h2>
        <p className="text-gray-600">Kelola semua pengguna terdaftar di platform</p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari pengguna berdasarkan nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-40">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Role</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Pengguna Aktif</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {users.filter(u => u.status === 'suspended').length}
            </p>
            <p className="text-sm text-gray-600">Suspended</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.isVerified).length}
            </p>
            <p className="text-sm text-gray-600">Terverifikasi</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-sm text-gray-600">Admin</p>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verifikasi</TableHead>
                <TableHead>Total Pembelian</TableHead>
                <TableHead>Total Donasi</TableHead>
                <TableHead>Bergabung</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">ID: {user.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {user.isVerified ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        <UserX className="w-3 h-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{user.totalPurchases}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 font-medium">
                      Rp {user.totalDonations.toLocaleString('id-ID')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {formatDate(user.joinDate)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewUser(user)}
                      >
                        Detail
                      </Button>
                      {user.status === 'active' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(user.id, 'suspended')}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Aktifkan
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    {searchTerm || statusFilter !== 'all' || roleFilter !== 'all'
                      ? 'Tidak ada pengguna yang sesuai dengan filter'
                      : 'Belum ada pengguna terdaftar'
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pengguna</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              {/* User Info Header */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
                <div className="text-right space-y-2">
                  {getRoleBadge(selectedUser.role)}
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Informasi Akun</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">User ID</p>
                      <p className="font-medium">{selectedUser.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tanggal Bergabung</p>
                      <p className="font-medium">{formatDate(selectedUser.joinDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status Verifikasi</p>
                      {selectedUser.isVerified ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Terverifikasi
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          <UserX className="w-3 h-3 mr-1" />
                          Belum Terverifikasi
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Aktivitas</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Total Pembelian</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedUser.totalPurchases}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Donasi</p>
                      <p className="text-2xl font-bold text-green-600">
                        Rp {selectedUser.totalDonations.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                {selectedUser.status === 'active' ? (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(selectedUser.id, 'suspended')}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Suspend User
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(selectedUser.id, 'active')}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Aktifkan User
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Tutup
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};