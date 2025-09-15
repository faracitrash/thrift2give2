import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Heart, Users, TrendingUp, Award, Building2, TreePine, Droplets, Recycle, Target, CheckCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ImpactPageProps {
  onBack: () => void;
}

export function ImpactPage({ onBack }: ImpactPageProps) {
  const [isInView, setIsInView] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("environmental");
  const ref = useRef<HTMLDivElement>(null);

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

  const environmentalMetrics = [
    { 
      icon: TreePine, 
      value: "5.8 ton", 
      label: "CO₂ Terhemat",
      description: "Setara dengan 280 pohon yang ditanam",
      color: "text-green-600",
      bg: "bg-green-100",
      trend: "+23%"
    },
    { 
      icon: Droplets, 
      value: "125,000L", 
      label: "Air Dihemat",
      description: "Cukup untuk kebutuhan 50 keluarga/hari",
      color: "text-blue-600",
      bg: "bg-blue-100",
      trend: "+18%"
    },
    { 
      icon: Recycle, 
      value: "15,420", 
      label: "Barang Direscue",
      description: "Dari berakhir di TPA",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      trend: "+45%"
    },
    {
      icon: Award,
      value: "3.2 ton",
      label: "Sampah Berkurang",
      description: "Mengurangi beban TPA",
      color: "text-teal-600",
      bg: "bg-teal-100",
      trend: "+15%"
    }
  ];

  const socialMetrics = [
    {
      icon: Building2,
      value: "1,250",
      label: "Panti Asuhan Terbantu",
      description: "Di seluruh Indonesia",
      color: "text-pink-600",
      bg: "bg-pink-100",
      trend: "+28%"
    },
    {
      icon: Heart,
      value: "Rp 2.1M",
      label: "Dana Tersalurkan",
      description: "Bulan ini untuk panti asuhan",
      color: "text-red-600",
      bg: "bg-red-100",
      trend: "+35%"
    },
    {
      icon: Users,
      value: "35,890",
      label: "Anak Terbantu",
      description: "Mendapat dukungan pendidikan & kesehatan",
      color: "text-purple-600",
      bg: "bg-purple-100",
      trend: "+22%"
    },
    {
      icon: Target,
      value: "98%",
      label: "Transparansi",
      description: "Dana sampai ke tujuan",
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      trend: "Konsisten"
    }
  ];

  const impactStories = [
    {
      id: 1,
      title: "Panti Asuhan Kasih Ibu - Jakarta",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
      amount: "Rp 450,000",
      description: "Dana dari penjualan buku bekas digunakan untuk membeli alat tulis dan seragam sekolah untuk 25 anak asuh.",
      impact: "25 anak mendapat perlengkapan sekolah lengkap",
      category: "Pendidikan"
    },
    {
      id: 2,
      title: "Yayasan Harapan Bangsa - Bandung",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
      amount: "Rp 320,000",
      description: "Hasil penjualan furniture bekas membantu renovasi ruang belajar dan pembelian meja kursi baru.",
      impact: "Ruang belajar untuk 40 anak diperbaiki",
      category: "Infrastruktur"
    },
    {
      id: 3,
      title: "Panti Sosial Cahaya - Surabaya",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80",
      amount: "Rp 275,000",
      description: "Penjualan pakaian bekas berkualitas membantu biaya pengobatan dan vitamin untuk anak-anak.",
      impact: "Kesehatan 30 anak terjaga dengan baik",
      category: "Kesehatan"
    }
  ];

  const achievements = [
    {
      title: "Zero Waste Champion 2024",
      description: "Penghargaan dari Kementerian Lingkungan Hidup",
      icon: Award,
      color: "text-green-600"
    },
    {
      title: "Social Impact Award",
      description: "Dari Indonesia Sustainable Business Forum",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Digital Innovation",
      description: "Platform marketplace terbaik kategori sosial",
      icon: TrendingUp,
      color: "text-blue-600"
    }
  ];

  return (
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
          
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dampak Positif KariaKita</h1>
            <p className="text-muted-foreground">Melihat perubahan nyata yang kita ciptakan bersama</p>
          </div>
        </div>

        {/* Metric Toggle */}
        <div 
          className="flex gap-4 mb-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.2s'
          }}
        >
          <button
            onClick={() => setSelectedMetric("environmental")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedMetric === "environmental"
                ? "gradient-primary text-white shadow-lg"
                : "bg-white text-green-700 hover:bg-green-50"
            }`}
          >
            🌱 Dampak Lingkungan
          </button>
          <button
            onClick={() => setSelectedMetric("social")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedMetric === "social"
                ? "gradient-primary text-white shadow-lg"
                : "bg-white text-green-700 hover:bg-green-50"
            }`}
          >
            💝 Dampak Sosial
          </button>
        </div>

        {/* Metrics Cards */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out 0.3s'
          }}
        >
          {(selectedMetric === "environmental" ? environmentalMetrics : socialMetrics).map((metric, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-500 border-0 shadow-soft bg-white overflow-hidden hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${metric.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
                
                <div className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                  {metric.value}
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {metric.trend}
                  </span>
                </div>
                
                <div className="font-semibold text-foreground mb-2">{metric.label}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Stories */}
        <div 
          className="mb-16"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out 0.4s'
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Cerita Dampak Nyata</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Lihat bagaimana kontribusi Anda mengubah kehidupan anak-anak di panti asuhan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactStories.map((story) => (
              <Card key={story.id} className="hover:shadow-xl transition-all duration-500 border-0 shadow-soft bg-white overflow-hidden hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-green-600">
                        {story.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {story.amount}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">{story.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {story.description}
                    </p>
                    
                    <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Hasil</span>
                      </div>
                      <p className="text-sm text-green-700">{story.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div 
          className="mb-16"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out 0.5s'
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Penghargaan & Prestasi</h2>
            <p className="text-xl text-muted-foreground">
              Pengakuan atas kontribusi positif untuk lingkungan dan masyarakat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-500 border-0 shadow-soft bg-white text-center hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-6">
                    <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-green-100"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out 0.6s'
          }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Jadilah Bagian Dari Perubahan Positif
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Setiap barang yang Anda beli atau jual di KariaKita berkontribusi langsung pada lingkungan yang lebih bersih 
              dan masa depan anak-anak yang lebih cerah. Bergabunglah dengan ribuan orang yang sudah merasakan manfaatnya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-glow transition-all">
                Mulai Berkontribusi
              </Button>
              
              <Button variant="outline" className="bg-white/70 border-green-200 text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-50 transition-all">
                Download Laporan Lengkap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}