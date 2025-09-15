import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Upload, Camera, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function DonationForm() {
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
    location: ''
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
      alert('Terima kasih! Donasi Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.');
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
        location: ''
      });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: "Informasi Pribadi", fields: ['name', 'email', 'phone'] },
    { title: "Detail Barang", fields: ['category', 'itemName', 'condition'] },
    { title: "Deskripsi & Lokasi", fields: ['description', 'location'] }
  ];

  const isStepComplete = (stepIndex: number) => {
    return steps[stepIndex].fields.every(field => formData[field as keyof typeof formData]);
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
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="font-medium text-primary">Mudah & Cepat</span>
            </div>
            
            <h2 className="mb-6">
              Form Donasi Barang
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Isi form di bawah ini untuk mendonasikan barang Anda. Proses hanya memakan waktu 2-3 menit.
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="gradient-primary text-white relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              </div>
              <CardTitle className="relative z-10 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                Informasi Donasi
              </CardTitle>
              
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mt-6 relative z-10">
                {steps.map((_, index) => (
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
              
              <div className="text-white/80 mt-2 relative z-10">
                Langkah {currentStep + 1} dari {steps.length}: {steps[currentStep].title}
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Personal Information */}
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
                          <SelectItem value="excellent">Sangat Baik</SelectItem>
                          <SelectItem value="good">Baik</SelectItem>
                          <SelectItem value="fair">Cukup</SelectItem>
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
                      placeholder="Contoh: Kemeja Lengan Panjang"
                      value={formData.itemName}
                      onChange={(e) => handleChange('itemName', e.target.value)}
                      className="transition-all duration-300 focus:shadow-md"
                      required
                    />
                  </div>
                </div>

                {/* Step 3: Description & Location */}
                <div 
                  className={`space-y-6 transition-all duration-300 ${currentStep !== 2 ? 'hidden' : ''}`}
                  style={{
                    opacity: currentStep === 2 ? 1 : 0,
                    transform: currentStep === 2 ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                    <Label htmlFor="description" className="flex items-center gap-2">
                      Deskripsi Barang *
                      {formData.description && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan detail barang seperti ukuran, warna, merk, dll."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      className="transition-all duration-300 focus:shadow-md"
                      required
                    />
                  </div>

                  <div className="space-y-2 focus-within:scale-102 transition-transform duration-300">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      Lokasi Pengambilan *
                      {formData.location && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </Label>
                    <Input
                      id="location"
                      placeholder="Alamat lengkap untuk pengambilan barang"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="transition-all duration-300 focus:shadow-md"
                      required
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label>Foto Barang *</Label>
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
                            Klik untuk upload atau drag & drop foto barang
                          </p>
                          <p className="text-muted-foreground">
                            Format: JPG, PNG, maksimal 5MB
                          </p>
                        </div>
                        <Button type="button" variant="outline" size="sm" className="hover:shadow-md transition-all">
                          Pilih Foto
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
                        type="submit" 
                        disabled={isSubmitted || !isStepComplete(currentStep)}
                        className="gradient-primary text-white px-8 hover:shadow-glow transition-all"
                      >
                        {isSubmitted ? (
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              style={{
                                animation: 'spin 1s linear infinite'
                              }}
                            />
                            Mengirim...
                          </div>
                        ) : (
                          "Kirim Donasi"
                        )}
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
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Dengan mengirim form ini, Anda setuju bahwa barang yang didonasikan dalam kondisi layak pakai
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