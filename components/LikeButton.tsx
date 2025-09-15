import { useState } from 'react';
import { Button } from './ui/button';
import { useAuth } from './AuthContext';
import { Heart } from 'lucide-react';
import { LoginModal } from './LoginModal';

interface LikeButtonProps {
  productId: string;
  productTitle: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'ghost' | 'outline' | 'default';
  showCount?: boolean;
  initialLikes?: number;
}

export function LikeButton({ 
  productId, 
  productTitle, 
  className = '', 
  size = 'default',
  variant = 'ghost',
  showCount = false,
  initialLikes = 0
}: LikeButtonProps) {
  const { isAuthenticated, isLiked, toggleLike } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  
  const liked = isLiked(productId);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    // Animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // Update likes count
    if (liked) {
      setLikesCount(prev => Math.max(0, prev - 1));
    } else {
      setLikesCount(prev => prev + 1);
    }

    // Toggle like in auth context
    toggleLike(productId, productTitle);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleLikeClick}
        className={`relative transition-all duration-300 hover:scale-110 active:scale-90 ${
          liked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'
        } ${className}`}
      >
        <div className="relative">
          <Heart 
            className={`h-4 w-4 transition-all duration-300 ${
              liked ? 'fill-current scale-110' : ''
            } ${isAnimating ? 'animate-bounce' : ''}`}
          />
          
          {/* Like animation particles */}
          {isAnimating && liked && (
            <>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-red-400 rounded-full animate-ping" 
                     style={{ animationDelay: '0ms', transform: 'translate(-50%, -100%)' }} />
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" 
                     style={{ animationDelay: '100ms', transform: 'translate(-50%, -120%)' }} />
                <div className="absolute top-0 right-1/4 w-1 h-1 bg-red-300 rounded-full animate-ping" 
                     style={{ animationDelay: '200ms', transform: 'translate(50%, -120%)' }} />
              </div>
            </>
          )}
        </div>
        
        {showCount && likesCount > 0 && (
          <span className="ml-1 font-medium">
            {likesCount}
          </span>
        )}
      </Button>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}