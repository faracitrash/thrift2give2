import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Send, Award, Shield, Clock, ShoppingBag, Package } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import kariaKitaLogo from '@/assets/logo.png';

interface FooterProps {
  onStartShopping?: () => void;
  onSellProducts?: () => void;
  onDonationClick?: () => void;
}

export function Footer({ onStartShopping, onSellProducts, onDonationClick }: FooterProps) {
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

  const achievements = [
    { icon: Award, value: "5,000+", label: "Pengguna Aktif" },
    { icon: Shield, value: "99.9%", label: "Keamanan Data" },
    { icon: Clock, value: "24/7", label: "Dukungan" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", color: "hover:text-sky-500" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToMarketplace = () => {
    const marketplace = document.getElementById('marketplace');
    if (marketplace) {
      marketplace.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSellForm = () => {
    const sellForm = document.getElementById('sell-form');
    if (sellForm) {
      sellForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSellProducts?.();
    }
  };

  const handleImpactClick = () => {
    onDonationClick?.();
  };

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-primary"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10" ref={ref}>
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div 
            className="lg:col-span-2 space-y-6"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            {/* KariaKita Logo and Branding */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  handleImpactClick();
                  handleScrollToTop();
                }}
                className="relative hover:scale-110 transition-transform duration-300 cursor-pointer group"
              >
                <div className="absolute inset-0 bg-white rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src={kariaKitaLogo} 
                  alt="KariaKita" 
                  className="h-12 w-auto object-contain relative z-10 filter brightness-0 invert"
                />
              </button>
            </div>
            
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Platform marketplace berkelanjutan yang menghubungkan pembeli dan penjual barang bekas berkualitas. 
              Mari bersama-sama menciptakan ekonomi sirkular untuk kebaikan bersama.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  onStartShopping?.();
                  handleScrollToMarketplace();
                }}
                className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Mulai Belanja
              </Button>
              
              <Button
                onClick={() => {
                  onSellProducts?.();
                  handleScrollToSellForm();
                }}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Package className="h-4 w-4 mr-2" />
                Jual Barang Saya
              </Button>
            </div>

            {/* Newsletter Signup */}
            <div 
              className="space-y-4"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.3s'
              }}
            >
              <h4 className="text-white font-semibold">Dapatkan Update Terbaru</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Masukkan email Anda"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                />
                <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                  <Button className="bg-white text-primary hover:bg-white/90 px-4">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`p-3 bg-white/10 rounded-full text-white/80 ${social.color} transition-all hover:bg-white/20 hover:scale-110 active:scale-90 duration-300`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'scale(1)' : 'scale(0)',
                    transition: `all 0.6s ease-out ${0.5 + index * 0.1}s`
                  }}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.2s'
            }}
          >
            <h4 className="text-white font-semibold text-lg mb-6">Tautan Cepat</h4>
            <ul className="space-y-4">
              {[
                { href: "#home", label: "Beranda", onClick: handleScrollToTop },
                { href: "#how-it-works", label: "Cara Kerja", onClick: () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) },
                { href: "#categories", label: "Kategori", onClick: () => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }) },
                { href: "#marketplace", label: "Marketplace", onClick: handleScrollToMarketplace },
                { href: "#", label: "FAQ", onClick: () => {} }
              ].map((link, index) => (
                <li
                  key={link.href}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s ease-out ${0.4 + index * 0.1}s`
                  }}
                >
                  <button 
                    onClick={link.onClick}
                    className="text-white/80 hover:text-white transition-colors hover:underline hover:translate-x-1 duration-300 inline-block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.4s'
            }}
          >
            <h4 className="text-white font-semibold text-lg mb-6">Dukungan</h4>
            <ul className="space-y-4 mb-8">
              {[
                "Panduan Jual-Beli",
                "Syarat & Ketentuan", 
                "Kebijakan Privasi",
                "Hubungi Kami"
              ].map((item, index) => (
                <li
                  key={item}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s ease-out ${0.6 + index * 0.1}s`
                  }}
                >
                  <button className="text-white/80 hover:text-white transition-colors hover:underline hover:translate-x-1 duration-300 inline-block text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Mail, text: "thrift2give@gmail.com" },
                { icon: Phone, text: "+62 21 1234 5678" },
                { icon: MapPin, text: "Jl. A.P. Pettarani \nSulawesi Selatan 12345" }
              ].map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 text-sm"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s ease-out ${0.8 + index * 0.1}s`
                  }}
                >
                  <contact.icon className="h-4 w-4 text-white/60 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 whitespace-pre-line">{contact.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div 
          className="border-t border-white/20 pt-12 mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.6s'
          }}
        >
          <div className="grid grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'scale(1)' : 'scale(0.8)',
                  transition: `all 0.6s ease-out ${0.8 + index * 0.1}s`
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-3">
                  <achievement.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{achievement.value}</div>
                <div className="text-sm text-white/80">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t border-white/20 pt-8"
          style={{
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.6s ease-out 1s'
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2025 Thrift2Give. Semua hak dilindungi.
            </p>
            
            <button
              onClick={() => {
                handleImpactClick();
                onDonationClick?.();
              }}
              className="flex items-center space-x-2 text-sm text-white/60 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <span>Made with</span>
              <div className="animate-heartbeat group-hover:scale-125 transition-transform duration-300">
                <Heart className="h-4 w-4 text-red-400 fill-current" />
              </div>
              <span>for Indonesia</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}