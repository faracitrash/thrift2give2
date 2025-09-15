import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Users, ShoppingBag, ArrowRight, Star, Zap, TrendingUp, Home } from "lucide-react";

export function HeroSection() {
  const stats = [
    { icon: ShoppingBag, value: "12,456", label: "Barang Terjual", color: "text-green-500" },
    { icon: Heart, value: "850+", label: "Panti Terbantu", color: "text-pink-500" },
    { icon: Users, value: "25,890", label: "Member Aktif", color: "text-blue-500" },
    { icon: TrendingUp, value: "Rp 2.1M", label: "Dana Tersalur", color: "text-purple-500" }
  ];

  const floatingElements = [
    { icon: Heart, delay: 0, duration: 6 },
    { icon: Star, delay: 1, duration: 8 },
    { icon: Home, delay: 2, duration: 7 }
  ];

  const impactBadges = [
    { label: "100% Transparan", color: "bg-green-100 text-green-700" },
    { label: "Barang Berkualitas", color: "bg-blue-100 text-blue-700" },
    { label: "Harga Terjangkau", color: "bg-purple-100 text-purple-700" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with gradients */}
      <div className="absolute inset-0 gradient-cool opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 gradient-secondary rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      {/* Floating elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className="absolute opacity-10"
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + index * 15}%`,
            animation: `float${index} ${element.duration}s ease-in-out infinite ${element.delay}s`
          }}
        >
          <element.icon className="h-8 w-8 text-primary" />
        </div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div 
            className="space-y-8"
            style={{
              opacity: 0,
              transform: 'translateX(-50px)',
              animation: 'slideInLeft 0.8s ease-out forwards'
            }}
          >
            <div 
              className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/20 shadow-lg"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.6s ease-out 0.2s forwards'
              }}
            >
              <Zap className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-bold text-gray-700">Marketplace #1 untuk Berbagi Kebaikan</span>
            </div>

            <h1 
              className="text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'fadeInUp 0.8s ease-out 0.3s forwards'
              }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Jual Barang Bekas
              </span>
              <br />
              Bantu Panti Asuhan
            </h1>

            <p 
              className="text-xl text-foreground/70 leading-relaxed max-w-xl"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.6s ease-out 0.4s forwards'
              }}
            >
              Marketplace barang bekas berkualitas dimana setiap pembelian membantu panti asuhan. 
              Jual barang yang tidak terpakai, beli dengan harga terjangkau, berbagi kebaikan bersama.
            </p>

            {/* Impact Badges */}
            <div 
              className="flex flex-wrap gap-3"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.6s ease-out 0.45s forwards'
              }}
            >
              {impactBadges.map((badge, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color} backdrop-blur-sm`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
            
            {/* Stats */}
            <div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.6s ease-out 0.5s forwards'
              }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center gap-2 bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-soft hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  style={{
                    opacity: 0,
                    transform: 'scale(0.8)',
                    animation: `scaleIn 0.6s ease-out ${0.6 + index * 0.1}s forwards`
                  }}
                >
                  <div className={`p-2 rounded-full bg-gradient-to-r from-white to-gray-50 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.6s ease-out 0.7s forwards'
              }}
            >
              <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                <Button 
                  size="lg" 
                  className="gradient-primary text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 group"
                >
                  Mulai Belanja
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/70 backdrop-blur-sm border-white/30 hover:bg-white/90 font-semibold px-8 py-4 rounded-full shadow-soft transition-all duration-300"
                >
                  Jual Barang Saya
                </Button>
              </div>
            </div>

            {/* Trust indicators */}
            <div 
              className="flex items-center gap-4 text-sm text-muted-foreground pt-4"
              style={{
                opacity: 0,
                animation: 'fadeIn 0.6s ease-out 0.8s forwards'
              }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="font-medium">4.9/5 dari 12,000+ ulasan</span>
            </div>
          </div>

          {/* Image & Impact Cards */}
          <div 
            className="relative"
            style={{
              opacity: 0,
              transform: 'translateX(50px)',
              animation: 'slideInRight 0.8s ease-out 0.3s forwards'
            }}
          >
            <div className="relative hover:scale-102 transition-transform duration-500">
              {/* Glowing background */}
              <div className="absolute inset-0 gradient-primary rounded-3xl blur-2xl opacity-20 scale-110"></div>
              
              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                  alt="Marketplace barang bekas ramah lingkungan KariaKita"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Setiap Pembelian = Berbagi Kebaikan</h3>
                  <p className="text-sm opacity-90">Dana langsung disalurkan ke panti asuhan terpercaya</p>
                </div>
              </div>

              {/* Floating impact cards */}
              <div
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl backdrop-blur-sm border border-white/20"
                style={{
                  animation: 'floatUp 4s ease-in-out infinite'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">Rp 125,000</div>
                    <div className="text-xs text-muted-foreground">Dana Hari Ini</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl backdrop-blur-sm border border-white/20"
                style={{
                  animation: 'floatDown 5s ease-in-out infinite'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-100 rounded-xl">
                    <Home className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-pink-600">12</div>
                    <div className="text-xs text-muted-foreground">Panti Terbantu</div>
                  </div>
                </div>
              </div>

              {/* Product showcase mini card */}
              <div
                className="absolute top-1/2 -right-12 bg-white rounded-2xl p-3 shadow-xl backdrop-blur-sm border border-white/20 transform -translate-y-1/2"
                style={{
                  animation: 'pulse 3s ease-in-out infinite'
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="text-sm font-semibold">Buku Novel</div>
                    <div className="text-xs text-green-600 font-bold">Rp 25,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes floatDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        @keyframes pulse {
          0%, 100% { transform: translateY(-50%) scale(1); }
          50% { transform: translateY(-50%) scale(1.05); }
        }

        @keyframes float0 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-20px) rotate(5deg) scale(1.1); }
          66% { transform: translateY(20px) rotate(-5deg) scale(1); }
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-15px) rotate(-3deg) scale(1.05); }
          75% { transform: translateY(15px) rotate(3deg) scale(0.95); }
        }

        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          40% { transform: translateY(-10px) rotate(2deg) scale(1.1); }
          80% { transform: translateY(10px) rotate(-2deg) scale(1); }
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}