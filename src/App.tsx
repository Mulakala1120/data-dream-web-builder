
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ROIAnalysis from "./pages/ROIAnalysis";
import NotFound from "./pages/NotFound";
import ServiceDetails from "./pages/ServiceDetails";
import BlogPost from "./pages/BlogPost";
import ResourcePage from "./pages/ResourcePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roi-analysis" element={<ROIAnalysis />} />
          <Route path="/service-details/:serviceId" element={<ServiceDetails />} />
          
          {/* Blog and Resource Routes */}
          <Route path="/blog" element={<ResourcePage type="blog" />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/resources/:resourceType" element={<ResourcePage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
