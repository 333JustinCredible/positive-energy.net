import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number | null;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);

  useEffect(() => {
    if (initialIndex !== null) {
      setActiveIndex(initialIndex);
    }
  }, [initialIndex]);

  useEffect(() => {
    if (initialIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && images.length > 1) {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      } else if (event.key === 'ArrowRight' && images.length > 1) {
        setActiveIndex((current) => (current + 1) % images.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [images.length, initialIndex, onClose]);

  if (initialIndex === null || images.length === 0 || typeof document === 'undefined') {
    return null;
  }

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const image = images[safeIndex];
  const hasNavigation = images.length > 1;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;

    if (!start || !hasNavigation) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX > 0) {
      showPrevious();
    } else {
      showNext();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative flex max-h-full w-full max-w-7xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 z-10 flex min-h-14 min-w-14 items-center justify-center border border-white/40 bg-black/70 text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close image viewer"
        >
          <X className="h-8 w-8" strokeWidth={2.5} />
        </button>

        {hasNavigation && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-0 top-1/2 z-10 hidden min-h-14 min-w-14 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/70 text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-primary md:flex"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-0 top-1/2 z-10 hidden min-h-14 min-w-14 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/70 text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-primary md:flex"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </>
        )}

        <figure className="flex max-h-[calc(100vh-2rem)] max-w-full flex-col items-center sm:max-h-[calc(100vh-4rem)]">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[calc(100vh-8rem)] max-w-full object-contain sm:max-h-[calc(100vh-10rem)]"
            draggable={false}
          />
          {(image.caption || hasNavigation) && (
            <figcaption className="mt-3 max-w-3xl text-center text-sm text-white/90">
              {image.caption && <span>{image.caption}</span>}
              {hasNavigation && (
                <span className={image.caption ? 'ml-3 text-white/60' : 'text-white/60'}>
                  {safeIndex + 1} / {images.length}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      </div>
    </div>,
    document.body,
  );
}