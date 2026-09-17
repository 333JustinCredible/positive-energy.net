import { useEffect, useRef } from 'react';

const TURNSTILE_SITE_KEY = '0x4AAAAAAE6m8ofr4_lIbUGd';
const TURNSTILE_SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'error-callback': () => void;
      'expired-callback': () => void;
      theme: 'auto';
    },
  ): string;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_URL}"]`,
    );
    const script = existingScript ?? document.createElement('script');

    const handleLoad = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('Turnstile failed to initialize.'));
    };
    const handleError = () => reject(new Error('Turnstile failed to load.'));

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existingScript) {
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }).catch((error) => {
    turnstileScriptPromise = null;
    throw error;
  });

  return turnstileScriptPromise;
}

interface TurnstileWidgetProps {
  onTokenChange: (token: string | null) => void;
  resetNonce: number;
}

export function TurnstileWidget({
  onTokenChange,
  resetNonce,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | null = null;
    let cancelled = false;
    onTokenChange(null);

    void loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetId = turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => onTokenChange(token),
          'error-callback': () => onTokenChange(null),
          'expired-callback': () => onTokenChange(null),
          theme: 'auto',
        });
      })
      .catch(() => onTokenChange(null));

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onTokenChange, resetNonce]);

  return (
    <div
      ref={containerRef}
      className="min-h-[65px]"
      data-testid="security-turnstile"
    />
  );
}