import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { useAuth } from './AuthContext';
import { Bell, Heart, ShoppingCart, Building2, Settings, CheckCheck, Gift } from 'lucide-react';

interface NotificationDropdownProps {
  onNotificationClick?: (notificationId: string) => void;
}

export function NotificationDropdown({ onNotificationClick }: NotificationDropdownProps) {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-pink-500" />;
      case 'purchase':
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case 'donation':
        return <Building2 className="h-4 w-4 text-green-500" />;
      case 'system':
        return <Gift className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'bg-pink-50 border-pink-200';
      case 'purchase':
        return 'bg-blue-50 border-blue-200';
      case 'donation':
        return 'bg-green-50 border-green-200';
      case 'system':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatRelativeTime = (timestamp: string) => {
    try {
      const now = new Date();
      const date = new Date(timestamp);
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (diffInSeconds < 60) return 'Baru saja';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
      if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
      
      return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    } catch {
      return 'Baru saja';
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      markNotificationRead(notification.id);
    }
    onNotificationClick?.(notification.id);
  };

  const clearAllNotifications = () => {
    markAllNotificationsRead();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative hover:bg-green-50 transition-colors duration-300 clickable-fix"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white animate-pulse pointer-events-none"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-80 p-0 shadow-2xl border-0 bg-white/95 backdrop-blur-sm dropdown-clickable"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Notifikasi</h3>
            </div>
            
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 font-medium">
                {unreadCount} baru
              </Badge>
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllNotifications}
                className="border-green-200 text-green-700 hover:bg-green-50 z-10 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Tandai Semua Dibaca
              </Button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <p className="mb-1">Belum Ada Notifikasi</p>
            <p className="text-gray-400">
              Notifikasi akan muncul di sini saat Anda berinteraksi dengan platform
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-96">
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <DropdownMenuItem
                    className={`p-0 cursor-pointer focus:bg-transparent z-10 ${!notification.isRead ? 'bg-green-50/50' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <div className={`w-full p-3 rounded-lg border transition-all duration-300 hover:shadow-md ${
                      !notification.isRead 
                        ? `${getTypeColor(notification.type)} border-l-4` 
                        : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          !notification.isRead ? 'bg-white shadow-sm' : 'bg-gray-100'
                        }`}>
                          {notification.avatar ? (
                            <span>{notification.avatar}</span>
                          ) : (
                            getNotificationIcon(notification.type)
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`font-medium line-clamp-1 ${
                              !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h4>
                            
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-gray-400">
                              {formatRelativeTime(notification.timestamp)}
                            </span>
                            
                            {notification.type === 'donation' && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Donasi
                              </Badge>
                            )}
                            
                            {notification.type === 'like' && (
                              <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                                Wishlist
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  {index < notifications.length - 1 && (
                    <div className="my-1" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-3 bg-gray-50">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 z-10 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                <Settings className="h-3 w-3 mr-2" />
                Pengaturan Notifikasi
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}