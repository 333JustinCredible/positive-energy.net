import { useLocation } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="font-heading text-8xl font-bold text-muted mb-4">404</div>
          <h1 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-wide">
            Circuit Broken
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => setLocation('/')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-lg font-bold"
          >
            RETURN TO BASE
          </Button>
        </div>
      </div>
    </Layout>
  );
}
