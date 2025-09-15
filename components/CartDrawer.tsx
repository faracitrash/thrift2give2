import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { ShoppingCart, Plus, Minus, Trash2, Leaf, Gift, ArrowRight, X } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (items: any[]) => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCharityTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      onCheckout(cartItems);
      onClose();
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Fashion & Pakaian": "bg-emerald-100 text-emerald-800",
      "Buku & Edukasi": "bg-green-100 text-green-800", 
      "Furniture & Rumah": "bg-teal-100 text-teal-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getShippingCost = () => {
    // Simplified shipping calculation
    if (cartItems.length === 0) return 0;
    if (getCartTotal() > 500000) return 0; // Free shipping for orders > 500K
    return 15000;
  };

  const shippingCost = getShippingCost();
  const finalTotal = getCartTotal() + shippingCost;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-hidden p-0 bg-white">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 pb-4 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <SheetTitle className="text-xl text-foreground">Keranjang Belanja</SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground">
                    {cartItems.length} item di keranjang Anda
                  </SheetDescription>
                </div>
              </div>
              
              {cartItems.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </SheetHeader>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="p-4 bg-gray-100 rounded-full mb-6">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Keranjang Masih Kosong
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Mulai berbelanja produk ramah lingkungan dan bantu panti asuhan sekarang!
              </p>
              <Button onClick={onClose} className="gradient-primary text-white">
                Mulai Berbelanja
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white border border-green-100 rounded-xl p-4 hover:shadow-md transition-all">
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        {item.eco && (
                          <div className="absolute -top-2 -right-2 bg-green-100 rounded-full p-1">
                            <Leaf className="h-3 w-3 text-green-600" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground text-sm line-clamp-2 pr-2">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <Badge className={`${getCategoryColor(item.category)} text-xs mb-2`}>
                          {item.category}
                        </Badge>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-green-600">
                              Rp {item.price.toLocaleString('id-ID')}
                            </div>
                            <div className="text-xs text-pink-600 font-medium">
                              💝 Rp {item.charity.toLocaleString('id-ID')} untuk panti
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-green-200 flex items-center justify-center hover:bg-green-50 transition-colors"
                            >
                              <Minus className="h-3 w-3 text-green-600" />
                            </button>
                            
                            <span className="w-8 text-center font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors"
                            >
                              <Plus className="h-3 w-3 text-green-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary & Checkout */}
              <div className="border-t border-green-100 p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                {/* Impact Summary */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-green-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-pink-600" />
                      <span className="text-sm font-semibold text-pink-800">Dampak Sosial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Dampak Lingkungan</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-pink-600">
                        Rp {getCharityTotal().toLocaleString('id-ID')}
                      </div>
                      <div className="text-xs text-pink-700">Untuk panti asuhan</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        {(cartItems.length * 0.8).toFixed(1)}kg CO₂
                      </div>
                      <div className="text-xs text-green-700">Dihemat</div>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({cartItems.length} item)</span>
                    <span className="font-medium">Rp {getCartTotal().toLocaleString('id-ID')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ongkos Kirim</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        `Rp ${shippingCost.toLocaleString('id-ID')}`
                      )}
                    </span>
                  </div>
                  
                  {shippingCost === 0 && getCartTotal() > 500000 && (
                    <div className="text-xs text-green-600 text-center bg-green-50 rounded px-2 py-1">
                      🎉 Selamat! Anda mendapat gratis ongkir
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span className="text-green-600">Rp {finalTotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  onClick={handleCheckout}
                  className="w-full gradient-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-glow transition-all"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Checkout Sekarang
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Pembayaran aman & terpercaya 🔒
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}