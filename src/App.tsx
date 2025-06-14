
import { ToastProvider } from "@/components/toast-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import CategoryPage from "./pages/CategoryPage";
import DocumentView from "./pages/DocumentView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="documents" element={<Documents />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="category/:categoryId/:subcategoryId" element={<CategoryPage />} />
          <Route path="document/:documentId" element={<DocumentView />} />
          <Route path="search" element={<Documents />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
