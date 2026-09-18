import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Redirect, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Justin from '@/pages/Justin';
import NotFound from '@/pages/not-found';
import DevResponsivePreview from '@/pages/DevResponsivePreview';

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      {import.meta.env.DEV && <Route path="/__responsive-preview" component={DevResponsivePreview} />}
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/projects/hurricane-helene">
        <Redirect to="/projects/hurricane-helene-response" replace />
      </Route>
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/projects" component={Projects} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/justin" component={Justin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
