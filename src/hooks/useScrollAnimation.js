import { useEffect } from 'react';

const useScrollAnimation = (ref, animationClass) => {
  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          element.classList.add(animationClass);
        } else {
          element.classList.remove(animationClass);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, animationClass]);
};

export default useScrollAnimation;