import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, ShoppingCart, Star, Eye, Heart, Leaf, Filter, SortAsc, MapPin, User, Clock, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CheckoutModal } from "./CheckoutModal";
import { useCart } from "./CartContext";

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
  time: string;
  status: string;
  likes: number;
  views: number;
  charity: number;
  rating: number;
  eco: boolean;
}

interface CategoryDetailProps {
  category: string;
  onBack: () => void;
}

export function CategoryDetail({ category, onBack }: CategoryDetailProps) {
  const [isInView, setIsInView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

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

  // Mock data untuk setiap kategori
  const categoryProducts: Record<string, Product[]> = {
    "Fashion & Pakaian": [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
        title: "Kemeja Formal Hugo Boss",
        category: "Fashion & Pakaian",
        condition: "Sangat Baik",
        price: 185000,
        originalPrice: 650000,
        location: "Jakarta Selatan",
        seller: "Andi S.",
        time: "2 hari yang lalu",
        status: "Tersedia",
        likes: 12,
        views: 48,
        charity: 37000,
        rating: 4.8,
        eco: true
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80",
        title: "Dress Casual Zara",
        category: "Fashion & Pakaian",
        condition: "Sangat Baik",
        price: 275000,
        originalPrice: 550000,
        location: "Surabaya",
        seller: "Lisa W.",
        time: "3 hari yang lalu",
        status: "Tersedia",
        likes: 25,
        views: 89,
        charity: 55000,
        rating: 5.0,
        eco: true
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
        title: "Jaket Denim Levis Original",
        category: "Fashion & Pakaian",
        condition: "Baik",
        price: 320000,
        originalPrice: 750000,
        location: "Bandung",
        seller: "Raka M.",
        time: "1 minggu yang lalu",
        status: "Tersedia",
        likes: 18,
        views: 65,
        charity: 64000,
        rating: 4.7,
        eco: true
      }
    ],
    "Buku & Edukasi": [
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
        title: "Buku Pelajaran SMA Lengkap",
        category: "Buku & Edukasi",
        condition: "Baik",
        price: 125000,
        originalPrice: 400000,
        location: "Bandung",
        seller: "Sari M.",
        time: "1 minggu yang lalu",
        status: "Tersedia",
        likes: 8,
        views: 32,
        charity: 25000,
        rating: 4.9,
        eco: true
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        title: "Novel Tere Liye Collection",
        category: "Buku & Edukasi",
        condition: "Sangat Baik",
        price: 85000,
        originalPrice: 180000,
        location: "Yogyakarta",
        seller: "Rini D.",
        time: "1 minggu yang lalu",
        status: "Tersedia",
        likes: 15,
        views: 42,
        charity: 17000,
        rating: 4.9,
        eco: true
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
        title: "Buku Programming Complete Guide",
        category: "Buku & Edukasi",
        condition: "Sangat Baik",
        price: 165000,
        originalPrice: 320000,
        location: "Jakarta",
        seller: "Dev A.",
        time: "3 hari yang lalu",
        status: "Tersedia",
        likes: 28,
        views: 95,
        charity: 33000,
        rating: 4.8,
        eco: true
      }
    ],
    "Furniture & Rumah": [
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=80",
        title: "Meja Belajar Anak IKEA",
        category: "Furniture & Rumah",
        condition: "Baik",
        price: 450000,
        originalPrice: 800000,
        location: "Semarang",
        seller: "Agus T.",
        time: "4 hari yang lalu",
        status: "Tersedia",
        likes: 18,
        views: 67,
        charity: 90000,
        rating: 4.6,
        eco: true
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
        title: "Kursi Kantor Ergonomis",
        category: "Furniture & Rumah",
        condition: "Baik",
        price: 650000,
        originalPrice: 1200000,
        location: "Medan",
        seller: "Budi K.",
        time: "5 hari yang lalu",
        status: "Tersedia",
        likes: 22,
        views: 78,
        charity: 130000,
        rating: 4.7,
        eco: true
      },
      {
        id: 9,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=80",
        title: "Lemari Pakaian 2 Pintu",
        category: "Furniture & Rumah",
        condition: "Sangat Baik",
        price: 850000,
        originalPrice: 1500000,
        location: "Jakarta Timur",
        seller: "Maya S.",
        time: "1 minggu yang lalu",
        status: "Tersedia",
        likes: 35,
        views: 126,
        charity: 170000,
        rating: 4.9,
        eco: true
      }
    ]
  };

  const products = categoryProducts[category] || [];

  const categoryInfo = {
    "Fashion & Pakaian": {
      icon: "👕",
      description: "Pakaian bekas berkualitas untuk gaya hidup sustainable",
      impact: "Menghemat 1.2 ton CO₂ & 8,500L air",
      stats: { items: "2,450+", buyers: "890+", avgPrice: "50K-200K" }
    },
    "Buku & Edukasi": {
      icon: "📚",
      description: "Buku pelajaran dan novel untuk mencerdaskan bangsa",
      impact: "Menghemat 0.8 ton CO₂ & 2,100kg kertas",
      stats: { items: "3,120+", buyers: "1,250+", avgPrice: "15K-75K" }
    },
    "Furniture & Rumah": {
      icon: "🪑",
      description: "Perabotan rumah tangga untuk hunian nyaman",
      impact: "Menghemat 3.5 ton CO₂ & 850kg kayu",
      stats: { items: "1,680+", buyers: "420+", avgPrice: "150K-1.5M" }
    }
  };

  const currentCategoryInfo = categoryInfo[category as keyof typeof categoryInfo];

  const handleBuyNow = (product: Product) => {
    if (product.status === "Tersedia") {
      setSelectedProduct(product);
      setIsCheckoutOpen(true);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.status === "Tersedia") {
      addToCart(product);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-100 text-green-800 border-green-200";
      case "Terjual":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDiscountPercentage = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20" ref={ref}>
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
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
            
            <div className="flex items-center gap-3">
              <div className="text-3xl">{currentCategoryInfo?.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{category}</h1>
                <p className="text-muted-foreground">{currentCategoryInfo?.description}</p>
              </div>
            </div>
          </div>

          {/* Category Stats */}
          <div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-100"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.2s'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Eco Impact</span>
                </div>
                <p className="text-sm text-green-700">{currentCategoryInfo?.impact}</p>
              </div>
              
              {currentCategoryInfo?.stats && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{currentCategoryInfo.stats.items}</div>
                    <div className="text-sm text-muted-foreground">Produk Tersedia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{currentCategoryInfo.stats.buyers}</div>
                    <div className="text-sm text-muted-foreground">Happy Buyers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">{currentCategoryInfo.stats.avgPrice}</div>
                    <div className="text-sm text-muted-foreground">Range Harga</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Filters & Sort */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.3s'
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Menampilkan {products.length} produk
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/70"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-white border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
              >
                <option value="popular">Paling Populer</option>
                <option value="price_low">Harga Terendah</option>
                <option value="price_high">Harga Tertinggi</option>
                <option value="newest">Terbaru</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${0.4 + index * 0.1}s`
                }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-soft bg-white overflow-hidden h-full hover:-translate-y-2">
                  <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <div className="hover:scale-105 transition-transform duration-300">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 space-y-2">
                          <Button 
                            size="sm" 
                            className="w-full gradient-primary text-white hover:bg-green-600 font-medium"
                            onClick={() => handleBuyNow(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Beli Sekarang
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full bg-white/90 text-green-600 border-green-600 hover:bg-green-50 font-medium"
                            onClick={() => handleAddToCart(product)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            + Keranjang
                          </Button>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge className={`${getStatusColor(product.status)} text-xs font-medium border`}>
                          {product.status}
                        </Badge>
                        
                        {product.originalPrice && (
                          <Badge className="bg-red-100 text-red-800 text-xs font-bold">
                            -{getDiscountPercentage(product.price, product.originalPrice)}%
                          </Badge>
                        )}
                        
                        <Badge className="bg-green-100 text-green-800 text-xs font-bold flex items-center gap-1">
                          <Leaf className="h-3 w-3" />
                          ECO
                        </Badge>
                      </div>

                      {/* Wishlist Button */}
                      <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 hover:scale-110 duration-300">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title & Rating */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-base text-foreground group-hover:text-green-600 transition-colors flex-1 line-clamp-2">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          <span className="text-xs font-medium">{product.rating}</span>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-green-600">
                            Rp {product.price.toLocaleString('id-ID')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              Rp {product.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>
                        
                        {/* Charity Amount */}
                        <div className="text-xs text-pink-600 font-medium mt-1 bg-pink-50 inline-block px-2 py-1 rounded-full">
                          💝 Rp {product.charity.toLocaleString('id-ID')} untuk panti
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="space-y-1 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-green-600" />
                          <span>{product.seller}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded-full">
                            ✓
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-green-600" />
                          <span>{product.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-green-600" />
                          <span>{product.time}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-foreground">
                            {product.condition}
                          </span>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {product.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {product.likes}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button 
                            className="text-xs text-green-600 hover:text-green-700 font-semibold hover:scale-105 transition-transform"
                            onClick={() => handleAddToCart(product)}
                          >
                            + Keranjang
                          </button>
                          <button 
                            className="text-xs text-green-600 hover:text-green-700 font-semibold hover:scale-105 transition-transform"
                            onClick={() => handleBuyNow(product)}
                          >
                            Beli
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-glow transition-all">
              Muat Lebih Banyak Produk
            </Button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={selectedProduct}
      />
    </>
  );
}