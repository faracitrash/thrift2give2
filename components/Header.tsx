import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from "./AuthContext";
import { NotificationDropdown } from "./NotificationDropdown";
import { LoginModal } from "./LoginModal";
import { ShoppingCart, Menu, X, User, LogOut, Settings, Heart, Package, BarChart3, HelpCircle, Shield } from "lucide-react";
import kariaKitaLogo from '@/assets/logo.png';

interface HeaderProps {
  onCartOpen: () => void;
  onAdminAccess?: () => void;
}

export function Header({ onCartOpen, onAdminAccess }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout, likedProducts } = useAuth();

  const navItems = [
    { href: "#home", label: "Beranda" },
    { href: "#how-it-works", label: "GreenSteps" },
    { href: "#categories", label: "Favorit Thrift" },
    { href: "#marketplace", label: "EcoMarket" },
    { href: "#contact", label: "Kontak" }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Made larger */}
            <div className="flex items-center">
              <img 
                src={kariaKitaLogo} 
                alt="KariaKita" 
                className="h-12 md:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <NotificationDropdown />

                  {/* Cart */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onCartOpen}
                    className="relative hover:bg-green-50 transition-colors duration-300 clickable-fix"
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                    {likedProducts.length > 0 && (
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-500 text-white text-xs font-bold pointer-events-none"
                      >
                        {likedProducts.length > 9 ? '9+' : likedProducts.length}
                      </Badge>
                    )}
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="relative h-10 w-10 rounded-full hover:bg-green-50 clickable-fix"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                            {user ? getUserInitials(user.name) : ''}
                          </AvatarFallback>
                        </Avatar>
                        {user?.isVerified && (
                          <div className="absolute -bottom-0 -right-0 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center pointer-events-none">
                            <Shield className="h-2 w-2 text-white" />
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent 
                      align="end" 
                      className="w-56 shadow-lg dropdown-clickable"
                    >
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                              {user ? getUserInitials(user.name) : ''}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {user?.name}
                              {user?.isVerified && (
                                <Shield className="inline h-3 w-3 text-blue-500 ml-1" />
                              )}
                            </p>
                            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                {user?.totalPurchases || 0} pembelian
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem 
                        className="cursor-pointer z-10" 
                        style={{ pointerEvents: 'auto' }}
                      >
                        <User className="h-4 w-4 mr-3" />
                        <div className="flex-1">
                          <div className="text-sm">Profil Saya</div>
                          <div className="text-xs text-gray-500">Kelola informasi akun</div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        className="cursor-pointer z-10" 
                        style={{ pointerEvents: 'auto' }}
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        <div className="flex-1">
                          <div className="text-sm flex items-center gap-2">
                            Wishlist
                            {likedProducts.length > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {likedProducts.length}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">Produk favorit Anda</div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        className="cursor-pointer z-10" 
                        style={{ pointerEvents: 'auto' }}
                      >
                        <Package className="h-4 w-4 mr-3" />
                        <div className="flex-1">
                          <div className="text-sm">Pesanan Saya</div>
                          <div className="text-xs text-gray-500">Riwayat & status pesanan</div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        className="cursor-pointer z-10" 
                        style={{ pointerEvents: 'auto' }}
                      >
                        <BarChart3 className="h-4 w-4 mr-3" />
                        <div className="flex-1">
                          <div className="text-sm">Dampak Saya</div>
                          <div className="text-xs text-gray-500">Kontribusi lingkungan & sosial</div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {isAdmin && onAdminAccess && (
                        <>
                          <DropdownMenuItem 
                            className="cursor-pointer bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 z-10" 
                            onClick={onAdminAccess}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <Shield className="h-4 w-4 mr-3" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">Admin Panel</div>
                              <div className="text-xs text-purple-600">Kelola platform</div>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}

                      <DropdownMenuItem 
                        className="cursor-pointer z-10" 
                        style={{ pointerEvents: 'auto' }}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        <span>Pengaturan</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        className="cursor-pointer z-10" 
                        style={{ pointerEvents: 'auto' }}
                      >
                        <HelpCircle className="h-4 w-4 mr-3" />
                        <span>Bantuan & FAQ</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 z-10"
                        onClick={handleLogout}
                        style={{ pointerEvents: 'auto' }}
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        <span>Keluar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Cart for non-authenticated users */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onCartOpen}
                    className="hover:bg-green-50 transition-colors duration-300"
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                  </Button>

                  {/* Login Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Masuk
                  </Button>

                  <Button 
                    size="sm" 
                    className="gradient-primary text-white hover:shadow-glow transition-all duration-300"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Daftar
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
              <div className="p-4 space-y-4">
                {/* Navigation */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left py-2 px-3 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                            {user ? getUserInitials(user.name) : ''}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-600">{user?.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <NotificationDropdown />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={onCartOpen}
                            className="relative z-10 cursor-pointer"
                            style={{ pointerEvents: 'auto' }}
                          >
                            <ShoppingCart className="h-5 w-5" />
                            {likedProducts.length > 0 && (
                              <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs pointer-events-none">
                                {likedProducts.length}
                              </Badge>
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      {isAdmin && onAdminAccess && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            onAdminAccess();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 mb-2 z-10 cursor-pointer"
                          style={{ pointerEvents: 'auto' }}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleLogout}
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Keluar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setIsLoginModalOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex-1 border-green-200 text-green-700"
                      >
                        Masuk
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setIsLoginModalOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex-1 gradient-primary text-white"
                      >
                        Daftar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={onCartOpen}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}