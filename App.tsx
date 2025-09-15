import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { Categories } from "./components/Categories";
import { SellForm } from "./components/SellForm";
import { Marketplace } from "./components/Marketplace";
import { Footer } from "./components/Footer";
import { CategoryDetail } from "./components/CategoryDetail";
import { ImpactPage } from "./components/ImpactPage";
import { SellPage } from "./components/SellPage";
import { CartDrawer } from "./components/CartDrawer";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import { AdminProvider } from "./components/AdminContext";
import { AdminDashboard } from "./components/AdminDashboard";
import { CheckoutModal } from "./components/CheckoutModal";
import { useState, useEffect } from "react";

type Page = 'home' | 'category' | 'impact' | 'sell' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showMoreProducts, setShowMoreProducts] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);

  // Add some demo notifications periodically for better UX demo
  useEffect(() => {
    const demoNotifications = [
      {
        type: 'purchase' as const,
        title: 'Pembelian Berhasil! 🎉',
        message: 'Pesanan Anda sedang diproses. Terima kasih telah berkontribusi untuk lingkungan!'
      },
      {
        type: 'donation' as const,
        title: 'Dana Tersalurkan 💝',
        message: 'Rp 15,000 dari pembelian Anda telah disalurkan ke Panti Asuhan Harapan Bangsa'
      },
      {
        type: 'system' as const,
        title: 'Produk Baru Tersedia! 🆕',
        message: 'Check koleksi buku programming terbaru dengan harga terjangkau'
      }
    ];

    // Simulate receiving notifications every 30 seconds for demo
    let notificationIndex = 0;
    const interval = setInterval(() => {
      if (notificationIndex < demoNotifications.length) {
        // This will be handled by AuthContext when user is logged in
        notificationIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCategoryExplore = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('category');
  };

  const handleImpactExplore = () => {
    setCurrentPage('impact');
  };

  const handleSellPage = () => {
    setCurrentPage('sell');
  };

  const handleShowMoreProducts = () => {
    setShowMoreProducts(true);
    // Scroll to marketplace section
    const marketplaceSection = document.getElementById('marketplace');
    if (marketplaceSection) {
      marketplaceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCategory('');
    setShowMoreProducts(false);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartCheckout = (items: any[]) => {
    setCheckoutItems(items);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutItems([]);
  };

  // Footer actions
  const handleStartShopping = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const marketplace = document.getElementById('marketplace');
        marketplace?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const marketplace = document.getElementById('marketplace');
      marketplace?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSellProducts = () => {
    if (currentPage !== 'home') {
      setCurrentPage('sell');
    } else {
      const sellForm = document.getElementById('sell-form');
      if (sellForm) {
        sellForm.scrollIntoView({ behavior: 'smooth' });
      } else {
        setCurrentPage('sell');
      }
    }
  };

  const handleDonationClick = () => {
    setCurrentPage('impact');
  };

  const handleAdminAccess = () => {
    setCurrentPage('admin');
  };

  return (
    <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
          {/* Admin Page */}
          {currentPage === 'admin' && (
            <AdminDashboard onBack={handleBackToHome} />
          )}

          {/* Sell Page */}
          {currentPage === 'sell' && (
            <>
              <Header onCartOpen={handleCartOpen} onAdminAccess={handleAdminAccess} />
              <SellPage onBack={handleBackToHome} />
              <Footer 
                onStartShopping={handleStartShopping}
                onSellProducts={handleSellProducts}
                onDonationClick={handleDonationClick}
              />
            </>
          )}

          {/* Category Detail Page */}
          {currentPage === 'category' && selectedCategory && (
            <>
              <Header onCartOpen={handleCartOpen} onAdminAccess={handleAdminAccess} />
              <CategoryDetail 
                category={selectedCategory} 
                onBack={handleBackToHome}
              />
              <Footer 
                onStartShopping={handleStartShopping}
                onSellProducts={handleSellProducts}
                onDonationClick={handleDonationClick}
              />
            </>
          )}

          {/* Impact Page */}
          {currentPage === 'impact' && (
            <>
              <Header onCartOpen={handleCartOpen} onAdminAccess={handleAdminAccess} />
              <ImpactPage onBack={handleBackToHome} />
              <Footer 
                onStartShopping={handleStartShopping}
                onSellProducts={handleSellProducts}
                onDonationClick={handleDonationClick}
              />
            </>
          )}

          {/* Home Page */}
          {currentPage === 'home' && (
            <>
              <Header onCartOpen={handleCartOpen} onAdminAccess={handleAdminAccess} />
              <HeroSection />
              <HowItWorks />
              <Categories 
                onCategoryExplore={handleCategoryExplore} 
                onImpactExplore={handleImpactExplore} 
              />
              <Marketplace 
                showMoreProducts={showMoreProducts} 
                onShowMoreProducts={handleShowMoreProducts}
              />
              <SellForm onSellClick={handleSellPage} />
              <Footer 
                onStartShopping={handleStartShopping}
                onSellProducts={handleSellProducts}
                onDonationClick={handleDonationClick}
              />
            </>
          )}

          {/* Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={handleCartCheckout}
          />

          {/* Multi-item Checkout Modal */}
          {checkoutItems.length > 0 && (
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={handleCloseCheckout}
              product={checkoutItems[0]} // For now, checkout first item. Can be enhanced for multi-item
            />
          )}

          {/* Welcome toast for better UX - can be enhanced later */}
          <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 animate-pulse">
              <p className="text-sm font-medium">🌱 Selamat datang di KariaKita!</p>
            </div>
          </div>
        </div>
      </CartProvider>
    </AdminProvider>
    </AuthProvider>
  );
}