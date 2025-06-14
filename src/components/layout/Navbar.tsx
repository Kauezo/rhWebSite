import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted with term:", searchTerm);
    
    if (searchTerm.trim()) {
      const searchUrl = `/documents?q=${encodeURIComponent(searchTerm.trim())}`;
      console.log("Navigating to:", searchUrl);
      navigate(searchUrl);
      toast(`Pesquisando por "${searchTerm.trim()}"`);
    } else {
      toast("Digite algo para pesquisar");
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          Portal RH
        </Link>
      </div>

      <div className="hidden md:flex items-center max-w-md w-full relative">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar documentos..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="hidden md:flex">
          <Link to="/documents">Todos os Documentos</Link>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => navigate("/documents")}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
