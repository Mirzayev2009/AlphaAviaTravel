import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TourDetail from "./pages/ToursDetail";
import Services from "./pages/Services";
import VisaQuestion from "./pages/VisaQuestion";
import VisaAnswer from "./pages/VisaAnswer";
import ToursDetail from "./pages/ToursDetail";

 

// Code-split large pages for better performance
const Tours = lazy(() => import("./pages/Tours"));
const Destinations = lazy(() => import("./pages/Destinations"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="tours"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Tours />
                </Suspense>
              }
            />
            <Route
              path="destinations"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Destinations />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<PageLoader />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="gallery"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Gallery />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
          <Route
          path="/tours/:tourid"
          element={
             <Suspense fallback={<PageLoader />}>
                  <TourDetail />
                </Suspense>
          }/>
          <Route path="services" element={
            <Suspense fallback={<PageLoader />}>
              <Services />
            </Suspense>
          }/>
          <Route path="/visa/questions" element={
            <Suspense fallback={<PageLoader />}>
              <VisaQuestion />
            </Suspense>
          }/>
               <Route path="/visa/answer" element={
            <Suspense fallback={<PageLoader />}>
              <VisaAnswer />
            </Suspense>
          }/>
          <Route path="tours/:tourid" element={
            <Suspense fallback={<PageLoader />}>
              <ToursDetail />
            </Suspense>
          }/>

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
