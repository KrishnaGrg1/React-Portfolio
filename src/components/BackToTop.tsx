
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      className={cn(
        "fixed right-4 bottom-4 bg-teal text-navy hover:bg-teal-dark z-50 rounded-full h-10 w-10 p-0",
        "transition-all duration-300 shadow-md hover:shadow-lg",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      )}
      onClick={scrollToTop}
      size="icon"
      aria-label="Back to top"
    >
      <ChevronUp />
    </Button>
  );
}
