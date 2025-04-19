/*
	Installed from https://reactbits.dev/ts/tailwind/
  Optimized for performance
*/

import { useEffect, useRef, useState, useCallback } from "react";

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  reduceMotion: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
    reduceMotion: boolean = false
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
    this.reduceMotion = reduceMotion;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      // Adjust animation speed based on reduceMotion preference
      this.size += this.reduceMotion ? this.sizeStep * 2 : this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      // Faster disappear for performance
      this.size -= this.reduceMotion ? 0.2 : 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value: any, reducedMotion: any) {
  const min = 0;
  const max = 100;
  const throttle = reducedMotion ? 0.0005 : 0.001; // Reduce animation speed if reducedMotion
  const parsed = parseInt(value, 10);

  if (parsed <= min || reducedMotion) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

// Debounce function to limit resource-intensive operations
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 *  You can change/expand these as you like.
 */
const VARIANTS = {
  default: {
    activeColor: null,
    gap: 5,
    speed: 35,
    colors: "#f8fafc,#f1f5f9,#cbd5e1",
    noFocus: false,
  },
  blue: {
    activeColor: "#e0f2fe",
    gap: 10,
    speed: 25,
    colors: "#e0f2fe,#7dd3fc,#0ea5e9",
    noFocus: false,
  },
  yellow: {
    activeColor: "#fef08a",
    gap: 3,
    speed: 20,
    colors: "#fef08a,#fde047,#eab308",
    noFocus: false,
  },
  pink: {
    activeColor: "#fecdd3",
    gap: 6,
    speed: 80,
    colors: "#fecdd3,#fda4af,#e11d48",
    noFocus: true,
  },
};

interface PixelCardProps {
  variant?: "default" | "blue" | "yellow" | "pink";
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface VariantConfig {
  activeColor: string | null;
  gap: number;
  speed: number;
  colors: string;
  noFocus: boolean;
}

export default function PixelCard({
  variant = "default",
  gap,
  speed,
  colors,
  noFocus,
  className = "",
  children,
}: PixelCardProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef(performance.now());
  const isInitializedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ).current;

  const variantCfg: VariantConfig = VARIANTS[variant] || VARIANTS.default;
  const finalGap = gap ?? variantCfg.gap;
  const finalSpeed = speed ?? variantCfg.speed;
  const finalColors = colors ?? variantCfg.colors;
  const finalNoFocus = noFocus ?? variantCfg.noFocus;

  // Memoize initialization to prevent unnecessary re-renders
  const initPixels = useCallback(
    debounce(() => {
      if (!containerRef.current || !canvasRef.current || !isVisible) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Use integer values for better performance
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      const ctx = canvasRef.current.getContext("2d", { alpha: true });
      
      if (!ctx) return;
      
      // Only set canvas size if it's different to avoid reflow
      if (
        canvasRef.current.width !== width || 
        canvasRef.current.height !== height
      ) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
      }

      // Optimize pixel creation by limiting total number
      const colorsArray = finalColors.split(",");
      const pixelGap = parseInt(finalGap.toString(), 10);
      const effectiveGap = Math.max(pixelGap, reducedMotion ? 10 : 5);
      const maxPixels = 5000; // Limit total pixels for performance
      
      const pxs = [];
      let pixelCount = 0;
      
      for (let x = 0; x < width && pixelCount < maxPixels; x += effectiveGap) {
        for (let y = 0; y < height && pixelCount < maxPixels; y += effectiveGap) {
          const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

          const dx = x - width / 2;
          const dy = y - height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const delay = reducedMotion ? 0 : distance;
          
          pxs.push(
            new Pixel(
              canvasRef.current,
              ctx,
              x,
              y,
              color,
              getEffectiveSpeed(finalSpeed, reducedMotion),
              delay,
              reducedMotion
            ),
          );
          pixelCount++;
        }
      }
      
      pixelsRef.current = pxs;
      isInitializedRef.current = true;
    }, 50), // Debounce for 50ms to prevent multiple calls
    [finalColors, finalGap, finalSpeed, reducedMotion, isVisible]
  );

  const doAnimate = useCallback((fnName: keyof Pixel) => {
    if (!canvasRef.current || !isVisible) return;
    
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    
    // Adjust FPS based on reduced motion preference
    const targetFPS = reducedMotion ? 30 : 60;
    const timeInterval = 1000 / targetFPS;

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Use clearRect only for the needed areas to improve performance
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    let activePixels = 0;
    const maxActivePixels = reducedMotion ? 500 : 2000;
    
    for (let i = 0; i < pixelsRef.current.length && activePixels < maxActivePixels; i++) {
      const pixel = pixelsRef.current[i];
      if (!pixel.isIdle || fnName === "appear") {
        // @ts-ignore
        pixel[fnName]();
        activePixels++;
        if (!pixel.isIdle) {
          allIdle = false;
        }
      }
    }
    
    if (allIdle) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [reducedMotion, isVisible]);

  const handleAnimation = useCallback((name: keyof Pixel) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (!isInitializedRef.current) {
      initPixels();
    }
    animationRef.current = requestAnimationFrame(() => doAnimate(name));
  }, [doAnimate, initPixels]);

  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
    handleAnimation("appear");
  }, [handleAnimation]);
  
  const onMouseLeave = useCallback(() => {
    handleAnimation("disappear");
  }, [handleAnimation]);
  
  const onFocus = useCallback<React.FocusEventHandler<HTMLDivElement>>((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsVisible(true);
    handleAnimation("appear");
  }, [handleAnimation]);
  
  const onBlur = useCallback<React.FocusEventHandler<HTMLDivElement>>((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    handleAnimation("disappear");
  }, [handleAnimation]);

  // Set up intersection observer to only animate when visible
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const isIntersecting = entry.isIntersecting;
          setIsVisible(isIntersecting);
          
          if (isIntersecting && !isInitializedRef.current) {
            initPixels();
            handleAnimation("appear");
          } else if (!isIntersecting && animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [handleAnimation, initPixels]);

  // Handle resize efficiently
  useEffect(() => {
    // Reuse the debounced initPixels for resize handling
    const observer = new ResizeObserver(initPixels);
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initPixels]);

  return (
    <div
      ref={containerRef}
      className={`h-[400px] w-[300px] relative overflow-hidden grid place-items-center aspect-[4/5] border border-[#27272a] rounded-[25px] isolate transition-colors duration-200 ease-[cubic-bezier(0.5,1,0.89,1)] select-none ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas className="w-full h-full block" ref={canvasRef} />
      {children}
    </div>
  );
}
