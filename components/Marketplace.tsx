import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, MapPin, User, Eye, Filter, Search, ShoppingCart, Star, TrendingUp, Leaf, Plus } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CheckoutModal } from "./CheckoutModal";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useAdmin } from "./AdminContext";
import { LikeButton } from "./LikeButton";

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

interface MarketplaceProps {
  showMoreProducts?: boolean;
  onShowMoreProducts: () => void;
}

export function Marketplace({ showMoreProducts = false, onShowMoreProducts }: MarketplaceProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addToCart } = useCart();
  const { addNotification, isAuthenticated } = useAuth();
  const { products: adminProducts, categories } = useAdmin();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const initialProducts: Product[] = [
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
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
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
      id: 3,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80",
      title: "Dress Casual Zara",
      category: "Fashion & Pakaian",
      condition: "Sangat Baik",
      price: 275000,
      originalPrice: 550000,
      location: "Surabaya",
      seller: "Lisa W.",
      time: "3 hari yang lalu",
      status: "Terjual",
      likes: 25,
      views: 89,
      charity: 55000,
      rating: 5.0,
      eco: true
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=400&q=80",
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
      id: 5,
      image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=400&q=80",
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
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=400&q=80",
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
    }
  ];

  const additionalProducts: Product[] = [
    {
      id: 1007,
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
    },
    {
      id: 1008,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=400&q=80",
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
    },
    {
      id: 1009,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
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
  ];

  // Convert admin products to marketplace format with unique IDs
  const convertAdminProductToMarketplace = (adminProduct: any, index: number): Product => ({
    id: 10000 + parseInt(adminProduct.id) + index, // Add offset to avoid conflicts with initial products
    image: adminProduct.image,
    title: adminProduct.title,
    category: adminProduct.category,
    condition: adminProduct.condition,
    price: adminProduct.price,
    originalPrice: adminProduct.price + Math.floor(adminProduct.price * 0.3), // Simulate original price
    location: "Jakarta", // Default location
    seller: adminProduct.seller.name,
    time: new Date(adminProduct.dateAdded).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    status: adminProduct.isAvailable ? "Tersedia" : "Terjual",
    likes: adminProduct.likes,
    views: Math.floor(Math.random() * 100) + 20, // Random views
    charity: Math.floor(adminProduct.price * 0.2), // 20% for charity
    rating: adminProduct.seller.rating,
    eco: true
  });

  // Only show approved admin products in marketplace
  const approvedAdminProducts = adminProducts.filter(product => product.status === 'approved');
  const adminProductsConverted = approvedAdminProducts.map((product, index) => 
    convertAdminProductToMarketplace(product, index)
  );
  const allProducts = [...adminProductsConverted, ...initialProducts];
  const products = showMoreProducts ? [...allProducts, ...additionalProducts] : allProducts;

  const filters = ["Semua", ...categories];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-100 text-green-800 border-green-200";
      case "Terjual":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const getDiscountPercentage = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = selectedFilter === "Semua" || product.category === selectedFilter;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBuyNow = (product: Product) => {
    if (product.status === "Tersedia") {
      setSelectedProduct(product);
      setIsCheckoutOpen(true);
      
      // Add notification for purchase attempt
      if (isAuthenticated) {
        addNotification({
          type: 'purchase',
          title: 'Memproses Pembelian 🛒',
          message: `Sedang mempersiapkan checkout untuk "${product.title}"`
        });
      }
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.status === "Tersedia") {
      addToCart(product);
      
      // Add notification for add to cart
      if (isAuthenticated) {
        addNotification({
          type: 'purchase',
          title: 'Ditambahkan ke Keranjang 🛒',
          message: `"${product.title}" berhasil ditambahkan ke keranjang belanja Anda`
        });
      }
    }
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section id="marketplace" className="py-24 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 gradient-cool rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 gradient-nature rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10" ref={ref}>
          <div 
            className="text-center mb-16"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            <div 
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.6s ease-out 0.2s'
              }}
            >
              <ShoppingCart className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">Marketplace Sustainability</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Marketplace Hijau
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Temukan barang berkualitas dengan harga terjangkau. Setiap pembelian membantu panti asuhan dan menyelamatkan lingkungan.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div 
            className="mb-12"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.3s'
            }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari barang ramah lingkungan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/70 backdrop-blur-sm border-green-200 focus:bg-white focus:border-green-400 transition-all"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap hover:scale-105 active:scale-95 duration-300 ${
                      selectedFilter === filter
                        ? 'gradient-primary text-white shadow-lg'
                        : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Results count */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div 
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: 'opacity 0.6s ease-out 0.5s'
                }}
              >
                Menampilkan {filteredProducts.length} dari {products.length} produk ramah lingkungan
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Urutkan: Paling Eco-Friendly</span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map((product, index) => (
              <div
                key={`product-${product.id}`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.6s ease-out ${0.4 + index * 0.1}s`
                }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-soft bg-white overflow-hidden h-full hover:-translate-y-1">
                  <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <div className="hover:scale-105 transition-transform duration-300">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 space-y-2">
                          <Button 
                            size="sm" 
                            className={`w-full ${product.status === "Terjual" ? "bg-gray-600" : "gradient-primary"} text-white hover:bg-green-600 font-medium`}
                            onClick={() => handleBuyNow(product)}
                            disabled={product.status === "Terjual"}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.status === "Terjual" ? "Terjual" : "Beli Sekarang"}
                          </Button>
                          
                          {product.status === "Tersedia" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="w-full bg-white/90 text-green-600 border-green-600 hover:bg-green-50 font-medium"
                              onClick={() => handleAddToCart(product)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              + Keranjang
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Status & Discount Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge className={`${getStatusColor(product.status)} text-xs font-medium border`}>
                          {product.status}
                        </Badge>
                        
                        {product.originalPrice && (
                          <Badge className="bg-red-100 text-red-800 text-xs font-bold">
                            -{getDiscountPercentage(product.price, product.originalPrice)}%
                          </Badge>
                        )}

                        {product.eco && (
                          <Badge className="bg-green-100 text-green-800 text-xs font-bold flex items-center gap-1">
                            <Leaf className="h-3 w-3" />
                            ECO
                          </Badge>
                        )}
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getCategoryColor(product.category)} text-xs font-medium`}>
                          {product.category}
                        </Badge>
                      </div>

                      {/* Like Button */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <LikeButton
                          productId={`marketplace-${product.id}`}
                          productTitle={product.title}
                          className="bg-white/90 backdrop-blur-sm hover:bg-white"
                          showCount={true}
                          initialLikes={product.likes}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Title & Rating */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-green-600 transition-colors flex-1 line-clamp-2">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          <span className="text-xs font-medium">{product.rating}</span>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-green-600">
                            Rp {product.price.toLocaleString('id-ID')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
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
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-green-600" />
                          <span>{product.seller}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{product.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span>{product.time}</span>
                        </div>
                      </div>

                      {/* Eco Impact */}
                      {product.eco && (
                        <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Leaf className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Eco Impact</span>
                          </div>
                          <p className="text-xs text-green-700">
                            Membeli produk ini menghemat 0.8kg CO₂ dan mendukung ekonomi sirkular
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">
                            Kondisi: {product.condition}
                          </span>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {product.views}
                            </span>
                            <LikeButton
                              productId={`marketplace-${product.id}`}
                              productTitle={product.title}
                              size="sm"
                              showCount={true}
                              initialLikes={product.likes}
                              className="p-0 h-auto"
                            />
                          </div>
                        </div>
                        
                        {product.status === "Tersedia" && (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button 
                              className="text-xs text-green-600 hover:text-green-700 font-semibold hover:scale-105 active:scale-95 transition-transform"
                              onClick={() => handleAddToCart(product)}
                            >
                              + Keranjang
                            </button>
                            <button 
                              className="text-xs text-green-600 hover:text-green-700 font-semibold hover:scale-105 active:scale-95 transition-transform"
                              onClick={() => handleBuyNow(product)}
                            >
                              Beli Cepat
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Load More & Stats */}
          <div 
            className="text-center"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.8s'
            }}
          >
            {/* Impact Stats */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-100">
              <h4 className="text-xl font-bold text-foreground mb-4">
                🌱 Dampak Hijau Hari Ini
              </h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Rp 1.2M</div>
                  <div className="text-sm text-muted-foreground">Total Penjualan</div>
                  <div className="text-xs text-green-600 mt-1">↑ 15% dari kemarin</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">2.5 ton</div>
                  <div className="text-sm text-muted-foreground">CO₂ Terhemat</div>
                  <div className="text-xs text-emerald-600 mt-1">🌍 Setara 120 pohon</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">45</div>
                  <div className="text-sm text-muted-foreground">Barang Direscue</div>
                  <div className="text-xs text-teal-600 mt-1">♻️ Zero waste</div>
                </div>
              </div>
            </div>

            {!showMoreProducts && (
              <div className="hover:scale-105 active:scale-95 transition-transform duration-300 inline-block">
                <Button 
                  className="gradient-primary text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-glow transition-all duration-300"
                  onClick={onShowMoreProducts}
                >
                  Lihat Lebih Banyak Produk Hijau
                </Button>
              </div>
            )}
            
            <p className="text-sm text-muted-foreground mt-4">
              Atau <span className="text-green-600 font-medium cursor-pointer hover:underline">jual barang Anda</span> dan bergabung dengan gerakan sustainable living
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        product={selectedProduct}
      />
    </>
  );
}