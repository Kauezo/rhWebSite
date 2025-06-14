
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Layout = () => {
  const { toast } = useToast();
  
  // Add intersection observer for animation on scroll
  useEffect(() => {
    // Welcome toast on initial render
    toast({
      title: "Bem-vindo ao Portal RH",
      description: "Acesse facilmente todos os documentos e informações do RH.",
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

    const sections = document.querySelectorAll(".section-animate");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [toast]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
