
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { File, Search, Folder } from "lucide-react";
import { toast } from "sonner";

// Mock data para os documentos
const documentsData = [
  {
    id: "1",
    title: "Política de Férias",
    description: "Documento completo sobre as políticas de férias da empresa",
    category: "Férias",
    categoryId: "ferias",
    updated: "10/05/2023",
    type: "pdf"
  },
  {
    id: "2",
    title: "Manual do Colaborador",
    description: "Guia completo para novos funcionários",
    category: "Admissão",
    categoryId: "admissao",
    updated: "15/03/2023",
    type: "pdf"
  },
  {
    id: "3",
    title: "Formulário de Admissão",
    description: "Formulário padrão para processo de admissão",
    category: "Admissão",
    categoryId: "admissao",
    updated: "22/04/2023",
    type: "docx"
  },
  {
    id: "4",
    title: "Política de Benefícios",
    description: "Detalhes sobre todos os benefícios oferecidos",
    category: "Benefícios",
    categoryId: "beneficios",
    updated: "08/06/2023",
    type: "pdf"
  },
  {
    id: "5",
    title: "Plano de Saúde",
    description: "Informações sobre o plano de saúde corporativo",
    category: "Benefícios",
    categoryId: "beneficios",
    updated: "12/05/2023",
    type: "pdf"
  },
  {
    id: "6",
    title: "Folha de Pagamento - Modelo",
    description: "Template padrão para folha de pagamento",
    category: "Folha de Pagamento",
    categoryId: "folha-pagamento",
    updated: "30/05/2023",
    type: "xlsx"
  },
  {
    id: "7",
    title: "Curso de Integração",
    description: "Material do curso de integração para novos funcionários",
    category: "Treinamentos",
    categoryId: "treinamentos",
    updated: "18/04/2023",
    type: "pptx"
  },
  {
    id: "8",
    title: "Treinamento de Segurança",
    description: "Documentos sobre treinamento de segurança no trabalho",
    category: "Treinamentos",
    categoryId: "treinamentos",
    updated: "25/05/2023",
    type: "pdf"
  },
  {
    id: "22",
    title: "Contrato de Trabalho - João Silva",
    description: "Contrato de trabalho do funcionário João Silva",
    category: "Funcionários",
    categoryId: "funcionarios",
    updated: "15/03/2023",
    type: "pdf"
  },
  {
    id: "25",
    title: "Contrato de Trabalho - Maria Santos",
    description: "Contrato de trabalho da funcionária Maria Santos",
    category: "Funcionários",
    categoryId: "funcionarios",
    updated: "20/05/2022",
    type: "pdf"
  }
];

const categoriesOptions = [
  { id: "admissao", title: "Admissão" },
  { id: "beneficios", title: "Benefícios" },
  { id: "ferias", title: "Férias" },
  { id: "folha-pagamento", title: "Folha de Pagamento" },
  { id: "treinamentos", title: "Treinamentos" },
  { id: "funcionarios", title: "Funcionários" }
];

const Documents = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  console.log("Documents page loaded with search params:", searchParams.get('q'));
  console.log("Current search term:", searchTerm);
  console.log("Current category filter:", categoryFilter);

  // Aplicar pesquisa da URL ao carregar
  useEffect(() => {
    const urlSearch = searchParams.get('q');
    if (urlSearch) {
      setSearchTerm(urlSearch);
      toast(`Pesquisando por "${urlSearch}"`);
    }
  }, [searchParams]);

  // Filtrar documentos baseado na pesquisa e categoria
  const filteredDocuments = documentsData.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || doc.categoryId === categoryFilter;
    
    console.log(`Document ${doc.title}: matches search=${matchesSearch}, matches category=${matchesCategory}`);
    
    return matchesSearch && matchesCategory;
  });

  console.log("Filtered documents count:", filteredDocuments.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast(`Pesquisando por "${searchTerm}"`);
    } else {
      toast("Digite algo para pesquisar");
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <File className="h-6 w-6 text-red-600" />;
      case 'docx':
        return <File className="h-6 w-6 text-blue-600" />;
      case 'xlsx':
        return <File className="h-6 w-6 text-green-600" />;
      case 'pptx':
        return <File className="h-6 w-6 text-orange-600" />;
      default:
        return <File className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="section-animate">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Todos os Documentos</h1>
            <p className="text-muted-foreground mt-2">
              Encontre todos os documentos do RH em um só lugar
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredDocuments.length} documentos encontrados
          </div>
        </div>
      </div>
      
      <div className="section-animate delay-100">
        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative col-span-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar documentos por título, descrição ou categoria..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categoriesOptions.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="section-animate delay-200">
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((doc, index) => (
              <Card key={doc.id} className={`card-hover transform transition-all duration-500 delay-${index * 50}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <Link to={`/document/${doc.id}`}>
                            <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors cursor-pointer">
                              {doc.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Folder className="h-4 w-4" />
                            <span>{doc.category}</span>
                            <span>•</span>
                            <span>Atualizado em {doc.updated}</span>
                            <span>•</span>
                            <span className="uppercase text-xs font-medium">{doc.type}</span>
                          </div>
                          <p className="text-muted-foreground mt-2">{doc.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/document/${doc.id}`}>
                              Visualizar
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum documento encontrado</h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os termos de pesquisa ou filtros para encontrar o que procura.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
