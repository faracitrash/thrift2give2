import { Card, CardContent } from "./ui/card";
import { Upload, ShoppingCart, Heart, Building2, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export function HowItWorks() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const sellerSteps = [
    {
      icon: Upload,
      title: "Upload Barang",
      description: "Foto dan deskripsikan barang bekas Anda dengan harga yang wajar. Tim kami akan memverifikasi kualitas.",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      gradientColor: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: ShoppingCart,
      title: "Barang Terjual",
      description: "Pembeli membeli barang Anda. Dana akan diproses dan dibagi sesuai kesepakatan platform.",
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      gradientColor: "from-green-500 to-emerald-500",
      delay: 0.2
    }
  ];

  const buyerSteps = [
    {
      icon: ShoppingCart,
      title: "Belanja Hemat",
      description: "Temukan barang berkualitas dengan harga terjangkau. Setiap pembelian membantu panti asuhan.",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200", 
      gradientColor: "from-purple-500 to-pink-500",
      delay: 0.4
    },
    {
      icon: Heart,
      title: "Berbagi Kebaikan",
      description: "Secara otomatis, sebagian dari harga pembelian Anda disalurkan langsung ke panti asuhan terpercaya.",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      gradientColor: "from-orange-500 to-red-500",
      delay: 0.6
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 gradient-accent rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 gradient-warm rounded-full blur-3xl opacity-10"></div>
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
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s ease-out 0.2s'
            }}
          >
            <TrendingUp className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Ekonomi Sirkular untuk Kebaikan</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Cara Kerja Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sistem win-win-win: Penjual mendapat uang, pembeli dapat barang bagus murah, panti asuhan mendapat bantuan
          </p>
        </div>

        {/* For Sellers */}
        <div className="mb-16">
          <div 
            className="text-center mb-12"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.3s'
            }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">Untuk Penjual</h3>
            <p className="text-muted-foreground">Jadikan barang yang tidak terpakai menjadi sumber kebaikan</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {sellerSteps.map((step, index) => (
              <div
                key={index}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.6s ease-out ${step.delay}s`
                }}
              >
                <Card className="relative group hover:shadow-xl transition-all duration-500 border-0 shadow-soft bg-white/90 backdrop-blur-sm h-full">
                  <CardContent className="p-8 text-center relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradientColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div 
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-300"
                    >
                      <div className={`bg-gradient-to-br ${step.gradientColor} text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg`}>
                        {index + 1}
                      </div>
                    </div>

                    <div className="mt-8 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${step.bgColor} border-2 ${step.borderColor} mx-auto mb-6`}>
                        <step.icon className={`h-10 w-10 ${step.iconColor}`} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {index < sellerSteps.length - 1 && (
                      <div 
                        className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                        style={{
                          animation: 'arrowPulse 2s ease-in-out infinite'
                        }}
                      >
                        <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* For Buyers */}
        <div className="mb-16">
          <div 
            className="text-center mb-12"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.5s'
            }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">Untuk Pembeli</h3>
            <p className="text-muted-foreground">Berbelanja hemat sambil berbagi kebaikan</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {buyerSteps.map((step, index) => (
              <div
                key={index}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.6s ease-out ${step.delay}s`
                }}
              >
                <Card className="relative group hover:shadow-xl transition-all duration-500 border-0 shadow-soft bg-white/90 backdrop-blur-sm h-full">
                  <CardContent className="p-8 text-center relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradientColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div 
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-300"
                    >
                      <div className={`bg-gradient-to-br ${step.gradientColor} text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg`}>
                        {index + 1}
                      </div>
                    </div>

                    <div className="mt-8 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${step.bgColor} border-2 ${step.borderColor} mx-auto mb-6`}>
                        <step.icon className={`h-10 w-10 ${step.iconColor}`} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {index < buyerSteps.length - 1 && (
                      <div 
                        className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                        style={{
                          animation: 'arrowPulse 2s ease-in-out infinite'
                        }}
                      >
                        <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Info Card */}
        <div 
          className="max-w-5xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out 0.8s'
          }}
        >
          <Card className="gradient-primary text-white border-0 shadow-xl overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">Transparansi & Dampak Nyata</h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      Setiap transaksi berdampak langsung. 20% dari keuntungan platform disalurkan ke panti asuhan pilihan. 
                      Laporan transparansi tersedia setiap bulan untuk memastikan akuntabilitas.
                    </p>
                    
                    <div className="flex gap-4">
                      <div className="bg-white/10 rounded-xl p-4 flex-1 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold">20%</div>
                        <div className="text-sm text-white/80">Untuk Panti</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 flex-1 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold">70%</div>
                        <div className="text-sm text-white/80">Untuk Penjual</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 flex-1 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold">10%</div>
                        <div className="text-sm text-white/80">Operasional</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-3xl mb-4 backdrop-blur-sm">
                      <Heart className="h-12 w-12 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-2">850+</div>
                    <div className="text-white/80">Panti Asuhan Terbantu</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes arrowPulse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </section>
  );
}