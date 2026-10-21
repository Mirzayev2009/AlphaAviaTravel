import { createElement, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingCards } from "@/components/TravelUI";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

const Tours = lazy(() => import("./pages/Tours"));
const ToursDetail = lazy(() => import("./pages/ToursDetail"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ChatBotPage = lazy(() => import("./pages/ChatBotPage"));
const VisaQuestion = lazy(() => import("./pages/VisaQuestion"));
const VisaAnswer = lazy(() => import("./pages/VisaAnswer"));
const NotFound = lazy(() => import("./pages/NotFound"));
const client = new QueryClient();
const page = (Component) => <Suspense fallback={<div className="site-container section"><LoadingCards/></div>}>{createElement(Component)}</Suspense>;

export default function App() {
  return <QueryClientProvider client={client}><BrowserRouter><Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/><Route path="tours" element={page(Tours)}/><Route path="tours/:tourid" element={page(ToursDetail)}/>
      <Route path="destinations" element={page(Destinations)}/><Route path="services" element={page(Services)}/><Route path="gallery" element={page(Gallery)}/>
      <Route path="about" element={page(About)}/><Route path="contact" element={page(Contact)}/><Route path="chatbot" element={page(ChatBotPage)}/>
      <Route path="visa/questions" element={page(VisaQuestion)}/><Route path="visa/answer" element={page(VisaAnswer)}/><Route path="*" element={page(NotFound)}/>
    </Route>
  </Routes></BrowserRouter></QueryClientProvider>;
}
