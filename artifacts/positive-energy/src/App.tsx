import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Projects from '@/pages/Projects';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import { ComingSoon } from '@/pages/ComingSoon';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/projects" component={Projects} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      
      {/* Stub Routes */}
      <Route path="/markets">
        <ComingSoon title="Markets" />
      </Route>
      <Route path="/case-studies">
        <ComingSoon title="Case Studies" />
      </Route>
      <Route path="/faq">
        <ComingSoon title="FAQ" />
      </Route>
      <Route path="/financing">
        <ComingSoon title="Financing" />
      </Route>
      <Route path="/resources">
        <ComingSoon title="Resources" />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
