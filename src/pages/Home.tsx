
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, File, ArrowRight, Users } from "lucide-react";
import { categories } from "@/data/categories";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollSections = document.querySelectorAll('.section-animate');
      
      scrollSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        if (sectionTop < window.innerHeight - 100 && sectionBottom > 0) {
          section.classList.add('in-view');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Map categories for the home page display
  const mainCategoriesData = [
    { id: "funcionarios", title: "Funcionários", count: categories.funcionarios.subcategories.length, icon: Users },
    { id: "admissao", title: "Admissão", count: 12, icon: Folder },
    { id: "beneficios", title: "Benefícios", count: 8, icon: Folder },
    { id: "ferias", title: "Férias", count: 5, icon: Folder },
    { id: "folha-pagamento", title: "Folha de Pagamento", count: 10, icon: Folder },
    { id: "treinamentos", title: "Treinamentos", count: 15, icon: Folder },
    { id: "demissao", title: "Desligamento", count: 6, icon: Folder },
  ];

  return (
    <div className="space-y-8">
      <section className="section-animate">
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 p-6 md:p-10 mb-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bem-vindo ao Portal de Documentos RH
            </h1>
            <p className="text-blue-50 text-lg mb-6">
              Acesse facilmente todos os documentos, políticas e formulários do departamento de RH
              em um único lugar, organizados e fáceis de localizar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/documents">
                  Ver Todos os Documentos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-animate delay-100">
        <h2 className="text-2xl font-semibold mb-4">Categorias Principais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mainCategoriesData.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <Card className="card-hover h-full transform transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <category.icon className="h-6 w-6 text-hr-blue" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    {category.count} {category.id === "funcionarios" ? "funcionários" : "documentos"}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-animate delay-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Documentos Recentes</h2>
          <Button variant="ghost" asChild className="gap-1">
            <Link to="/documents">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: "1",
              title: "Política de Férias",
              category: "Férias",
              updated: "10/05/2023",
            },
            {
              id: "2", 
              title: "Manual do Colaborador",
              category: "Geral",
              updated: "15/03/2023",
            },
            {
              id: "3",
              title: "Formulário de Admissão",
              category: "Admissão",
              updated: "22/04/2023",
            },
          ].map((doc) => (
            <Card key={doc.id} className="card-hover transform transition-all duration-300 hover:translate-y-[-5px]">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded">
                    <File className="h-6 w-6 text-hr-blue" />
                  </div>
                  <div>
                    <Link to={`/document/${doc.id}`}>
                      <h3 className="font-medium hover:text-hr-blue transition-colors">{doc.title}</h3>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>Atualizado em {doc.updated}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
