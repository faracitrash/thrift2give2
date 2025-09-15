import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Upload, Camera, X, CheckCircle, Star, Leaf, Gift, ArrowRight, Eye, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SellPageProps {
  onBack: () => void;
}

interface ProductForm {
  title: string;
  category: string;
  condition: string;
  description: string;
  price: string;
  originalPrice: string;
  location: string;
  images: File[];
  tags: string[];
}

export function SellPage({ onBack }: SellPageProps) {
  const [isInView, setIsInView] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ProductForm>({
    title: '',
    category: '',
    condition: '',
    description: '',
    price: '',
    originalPrice: '',
    location: '',
    images: [],
    tags: []
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    { title: "Upload Foto", icon: Upload, description: "Tambahkan foto produk Anda" },
    { title: "Detail Produk", icon: Star, description: "Isi informasi produk" },
    { title: "Preview", icon: Eye, description: "Tinjau sebelum publish" }
  ];

  const categories = [
    "Fashion & Pakaian",
    "Buku & Edukasi", 
    "Furniture & Rumah"
  ];

  const conditions = [
    { value: "Baru", label: "Baru (Tidak pernah dipakai)" },
    { value: "Sangat Baik", label: "Sangat Baik (Seperti baru)" },
    { value: "Baik", label: "Baik (Sedikit bekas pakai)" },
    { value: "Cukup", label: "Cukup (Bekas pakai normal)" }
  ];

  const popularTags = [
    "Original", "Branded", "Preloved", "Vintage", "Limited Edition",
    "Murah", "Nego", "COD", "Siap Kirim", "Terawat"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files].slice(0, 5) // Max 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (field: keyof ProductForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.images.length > 0;
      case 1:
        return formData.title && formData.category && formData.condition && 
               formData.description && formData.price && formData.location;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const calculateCharity = () => {
    const price = parseInt(formData.price) || 0;
    return Math.floor(price * 0.2); // 20% untuk panti asuhan
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setCurrentStep(0);
    setFormData({
      title: '',
      category: '',
      condition: '',
      description: '',
      price: '',
      originalPrice: '',
      location: '',
      images: [],
      tags: []
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20" ref={ref}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 gradient-primary rounded-full mb-8">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Produk Berhasil Dipublish! 🎉
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Terima kasih telah bergabung dengan gerakan sustainable living. 
              Produk Anda akan segera ditinjau dan dipublish dalam 24 jam.
            </p>

            <div className="bg-white rounded-2xl p-6 mb-8 border border-green-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    70%
                  </div>
                  <div className="text-sm text-muted-foreground">Untuk Anda</div>
                  <div className="text-lg font-semibold text-foreground">
                    Rp {Math.floor((parseInt(formData.price) || 0) * 0.7).toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600 mb-1">
                    20%
                  </div>
                  <div className="text-sm text-muted-foreground">Untuk Panti Asuhan</div>
                  <div className="text-lg font-semibold text-foreground">
                    Rp {calculateCharity().toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full sm:w-auto gradient-primary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-glow transition-all"
                onClick={resetForm}
              >
                Jual Produk Lainnya
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-white border-green-200 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-all"
                onClick={onBack}
              >
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20" ref={ref}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div 
          className="flex items-center gap-4 mb-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="bg-white/70 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-foreground">Jual Barang Anda</h1>
            <p className="text-muted-foreground">Berikan barang bekas Anda kehidupan baru dan bantu panti asuhan</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div 
          className="mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.2s'
          }}
        >
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex flex-col items-center ${index <= currentStep ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all ${
                    index <= currentStep 
                      ? 'bg-green-600 border-green-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{step.title}</div>
                    <div className="text-xs text-muted-foreground max-w-24">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 mb-8 rounded transition-all ${
                    index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step Content */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8">
            <CardContent className="p-8">
              {/* Step 1: Upload Images */}
              {currentStep === 0 && (
                <div 
                  className="space-y-6"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease-out 0.3s'
                  }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Upload Foto Produk</h2>
                    <p className="text-muted-foreground">Tambahkan foto terbaik untuk menarik pembeli (maksimal 5 foto)</p>
                  </div>

                  {/* Image Upload Area */}
                  <div 
                    className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer bg-green-50/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-green-100 rounded-full">
                        <Camera className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">Klik untuk upload foto</p>
                        <p className="text-sm text-muted-foreground">atau drag & drop file di sini</p>
                        <p className="text-xs text-muted-foreground mt-2">Format: JPG, PNG (Max 5MB per file)</p>
                      </div>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-green-200"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
                              Utama
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {formData.images.length < 5 && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full h-24 border-2 border-dashed border-green-300 rounded-lg flex items-center justify-center hover:border-green-400 transition-colors bg-green-50"
                        >
                          <Plus className="h-6 w-6 text-green-600" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Tips */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">💡 Tips Foto Terbaik:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Gunakan pencahayaan yang baik (natural light terbaik)</li>
                      <li>• Foto dari berbagai sudut (depan, belakang, detail)</li>
                      <li>• Tampilkan kondisi asli produk (jika ada cacat, foto juga)</li>
                      <li>• Background polos agar produk lebih menonjol</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 2: Product Details */}
              {currentStep === 1 && (
                <div 
                  className="space-y-6"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease-out 0.3s'
                  }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Detail Produk</h2>
                    <p className="text-muted-foreground">Isi informasi lengkap agar pembeli lebih tertarik</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Judul Produk *</Label>
                        <Input
                          id="title"
                          placeholder="Contoh: Kemeja Formal Hugo Boss Size M"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Kategori *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="condition">Kondisi *</Label>
                        <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Pilih kondisi" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map((condition) => (
                              <SelectItem key={condition.value} value={condition.value}>
                                {condition.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="location">Lokasi *</Label>
                        <Input
                          id="location"
                          placeholder="Contoh: Jakarta Selatan"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="price">Harga Jual *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="Contoh: 150000"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Anda akan menerima 70% = Rp {Math.floor((parseInt(formData.price) || 0) * 0.7).toLocaleString('id-ID')}
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="originalPrice">Harga Asli (opsional)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          placeholder="Contoh: 300000"
                          value={formData.originalPrice}
                          onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Untuk menunjukkan nilai penghematan
                        </p>
                      </div>

                      {/* Charity Calculation */}
                      <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="h-4 w-4 text-pink-600" />
                          <span className="font-semibold text-pink-800">Dampak Sosial</span>
                        </div>
                        <p className="text-sm text-pink-700">
                          <span className="font-bold">Rp {calculateCharity().toLocaleString('id-ID')}</span> akan disalurkan ke panti asuhan
                        </p>
                      </div>

                      {/* Environmental Impact */}
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-800">Dampak Lingkungan</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Menghemat <span className="font-bold">0.8kg CO₂</span> dan mendukung ekonomi sirkular
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Deskripsi Produk *</Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan kondisi, ukuran, warna, dan detail lainnya..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Tags Populer</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => addTag(tag)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            formData.tags.includes(tag)
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : 'bg-white text-gray-600 border-gray-300 hover:border-green-300'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground mb-2">Tags terpilih:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full border border-green-300 flex items-center gap-1"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Preview */}
              {currentStep === 2 && (
                <div 
                  className="space-y-6"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease-out 0.3s'
                  }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Preview Produk</h2>
                    <p className="text-muted-foreground">Pastikan semua informasi sudah benar sebelum publish</p>
                  </div>

                  {/* Product Preview Card */}
                  <Card className="border border-green-200 shadow-lg">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* Image Gallery */}
                        <div>
                          {formData.images.length > 0 && (
                            <div className="space-y-3">
                              <img
                                src={URL.createObjectURL(formData.images[0])}
                                alt="Main product"
                                className="w-full h-64 object-cover rounded-lg"
                              />
                              {formData.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                  {formData.images.slice(1).map((file, index) => (
                                    <img
                                      key={index}
                                      src={URL.createObjectURL(file)}
                                      alt={`Product ${index + 2}`}
                                      className="w-full h-16 object-cover rounded border"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{formData.title}</h3>
                            <p className="text-sm text-muted-foreground">{formData.location}</p>
                          </div>

                          <div className="flex gap-2">
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-xs rounded-full font-medium">
                              {formData.category}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full font-medium">
                              {formData.condition}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full font-medium flex items-center gap-1">
                              <Leaf className="h-3 w-3" />
                              ECO
                            </span>
                          </div>

                          <div>
                            <div className="text-2xl font-bold text-green-600">
                              Rp {parseInt(formData.price).toLocaleString('id-ID')}
                            </div>
                            {formData.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                Rp {parseInt(formData.originalPrice).toLocaleString('id-ID')}
                              </div>
                            )}
                          </div>

                          <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
                            <p className="text-xs text-pink-700">
                              💝 <span className="font-bold">Rp {calculateCharity().toLocaleString('id-ID')}</span> untuk panti asuhan
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Deskripsi</h4>
                            <p className="text-sm text-muted-foreground">{formData.description}</p>
                          </div>

                          {formData.tags.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Tags</h4>
                              <div className="flex flex-wrap gap-1">
                                {formData.tags.map((tag) => (
                                  <span 
                                    key={tag}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Impact Summary */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
                      <div className="text-lg font-bold text-green-600">70%</div>
                      <div className="text-sm text-green-700">Untuk Anda</div>
                      <div className="font-semibold text-foreground">
                        Rp {Math.floor((parseInt(formData.price) || 0) * 0.7).toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-4 border border-pink-200 text-center">
                      <div className="text-lg font-bold text-pink-600">20%</div>
                      <div className="text-sm text-pink-700">Panti Asuhan</div>
                      <div className="font-semibold text-foreground">
                        Rp {calculateCharity().toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                      <div className="text-lg font-bold text-blue-600">10%</div>
                      <div className="text-sm text-blue-700">Operasional</div>
                      <div className="font-semibold text-foreground">
                        Rp {Math.floor((parseInt(formData.price) || 0) * 0.1).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="bg-white border-green-200 text-green-700 hover:bg-green-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sebelumnya
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="gradient-primary text-white"
              >
                Selanjutnya
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="gradient-primary text-white min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </div>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Publish Produk
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}