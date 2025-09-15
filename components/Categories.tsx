import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Shirt, BookOpen, Sofa, TrendingUp, Users, ShoppingBag, Leaf, Recycle, ArrowRight, Star, Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface CategoriesProps {
  onCategoryExplore: (category: string) => void;
  onImpactExplore: () => void;
}

export function Categories({ onCategoryExplore, onImpactExplore }: CategoriesProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const categories = [
    {
      icon: Shirt,
      name: "Fashion & Pakaian",
      description: "Pakaian bekas berkualitas untuk gaya sustainable",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
      stats: {
        items: "2,450+",
        avgPrice: "50K-200K",
        buyers: "890+"
      },
      sustainability: {
        co2Saved: "1.2 ton",
        waterSaved: "8,500L"
      },
      trending: [
        "Kemeja Formal",
        "Dress Casual", 
        "Jaket Denim"
      ],
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      features: ["Cuci Kering", "Bebas Noda", "Original Brand"]
    },
    {
      icon: BookOpen,
      name: "Buku & Edukasi",
      description: "Buku pelajaran dan novel untuk mencerdaskan bangsa",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
      stats: {
        items: "3,120+",
        avgPrice: "15K-75K",
        buyers: "1,250+"
      },
      sustainability: {
        co2Saved: "0.8 ton",
        paperSaved: "2,100 kg"
      },
      trending: [
        "Buku Sekolah",
        "Novel Terpopuler",
        "Buku Teknologi"
      ],
      color: "from-green-600 to-emerald-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200", 
      textColor: "text-green-700",
      features: ["Kondisi Baik", "Lengkap", "Harga Murah"]
    },
    {
      icon: Sofa,
      name: "Furniture & Rumah",
      description: "Perabotan rumah tangga untuk hunian nyaman",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      stats: {
        items: "1,680+",
        avgPrice: "150K-1.5M",
        buyers: "420+"
      },
      sustainability: {
        co2Saved: "3.5 ton",
        woodSaved: "850 kg"
      },
      trending: [
        "Meja Belajar",
        "Kursi Kantor",
        "Lemari Pakaian"
      ],
      color: "from-teal-600 to-green-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      textColor: "text-teal-700",
      features: ["Terawat", "Fungsional", "Siap Pakai"]
    }
  ];

  const impactStats = [
    { 
      icon: Leaf, 
      value: "5.5 ton", 
      label: "CO₂ Terhemat",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    { 
      icon: Recycle, 
      value: "12,250", 
      label: "Barang Direscue",
      color: "text-emerald-600", 
      bg: "bg-emerald-100"
    },
    { 
      icon: Users, 
      value: "2,560", 
      label: "Member Aktif",
      color: "text-teal-600",
      bg: "bg-teal-100"
    }
  ];

  return (
    <section id="categories" className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 gradient-cool rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 gradient-nature rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-green-400 rounded-full blur-2xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div 
          className="text-center mb-20"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <div 
            className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full mb-6 border border-green-200/50"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s ease-out 0.2s'
            }}
          >
            <Leaf className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-700">Sustainable Shopping Categories</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Kategori Pilihan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tiga kategori utama barang bekas berkualitas dengan dampak lingkungan terbaik untuk masa depan yang lebih hijau
          </p>
        </div>

        {/* Impact Stats Bar */}
        <div 
          className="mb-16"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.3s'
          }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-green-100">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-foreground mb-2">Dampak Positif Kategori Ini</h3>
              <p className="text-sm text-muted-foreground">Kontribusi nyata untuk lingkungan dan masyarakat</p>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
              {impactStats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'scale(1)' : 'scale(0.8)',
                    transition: `all 0.6s ease-out ${0.4 + index * 0.1}s`
                  }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <div
              key={index}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.6s ease-out ${0.5 + index * 0.15}s`
              }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden h-full hover:-translate-y-2">
                <CardContent className="p-0 relative">
                  {/* Header Image */}
                  <div className="relative overflow-hidden h-48">
                    <div className="hover:scale-110 transition-transform duration-700">
                      <ImageWithFallback
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                    
                    {/* Top Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                        <category.icon className="h-5 w-5 text-green-600" />
                      </div>
                    </div>

                    {/* Category Title */}
                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-sm drop-shadow">
                        {category.description}
                      </p>
                    </div>

                    {/* Award Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-yellow-400/90 backdrop-blur-sm rounded-full p-1.5 shadow-md">
                        <Award className="h-4 w-4 text-yellow-800" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className={`${category.bgColor} rounded-xl p-3 text-center border ${category.borderColor}`}>
                        <div className={`text-lg font-bold ${category.textColor}`}>{category.stats.items}</div>
                        <div className="text-xs text-gray-600">Produk</div>
                      </div>
                      <div className={`${category.bgColor} rounded-xl p-3 text-center border ${category.borderColor}`}>
                        <div className={`text-lg font-bold ${category.textColor}`}>{category.stats.avgPrice}</div>
                        <div className="text-xs text-gray-600">Harga</div>
                      </div>
                      <div className={`${category.bgColor} rounded-xl p-3 text-center border ${category.borderColor}`}>
                        <div className={`text-lg font-bold ${category.textColor}`}>{category.stats.buyers}</div>
                        <div className="text-xs text-gray-600">Pembeli</div>
                      </div>
                    </div>

                    {/* Sustainability Impact */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-100">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-green-800 text-sm flex items-center gap-2">
                          <Leaf className="h-4 w-4" />
                          Dampak Lingkungan
                        </h4>
                        <div className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">
                          ECO
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-700">{category.sustainability.co2Saved}</div>
                          <div className="text-xs text-green-600">CO₂ Saved</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-700">
                            {category.sustainability.waterSaved || category.sustainability.paperSaved || category.sustainability.woodSaved}
                          </div>
                          <div className="text-xs text-green-600">
                            {category.sustainability.waterSaved ? "Water Saved" : 
                             category.sustainability.paperSaved ? "Paper Saved" : "Wood Saved"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trending Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Trending Items
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.trending.map((item, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors cursor-pointer"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {category.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-green-600">
                            <Star className="h-3 w-3 fill-current" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                      <Button 
                        className={`w-full bg-gradient-to-r ${category.color} text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-0`}
                        onClick={() => onCategoryExplore(category.name)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Jelajahi Kategori
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Quality Indicator */}
                    <div className="text-center mt-4">
                      <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">4.8 Rating</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div 
          className="text-center"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.8s'
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mb-6">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Mulai Berkontribusi Hari Ini
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Bergabunglah dengan ribuan orang yang sudah merasakan manfaat berbelanja sustainable. 
                Setiap pembelian adalah langkah kecil untuk masa depan yang lebih hijau.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                  <Button className="gradient-primary text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-glow transition-all">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Mulai Belanja
                  </Button>
                </div>
                
                <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                  <Button 
                    variant="outline" 
                    className="bg-white/70 border-green-200 text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-50 transition-all"
                    onClick={onImpactExplore}
                  >
                    <Leaf className="h-4 w-4 mr-2" />
                    Pelajari Dampaknya
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}