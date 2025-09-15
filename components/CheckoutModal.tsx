import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ShoppingCart, 
  CreditCard,
  User, 
  Truck, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Leaf,
  Gift,
  Clock,
  Shield,
  Wallet,
  Building2,
  QrCode,
  Star
} from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  originalPrice?: number;
  location: string;
  seller: string;
  charity: number;
  rating: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [buyerData, setBuyerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [paymentData, setPaymentData] = useState({
    method: '',
    shippingOption: '',
    insurance: false
  });

  const steps = [
    { title: "Data Pembeli", icon: User },
    { title: "Pembayaran", icon: CreditCard },
    { title: "Konfirmasi", icon: CheckCircle }
  ];

  const paymentMethods = [
    {
      id: 'cod',
      name: 'COD (Cash on Delivery)',
      icon: Truck,
      description: 'Bayar saat barang diterima',
      fee: 0,
      popular: true
    },
    {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      icon: Building2,
      description: 'BCA, Mandiri, BRI, BNI',
      fee: 0,
      popular: false
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: Wallet,
      description: 'OVO, GoPay, DANA, ShopeePay',
      fee: 0,
      popular: false
    },
    {
      id: 'qris',
      name: 'QRIS',
      icon: QrCode,
      description: 'Scan QR untuk bayar',
      fee: 0,
      popular: false
    }
  ];

  const shippingOptions = [
    {
      id: 'pickup',
      name: 'Pickup Langsung',
      price: 0,
      duration: '1-2 hari',
      description: 'Ambil langsung di lokasi penjual'
    },
    {
      id: 'regular',
      name: 'Pengiriman Regular',
      price: 15000,
      duration: '3-5 hari',
      description: 'JNE, J&T, SiCepat'
    },
    {
      id: 'express',
      name: 'Express Same Day',
      price: 25000,
      duration: 'Hari ini',
      description: 'Untuk area Jabodetabek'
    }
  ];

  if (!product) return null;

  const selectedShipping = shippingOptions.find(opt => opt.id === paymentData.shippingOption);
  const shippingCost = selectedShipping?.price || 0;
  const insuranceCost = paymentData.insurance ? Math.floor(product.price * 0.005) : 0;
  const totalCost = product.price + shippingCost + insuranceCost;

  const handleBuyerDataChange = (field: string, value: string) => {
    setBuyerData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentDataChange = (field: string, value: string | boolean) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    if (isSuccess) {
      setIsSuccess(false);
      setCurrentStep(0);
      setBuyerData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
      });
      setPaymentData({
        method: '',
        shippingOption: '',
        insurance: false
      });
    }
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return buyerData.name && buyerData.email && buyerData.phone && buyerData.address && buyerData.city;
      case 1:
        return paymentData.method && paymentData.shippingOption;
      case 2:
        return true;
      default:
        return false;
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Pembelian Berhasil</DialogTitle>
            <DialogDescription>
              Konfirmasi bahwa pembelian Anda telah berhasil diproses
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pembelian Berhasil! 🎉
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Terima kasih telah berbelanja ramah lingkungan. Anda telah membantu panti asuhan dengan 
              <span className="font-bold text-green-600"> Rp {product.charity.toLocaleString('id-ID')}</span>
            </p>
            
            <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Dampak Lingkungan</span>
              </div>
              <p className="text-sm text-green-700">
                Anda telah menghemat 0.8kg CO₂ dan mendukung ekonomi sirkular! 🌱
              </p>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full gradient-primary text-white" onClick={handleClose}>
                Lihat Status Pesanan
              </Button>
              <Button variant="outline" className="w-full" onClick={handleClose}>
                Kembali ke Marketplace
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            Checkout - {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {currentStep === 0 && "Masukkan data pembeli untuk proses checkout"}
            {currentStep === 1 && "Pilih metode pembayaran dan pengiriman"}
            {currentStep === 2 && "Konfirmasi detail pesanan sebelum checkout"}
          </DialogDescription>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  index <= currentStep 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="h-4 w-4" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                    index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground mt-2">
            Langkah {currentStep + 1} dari {steps.length}
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Buyer Information */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-green-600" />
                    Informasi Pembeli
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        value={buyerData.name}
                        onChange={(e) => handleBuyerDataChange('name', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        placeholder="08xxxxxxxxx"
                        value={buyerData.phone}
                        onChange={(e) => handleBuyerDataChange('phone', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contoh@email.com"
                        value={buyerData.email}
                        onChange={(e) => handleBuyerDataChange('email', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Alamat Lengkap *</Label>
                      <Textarea
                        id="address"
                        placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                        value={buyerData.address}
                        onChange={(e) => handleBuyerDataChange('address', e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota *</Label>
                      <Input
                        id="city"
                        placeholder="Nama kota"
                        value={buyerData.city}
                        onChange={(e) => handleBuyerDataChange('city', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postal">Kode Pos</Label>
                      <Input
                        id="postal"
                        placeholder="12345"
                        value={buyerData.postalCode}
                        onChange={(e) => handleBuyerDataChange('postalCode', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Catatan untuk Penjual</Label>
                      <Textarea
                        id="notes"
                        placeholder="Catatan khusus atau permintaan tambahan"
                        value={buyerData.notes}
                        onChange={(e) => handleBuyerDataChange('notes', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment & Shipping */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Shipping Options */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    Opsi Pengiriman
                  </h3>
                  
                  <div className="grid gap-3">
                    {shippingOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                          paymentData.shippingOption === option.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => handlePaymentDataChange('shippingOption', option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-foreground">{option.name}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                            <div className="text-sm text-green-600 font-medium mt-1">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {option.duration}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-foreground">
                              {option.price === 0 ? 'Gratis' : `Rp ${option.price.toLocaleString('id-ID')}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    Metode Pembayaran
                  </h3>
                  
                  <div className="grid gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                          paymentData.method === method.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => handlePaymentDataChange('method', method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <method.icon className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground flex items-center gap-2">
                                {method.name}
                                {method.popular && (
                                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{method.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-green-600 font-medium">
                              {method.fee === 0 ? 'Gratis' : `+Rp ${method.fee.toLocaleString('id-ID')}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance Option */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-foreground">Asuransi Pengiriman</div>
                        <div className="text-sm text-muted-foreground">
                          Perlindungan barang rusak/hilang selama pengiriman
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-blue-600">
                        +Rp {Math.floor(product.price * 0.005).toLocaleString('id-ID')}
                      </span>
                      <input
                        type="checkbox"
                        checked={paymentData.insurance}
                        onChange={(e) => handlePaymentDataChange('insurance', e.target.checked)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Konfirmasi Pesanan
                  </h3>
                  
                  {/* Order Summary */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-3">Data Pembeli</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Nama:</span>
                          <span className="ml-2 font-medium">{buyerData.name}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Telepon:</span>
                          <span className="ml-2 font-medium">{buyerData.phone}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="ml-2 font-medium">{buyerData.email}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Alamat:</span>
                          <span className="ml-2 font-medium">{buyerData.address}, {buyerData.city}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-3">Detail Pengiriman & Pembayaran</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pengiriman:</span>
                          <span className="font-medium">{selectedShipping?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pembayaran:</span>
                          <span className="font-medium">
                            {paymentMethods.find(m => m.id === paymentData.method)?.name}
                          </span>
                        </div>
                        {paymentData.insurance && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Asuransi:</span>
                            <span className="font-medium text-blue-600">Termasuk</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Product Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Product Card */}
              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-foreground mb-4">Ringkasan Pesanan</h4>
                
                <div className="flex gap-3 mb-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-100 rounded-full p-1">
                      <Leaf className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground text-sm line-clamp-2">
                      {product.title}
                    </h5>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-amber-400 fill-current" />
                      <span className="text-xs text-muted-foreground">{product.rating}</span>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs mt-1">
                      {product.category}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Harga Barang</span>
                    <span className="font-medium">Rp {product.price.toLocaleString('id-ID')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ongkos Kirim</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Gratis' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
                    </span>
                  </div>
                  
                  {paymentData.insurance && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Asuransi</span>
                      <span className="font-medium">Rp {insuranceCost.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">Rp {totalCost.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Charity Impact */}
                <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-4 w-4 text-pink-600" />
                    <span className="text-sm font-medium text-pink-800">Dampak Sosial</span>
                  </div>
                  <p className="text-xs text-pink-700">
                    <span className="font-bold">Rp {product.charity.toLocaleString('id-ID')}</span> akan disalurkan ke panti asuhan
                  </p>
                </div>

                {/* Environmental Impact */}
                <div className="bg-green-50 rounded-lg p-3 border border-green-100 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Dampak Lingkungan</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Menghemat <span className="font-bold">0.8kg CO₂</span> dan mendukung ekonomi sirkular
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Sebelumnya
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="gradient-primary text-white flex items-center gap-2"
            >
              Selanjutnya
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handlePurchase}
              disabled={!isStepValid() || isProcessing}
              className="gradient-primary text-white flex items-center gap-2 min-w-[120px]"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </div>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Beli Sekarang
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}