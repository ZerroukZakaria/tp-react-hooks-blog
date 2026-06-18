import { useState, useEffect, useRef } from 'react';

/**
 * Hook personnalisé pour détecter quand un élément devient visible dans le viewport
 */
function useIntersectionObserver({
  enabled = true,
  threshold = 0.1,
  rootMargin = '0px'
} = {}) {

  const [isIntersecting, setIsIntersecting] =
    useState(false);

  const targetRef = useRef(null);

  useEffect(() => {

    if (!enabled) {
      return;
    }

    const observer =
      new IntersectionObserver(

        ([entry]) => {
          setIsIntersecting(
            entry.isIntersecting
          );
        },

        {
          threshold,
          rootMargin
        }

      );

    const current =
      targetRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {

      if (current) {
        observer.unobserve(current);
      }

    };

  }, [
    enabled,
    threshold,
    rootMargin
  ]);

  return [
    targetRef,
    isIntersecting
  ];
}

export default useIntersectionObserver;