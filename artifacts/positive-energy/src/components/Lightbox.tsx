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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);

  useEffect(() => {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      triggerRef.current = activeElement;
    }

    return () => {
      if (triggerRef.current && document.contains(triggerRef.current)) {
        triggerRef.current.focus();
      }
    };
  }, []);

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
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft' && images.length > 1) {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      } else if (event.key === 'ArrowRight' && images.length > 1) {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % images.length);
      } else if (event.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusableElements = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const currentElement = document.activeElement;

        if (event.shiftKey && (currentElement === firstElement || !dialog.contains(currentElement))) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && (currentElement === lastElement || !dialog.contains(currentElement))) {
          event.preventDefault();
          firstElement.focus();
        }
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
        ref={dialogRef}
        className="relative flex max-h-full w-full max-w-7xl flex-col items-center"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
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

        <figure
          className="flex max-h-[calc(100vh-2rem)] max-w-full flex-col items-center sm:max-h-[calc(100vh-4rem)]"
          onClick={(event) => event.stopPropagation()}
        >
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