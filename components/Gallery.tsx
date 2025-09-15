import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, MapPin, User, Eye, Heart, Filter, Search } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Gallery() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

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

  const donations = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=400&q=80",
      title: "Kemeja Formal Pria",
      category: "Pakaian",
      condition: "Sangat Baik",
      location: "Jakarta Selatan",
      donator: "Andi S.",
      time: "2 hari yang lalu",
      status: "Tersedia",
      likes: 12,
      views: 48
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      title: "Buku Pelajaran SMA",
      category: "Buku & Majalah",
      condition: "Baik",
      location: "Bandung",
      donator: "Sari M.",
      time: "1 minggu yang lalu",
      status: "Tersedia",
      likes: 8,
      views: 32
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&q=80",
      title: "Laptop Gaming",
      category: "Elektronik",
      condition: "Baik",
      location: "Surabaya",
      donator: "Budi W.",
      time: "3 hari yang lalu",
      status: "Proses",
      likes: 25,
      views: 89
    }
  ];

  const filters = ["Semua", "Pakaian", "Elektronik", "Buku & Majalah", "Furniture", "Lainnya"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-100 text-green-800 border-green-200";
      case "Proses":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Selesai":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Pakaian": "bg-blue-100 text-blue-800",
      "Elektronik": "bg-purple-100 text-purple-800",
      "Buku & Majalah": "bg-green-100 text-green-800",
      "Furniture": "bg-orange-100 text-orange-800",
      "Perlengkapan Bayi": "bg-pink-100 text-pink-800",
      "Peralatan Dapur": "bg-amber-100 text-amber-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredDonations = donations.filter(donation => {
    const matchesFilter = selectedFilter === "Semua" || donation.category === selectedFilter;
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 gradient-cool rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 gradient-warm rounded-full blur-3xl opacity-5"></div>
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
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s ease-out 0.2s'
            }}
          >
            <Eye className="h-4 w-4 text-primary mr-2" />
            <span className="font-medium text-primary">Galeri Inspiratif</span>
          </div>
          
          <h2 className="mb-6">
            Galeri Donasi
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Lihat berbagai barang yang telah didonasikan oleh para donatur yang baik hati
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
                placeholder="Cari barang donasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/70 backdrop-blur-sm border-white/30 focus:bg-white transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap hover:scale-105 active:scale-95 duration-300 ${
                    selectedFilter === filter
                      ? 'gradient-primary text-white shadow-lg'
                      : 'bg-white/70 text-muted-foreground hover:bg-white hover:text-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div 
            className="text-muted-foreground"
            style={{
              opacity: isInView ? 1 : 0,
              transition: 'opacity 0.6s ease-out 0.5s'
            }}
          >
            Menampilkan {filteredDonations.length} dari {donations.length} donasi
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredDonations.map((donation, index) => (
            <div
              key={donation.id}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.6s ease-out ${0.4 + index * 0.1}s`
              }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-soft bg-white overflow-hidden h-full">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <div className="hover:scale-105 transition-transform duration-300">
                      <ImageWithFallback
                        src={donation.image}
                        alt={donation.title}
                        className="w-full h-56 object-cover"
                      />
                    </div>
                    
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>{donation.views}</span>
                        </div>
                        <button className="flex items-center gap-1 hover:scale-110 active:scale-90 transition-transform duration-300">
                          <Heart className="h-4 w-4" />
                          <span>{donation.likes}</span>
                        </button>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className={`${getStatusColor(donation.status)} font-medium border`}>
                        {donation.status}
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(donation.category)} font-medium`}>
                        {donation.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                      {donation.title}
                    </h3>
                    
                    <div className="space-y-3 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span>Donatur: <span className="font-medium text-foreground">{donation.donator}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{donation.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{donation.time}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          Kondisi: {donation.condition}
                        </span>
                        <div className="flex items-center gap-3 mt-2 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {donation.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {donation.likes}
                          </span>
                        </div>
                      </div>
                      
                      {donation.status === "Tersedia" && (
                        <button className="text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95">
                          Lihat Detail
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div 
          className="text-center"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.8s'
          }}
        >
          <div className="hover:scale-105 active:scale-95 transition-transform duration-300 inline-block">
            <Button 
              className="gradient-primary text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-glow transition-all duration-300"
            >
              Lihat Lebih Banyak Donasi
            </Button>
          </div>
          
          <p className="text-muted-foreground mt-4">
            Atau <span className="text-primary font-medium cursor-pointer hover:underline">daftar untuk mendapat notifikasi</span> donasi terbaru
          </p>
        </div>
      </div>
    </section>
  );
}