import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import Welcome from "@/pages/welcome";
import Contact from "@/pages/contact";
import Assessment from "@/pages/assessment";
import Results from "@/pages/results";
import NotFound from "@/pages/not-found";

import AdminDashboard from "@/pages/admin-dashboard";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Welcome} />
        <Route path="/contact" component={Contact} />
        <Route path="/assessment" component={Assessment} />
        <Route path="/results" component={Results} />
        <Route path="/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
