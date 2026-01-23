import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./shared/services";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/blog/BlogDetailPage"));
const NotFoundPage = lazy(() => import("./pages/not-found/NotFoundPage"));

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-bg-primary pt-24">
          <Header />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
