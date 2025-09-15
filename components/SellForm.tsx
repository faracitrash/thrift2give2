import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Upload, Camera, CheckCircle, AlertCircle, DollarSign, Package } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SellFormProps {
  onSellClick?: () => void;
}

export function SellForm({ onSellClick }: SellFormProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    itemName: '',
    condition: '',
    description: '',
    price: '',
    originalPrice: '',
    location: '',
    pickupOption: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      alert('Terima kasih! Barang Anda telah berhasil didaftarkan untuk dijual. Tim kami akan segera menghubungi Anda untuk verifikasi.');
      setIsSubmitted(false);
      setCurrentStep(0);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        itemName: '',
        condition: '',
        description: '',
        price: '',
        originalPrice: '',
        location: '',
        pickupOption: ''
      });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: "Informasi Penjual", fields: ['name', 'email', 'phone'] },
    { title: "Detail Barang", fields: ['category', 'itemName', 'condition', 'description'] },
    { title: "Harga & Pengiriman", fields: ['price', 'originalPrice', 'location', 'pickupOption'] }
  ];

  const isStepComplete = (stepIndex: number) => {
    return steps[stepIndex].fields.every(field => formData[field as keyof typeof formData]);
  };

  const calculateEarnings = () => {
    const price = parseFloat(formData.price) || 0;
    const sellerEarnings = price * 0.7; // 70% untuk penjual
    const charityDonation = price * 0.2; // 20% untuk panti
    return { sellerEarnings, charityDonation };
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-48 h-48 gradient-secondary rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 gradient-accent rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div 
          className="max-w-4xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.6s ease-out 0.2s'
              }}
            >
              <Package className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Jual & Berbagi Kebaikan</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Jual Barang Anda
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ubah barang yang tidak terpakai menjadi sumber kebaikan. Proses mudah, transparan, dan menguntungkan semua pihak.
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="gradient-primary text-white relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              </div>
              <CardTitle className="text-2xl relative z-10 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <DollarSign className="h-6 w-6" />
                </div>
                Form Penjualan Barang
              </CardTitle>
              
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mt-6 relative z-10">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center flex-1">
                    <div className={`w-full h-2 rounded-full transition-all duration-500 ${
                      index <= currentStep 
                        ? 'bg-white/40' 
                        : 'bg-white/20'
                    }`}>
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{
                          width: index < currentStep ? '100%' : 
                                index === currentStep ? '50%' : '0%'
                        }}
                      />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-4 h-2 bg-white/20 mx-1"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-sm text-white/80 mt-2 relative z-10">
                Langkah {currentStep + 1} dari {steps.length}: {steps[currentStep].title}
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Seller Information */}
                <div 
                  className={`space-y-6 transition-all duration-300 ${currentStep !== 0 ? 'hidden' : ''}`}
                  style={{
                    opacity: currentStep === 0 ? 1 : 0,
                    transform: currentStep === 0 ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        Nama Lengkap *
                        {formData.name && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </Label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="transition-all duration-300 focus:shadow-md"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        Email *
                        {formData.email && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contoh@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="transition-all duration-300 focus:shadow-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      Nomor Telepon *
                      {formData.phone && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Input
                      id="phone"
                      placeholder="08xxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="transition-all duration-300 focus:shadow-md"
                      required
                    />
                  </div>
                </div>

                {/* Step 2: Item Details */}
                <div 
                  className={`space-y-6 transition-all duration-300 ${currentStep !== 1 ? 'hidden' : ''}`}
                  style={{
                    opacity: currentStep === 1 ? 1 : 0,
                    transform: currentStep === 1 ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="flex items-center gap-2">
                        Kategori Barang *
                        {formData.category && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                        <SelectTrigger className="transition-all duration-300 focus:shadow-md">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clothing">Pakaian</SelectItem>
                          <SelectItem value="books">Buku & Majalah</SelectItem>
                          <SelectItem value="electronics">Elektronik</SelectItem>
                          <SelectItem value="baby">Perlengkapan Bayi</SelectItem>
                          <SelectItem value="kitchen">Peralatan Dapur</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="sports">Hobi & Olahraga</SelectItem>
                          <SelectItem value="others">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="condition" className="flex items-center gap-2">
                        Kondisi Barang *
                        {formData.condition && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </Label>
                      <Select value={formData.condition} onValueChange={(value) => handleChange('condition', value)}>
                        <SelectTrigger className="transition-all duration-300 focus:shadow-md">
                          <SelectValue placeholder="Pilih kondisi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Sangat Baik (95-100%)</SelectItem>
                          <SelectItem value="good">Baik (80-94%)</SelectItem>
                          <SelectItem value="fair">Cukup (60-79%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                    <Label htmlFor="itemName" className="flex items-center gap-2">
                      Nama Barang *
                      {formData.itemName && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Input
                      id="itemName"
                      placeholder="Contoh: iPhone 12 64GB Space Gray"
                      value={formData.itemName}
                      onChange={(e) => handleChange('itemName', e.target.value)}
                      className="transition-all duration-300 focus:shadow-md"
                      required
                    />
                  </div>

                  <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                    <Label htmlFor="description" className="flex items-center gap-2">
                      Deskripsi Barang *
                      {formData.description && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan detail barang seperti ukuran, warna, merk, tahun pembelian, kelengkapan, dll."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      className="transition-all duration-300 focus:shadow-md"
                      required
                    />
                  </div>
                </div>

                {/* Step 3: Pricing & Delivery */}
                <div 
                  className={`space-y-6 transition-all duration-300 ${currentStep !== 2 ? 'hidden' : ''}`}
                  style={{
                    opacity: currentStep === 2 ? 1 : 0,
                    transform: currentStep === 2 ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                      <Label htmlFor="price" className="flex items-center gap-2">
                        Harga Jual (Rp) *
                        {formData.price && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="150000"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        className="transition-all duration-300 focus:shadow-md"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                      <Label htmlFor="originalPrice" className="flex items-center gap-2">
                        Harga Beli Dulu (Rp)
                        {formData.originalPrice && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        placeholder="500000"
                        value={formData.originalPrice}
                        onChange={(e) => handleChange('originalPrice', e.target.value)}
                        className="transition-all duration-300 focus:shadow-md"
                      />
                      <p className="text-xs text-muted-foreground">Optional, untuk menunjukkan value barang</p>
                    </div>
                  </div>

                  {/* Earnings Calculator */}
                  {formData.price && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                      <h4 className="font-semibold text-foreground mb-4">Perkiraan Pendapatan & Dampak</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            Rp {calculateEarnings().sellerEarnings.toLocaleString('id-ID')}
                          </div>
                          <div className="text-sm text-muted-foreground">Anda Terima (70%)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-pink-600">
                            Rp {calculateEarnings().charityDonation.toLocaleString('id-ID')}
                          </div>
                          <div className="text-sm text-muted-foreground">Untuk Panti (20%)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            Rp {(parseFloat(formData.price) * 0.1).toLocaleString('id-ID')}
                          </div>
                          <div className="text-sm text-muted-foreground">Operasional (10%)</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                      <Label htmlFor="location" className="flex items-center gap-2">
                        Lokasi Barang *
                        {formData.location && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </Label>
                      <Input
                        id="location"
                        placeholder="Kota/Kabupaten"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="transition-all duration-300 focus:shadow-md"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickupOption" className="flex items-center gap-2">
                        Opsi Pengiriman *
                        {formData.pickupOption && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </Label>
                      <Select value={formData.pickupOption} onValueChange={(value) => handleChange('pickupOption', value)}>
                        <SelectTrigger className="transition-all duration-300 focus:shadow-md">
                          <SelectValue placeholder="Pilih opsi pengiriman" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pickup">COD/Pickup Langsung</SelectItem>
                          <SelectItem value="shipping">Kirim via Kurir</SelectItem>
                          <SelectItem value="both">Pickup & Kirim</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label>Foto Barang (Minimal 3 foto) *</Label>
                    <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 cursor-pointer hover:scale-102 active:scale-98">
                      <div className="space-y-4">
                        <div 
                          className="flex justify-center space-x-4"
                          style={{
                            animation: 'float 3s ease-in-out infinite'
                          }}
                        >
                          <Camera className="h-12 w-12 text-primary" />
                          <Upload className="h-12 w-12 text-accent" />
                        </div>
                        <div>
                          <p className="text-foreground mb-2 font-medium">
                            Upload foto dari berbagai sudut
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Foto yang jelas meningkatkan peluang terjual hingga 80%<br/>
                            Format: JPG, PNG, maksimal 5MB per foto
                          </p>
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="hover:shadow-md transition-all"
                          onClick={onSellClick}
                        >
                          Upload Foto & Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="transition-all hover:shadow-md"
                  >
                    Sebelumnya
                  </Button>

                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!isStepComplete(currentStep)}
                      className="gradient-primary text-white hover:shadow-glow transition-all"
                    >
                      Selanjutnya
                    </Button>
                  ) : (
                    <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                      <Button 
                        type="button"
                        onClick={onSellClick}
                        className="gradient-primary text-white px-8 hover:shadow-glow transition-all"
                      >
                        Jual Barang Lengkap
                      </Button>
                    </div>
                  )}
                </div>

                <div 
                  className="text-center pt-4"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: 'opacity 0.6s ease-out 0.5s'
                  }}
                >
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Dengan mendaftarkan barang, Anda setuju dengan pembagian hasil dan syarat ketentuan platform
                    </span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .focus-within\\:scale-102:focus-within {
          transform: scale(1.02);
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}