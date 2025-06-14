import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { 
  File, Search, ChevronRight, Folder, Clock, 
  Plus, Trash, Edit, Upload, Download, UserPlus, 
  FileX, ArrowUp, ArrowDown 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogForm } from "@/components/ui/dialog-form";
import { FileUploadDialog } from "@/components/ui/file-upload-dialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { toast } from "@/components/ui/use-toast";
import { 
  categories, documentsByCategory, getAllDocumentsForCategory,
  addSubcategory, updateSubcategory, removeSubcategory,
  addDocument, removeDocument, Document as DocumentType
} from "@/data/categories";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams<{ categoryId: string; subcategoryId?: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isScrolled, setIsScrolled] = useState(false);

  // Get category information based on categoryId
  const categoryInfo = categoryId && categories[categoryId as keyof typeof categories];
  
  useEffect(() => {
    // Set active tab based on URL subcategory
    if (subcategoryId) {
      setActiveTab(subcategoryId);
    } else {
      setActiveTab("all");
    }
  }, [subcategoryId]);

  // Scroll handler for improved UX
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get documents for this category
  const allCategoryDocuments = categoryId ? getAllDocumentsForCategory(categoryId) : [];
  
  // Get documents for a specific subcategory or all
  const getDocumentsToDisplay = () => {
    if (!categoryId) return [];
    
    if (activeTab === "all") {
      return [];
    }
    
    if (activeTab === "recent" && categoryId === "funcionarios") {
      // For "recent" tab in "funcionarios", show recent documents across all employees
      const allEmployeeDocs = Object.values(documentsByCategory["funcionarios"] || {}).flat();
      // Sort by updated date (most recent first)
      return allEmployeeDocs.sort((a, b) => {
        const dateA = new Date(a.updated.split('/').reverse().join('-'));
        const dateB = new Date(b.updated.split('/').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      }).slice(0, 10); // Get the 10 most recent
    }
    
    const subCategoryDocs = documentsByCategory[categoryId as keyof typeof documentsByCategory]?.[activeTab];
    return subCategoryDocs || [];
  };

  // Special handling for funcionarios category
  const isFuncionarios = categoryId === "funcionarios";
  
  // Filter documents based on search term
  const filteredDocuments = useMemo(() => {
    const docs = getDocumentsToDisplay();
    if (!searchTerm) return docs;
    
    return docs.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab, categoryId, documentsByCategory]);

  // Get sorted subcategories
  const sortedSubcategories = useMemo(() => {
    if (!categoryInfo) return [];
    return [...categoryInfo.subcategories].sort((a, b) => a.title.localeCompare(b.title));
  }, [categoryInfo]);

  // Handle adding new employee/folder
  const handleAddSubcategory = (formData: Record<string, string>) => {
    if (!categoryId) return;
    
    const newSubcategory = addSubcategory(categoryId, formData.name);
    if (newSubcategory) {
      toast({
        title: "Pasta criada com sucesso",
        description: `${formData.name} foi adicionado.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao criar pasta",
        description: "Esta pasta já existe ou ocorreu um problema.",
      });
    }
  };

  // Handle editing employee/folder
  const handleEditSubcategory = (subId: string) => (formData: Record<string, string>) => {
    if (!categoryId) return;
    
    const updatedSubcategory = updateSubcategory(categoryId, subId, formData.name);
    if (updatedSubcategory) {
      setActiveTab(updatedSubcategory.id);
      navigate(`/category/${categoryId}/${updatedSubcategory.id}`);
      toast({
        title: "Pasta atualizada com sucesso",
        description: `Nome alterado para ${formData.name}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar pasta",
        description: "Ocorreu um problema ao atualizar a pasta.",
      });
    }
  };

  // Handle deleting employee/folder
  const handleDeleteSubcategory = (subId: string) => () => {
    if (!categoryId) return;
    
    if (removeSubcategory(categoryId, subId)) {
      setActiveTab("all");
      navigate(`/category/${categoryId}`);
      toast({
        title: "Pasta removida com sucesso",
        description: "Todos os documentos desta pasta foram excluídos.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao remover pasta",
        description: "Ocorreu um problema ao remover a pasta.",
      });
    }
  };

  // Handle document upload
  const handleDocumentUpload = (file: File, formData: Record<string, string>) => {
    if (!categoryId || activeTab === "all" || activeTab === "recent") {
      toast({
        variant: "destructive",
        title: "Erro ao fazer upload",
        description: "Selecione uma pasta antes de fazer upload.",
      });
      return;
    }

    // In a real app, we'd upload the file to a server here
    // For now, we'll simulate the file URL
    const newDocument = addDocument(categoryId, activeTab, {
      title: formData.title,
      description: formData.description,
      fileUrl: URL.createObjectURL(file),
      fileType: file.type
    });

    toast({
      title: "Documento enviado com sucesso",
      description: `${formData.title} foi adicionado.`,
    });
  };

  // Handle document deletion
  const handleDeleteDocument = (docId: string) => () => {
    if (!categoryId || activeTab === "all" || activeTab === "recent") return;
    
    if (removeDocument(categoryId, activeTab, docId)) {
      toast({
        title: "Documento removido com sucesso",
        description: "O documento foi excluído.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao remover documento",
        description: "Ocorreu um problema ao remover o documento.",
      });
    }
  };

  // Animation effect
  useEffect(() => {
    // Reset animation by removing and re-adding the class
    const elements = document.querySelectorAll('.section-animate');
    elements.forEach(el => {
      el.classList.remove('in-view');
      
      // Force reflow
      if (el instanceof HTMLElement) {
        void el.offsetHeight;
      }
    });
    
    // Add animation class after a short delay
    const timeout = setTimeout(() => {
      elements.forEach(el => {
        el.classList.add('in-view');
      });
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [categoryId, subcategoryId, activeTab]);

  if (!categoryInfo) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
        <Button asChild>
          <Link to="/documents">Ver todas as categorias</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="section-animate">
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{categoryInfo.title}</h1>
              <p className="text-blue-50">{categoryInfo.description}</p>
            </div>
            <div className="mt-4 md:mt-0">
              {isFuncionarios && (
                <DialogForm
                  title="Adicionar novo funcionário"
                  description="Insira o nome do funcionário para criar uma nova pasta."
                  fields={[
                    { id: 'name', label: 'Nome', placeholder: 'Ex: Maria Oliveira' }
                  ]}
                  onSubmit={handleAddSubcategory}
                  triggerButton={
                    <Button className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Novo Funcionário</span>
                    </Button>
                  }
                />
              )}
              {!isFuncionarios && (
                <DialogForm
                  title="Criar nova pasta"
                  description="Insira o nome da nova pasta que deseja criar."
                  fields={[
                    { id: 'name', label: 'Nome', placeholder: 'Ex: Regulamentos' }
                  ]}
                  onSubmit={handleAddSubcategory}
                  triggerButton={
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Nova Pasta</span>
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`section-animate sticky top-16 z-20 bg-background pt-2 pb-4 ${isScrolled ? "shadow-md" : ""}`}>
        <Card className="mb-2">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Buscar em ${categoryInfo.title}...`}
                className="pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="section-animate">
        {isFuncionarios && (
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab}
            onValueChange={tab => {
              setActiveTab(tab);
              if (tab !== "all" && tab !== "recent") {
                navigate(`/category/${categoryId}/${tab}`);
              } else {
                navigate(`/category/${categoryId}`);
              }
            }}
            className="mb-6"
          >
            <ScrollArea className="w-full pb-2">
              <TabsList className="inline-flex h-auto p-1 min-w-full">
                <TabsTrigger value="all" className="rounded-full">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="recent" className="rounded-full">
                  <Clock className="h-4 w-4 mr-1" />
                  Arquivos Recentes
                </TabsTrigger>
                {sortedSubcategories.map(sub => (
                  <TabsTrigger 
                    key={sub.id} 
                    value={sub.id}
                    className="rounded-full"
                  >
                    {sub.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
            
            {/* All Employees Tab Content */}
            <TabsContent value="all" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Todos Funcionários</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedSubcategories.map((subcategory) => (
                  <Card 
                    key={subcategory.id} 
                    className="card-hover cursor-pointer transition-all duration-200 hover:shadow-md" 
                    onClick={() => {
                      setActiveTab(subcategory.id);
                      navigate(`/category/${categoryId}/${subcategory.id}`);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-md">
                            <Folder className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{subcategory.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {documentsByCategory.funcionarios?.[subcategory.id]?.length || 0} documento{documentsByCategory.funcionarios?.[subcategory.id]?.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recent Files Tab Content */}
            <TabsContent value="recent" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Arquivos Recentes</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="card-hover hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-50 p-2 rounded-md">
                            <File className="h-6 w-6 text-hr-blue" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start flex-wrap gap-2">
                              <div>
                                <Link to={`/document/${doc.id}`}>
                                  <h3 className="font-medium hover:text-hr-blue transition-colors">{doc.title}</h3>
                                </Link>
                                <div className="text-sm text-muted-foreground mt-1">
                                  Atualizado em {doc.updated}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {doc.fileUrl && (
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={doc.fileUrl} download={doc.title}>
                                      <Download className="h-4 w-4 mr-1" />
                                      Baixar
                                    </a>
                                  </Button>
                                )}
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/document/${doc.id}`}>Ver</Link>
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{doc.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">Nenhum documento recente encontrado</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Individual Employee Tab Content */}
            {sortedSubcategories.map((subcategory) => (
              <TabsContent key={subcategory.id} value={subcategory.id} className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">{subcategory.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <FileUploadDialog
                      title="Upload de Documento"
                      description="Selecione um arquivo para enviar para esta pasta."
                      onUpload={handleDocumentUpload}
                      triggerButton={
                        <Button variant="outline" className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>Upload</span>
                        </Button>
                      }
                    />
                    <DialogForm
                      title="Editar Funcionário"
                      description="Atualize o nome do funcionário."
                      fields={[
                        { id: 'name', label: 'Nome', defaultValue: subcategory.title }
                      ]}
                      onSubmit={handleEditSubcategory(subcategory.id)}
                      triggerButton={
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <ConfirmationDialog
                      title="Remover Funcionário"
                      description="Esta ação não pode ser desfeita. Todos os documentos deste funcionário serão excluídos permanentemente."
                      confirmLabel="Remover"
                      variant="destructive"
                      onConfirm={handleDeleteSubcategory(subcategory.id)}
                      triggerButton={
                        <Button variant="outline" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                      <Card key={doc.id} className="card-hover hover:shadow-md transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-md">
                              <File className="h-6 w-6 text-hr-blue" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start flex-wrap gap-2">
                                <div>
                                  <Link to={`/document/${doc.id}`}>
                                    <h3 className="font-medium hover:text-hr-blue transition-colors">{doc.title}</h3>
                                  </Link>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    Atualizado em {doc.updated}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {doc.fileUrl && (
                                    <Button variant="outline" size="sm" asChild>
                                      <a href={doc.fileUrl} download={doc.title}>
                                        <Download className="h-4 w-4 mr-1" />
                                        Baixar
                                      </a>
                                    </Button>
                                  )}
                                  <Button variant="outline" size="sm" asChild>
                                    <Link to={`/document/${doc.id}`}>Ver</Link>
                                  </Button>
                                  <ConfirmationDialog
                                    title="Excluir Documento"
                                    description={`Tem certeza que deseja excluir "${doc.title}"?`}
                                    confirmLabel="Excluir"
                                    variant="destructive"
                                    onConfirm={handleDeleteDocument(doc.id)}
                                    triggerButton={
                                      <Button variant="outline" size="sm">
                                        <FileX className="h-4 w-4 mr-1" />
                                        Excluir
                                      </Button>
                                    }
                                  />
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">{doc.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-lg text-muted-foreground">Nenhum documento encontrado</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Use o botão de upload acima para adicionar documentos.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* For other categories (not Funcionarios) */}
        {!isFuncionarios && (
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab}
            onValueChange={tab => {
              setActiveTab(tab);
              if (tab !== "all") {
                navigate(`/category/${categoryId}/${tab}`);
              } else {
                navigate(`/category/${categoryId}`);
              }
            }}
            className="mb-6"
          >
            <ScrollArea className="w-full pb-2">
              <TabsList className="inline-flex h-auto p-1 min-w-full">
                <TabsTrigger value="all" className="rounded-full">
                  Todos
                </TabsTrigger>
                {categoryInfo.subcategories.map(sub => (
                  <TabsTrigger 
                    key={sub.id} 
                    value={sub.id}
                    className="rounded-full"
                  >
                    {sub.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
            
            <TabsContent value={activeTab} className="mt-4">
              {activeTab !== "all" && (
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">
                      {categoryInfo.subcategories.find(s => s.id === activeTab)?.title || ""}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <FileUploadDialog
                      title="Upload de Documento"
                      description="Selecione um arquivo para enviar para esta pasta."
                      onUpload={handleDocumentUpload}
                      triggerButton={
                        <Button variant="outline" className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>Upload</span>
                        </Button>
                      }
                    />
                    <DialogForm
                      title="Editar Pasta"
                      description="Atualize o nome da pasta."
                      fields={[
                        { 
                          id: 'name', 
                          label: 'Nome', 
                          defaultValue: categoryInfo.subcategories.find(s => s.id === activeTab)?.title || ""
                        }
                      ]}
                      onSubmit={handleEditSubcategory(activeTab)}
                      triggerButton={
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <ConfirmationDialog
                      title="Remover Pasta"
                      description="Esta ação não pode ser desfeita. Todos os documentos desta pasta serão excluídos permanentemente."
                      confirmLabel="Remover"
                      variant="destructive"
                      onConfirm={handleDeleteSubcategory(activeTab)}
                      triggerButton={
                        <Button variant="outline" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </div>
              )}

              {activeTab === "all" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {categoryInfo.subcategories.map((subcategory) => {
                    const subDocs = documentsByCategory[categoryId as keyof typeof documentsByCategory]?.[subcategory.id] || [];
                    return (
                      <Card 
                        key={subcategory.id} 
                        className="card-hover cursor-pointer transition-all duration-200 hover:shadow-md" 
                        onClick={() => {
                          setActiveTab(subcategory.id);
                          navigate(`/category/${categoryId}/${subcategory.id}`);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-blue-100 p-2 rounded-md">
                                <Folder className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium">{subcategory.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {subDocs.length} documento{subDocs.length !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                      <Card key={doc.id} className="card-hover hover:shadow-md transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-md">
                              <File className="h-6 w-6 text-hr-blue" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start flex-wrap gap-2">
                                <div>
                                  <Link to={`/document/${doc.id}`}>
                                    <h3 className="font-medium hover:text-hr-blue transition-colors">{doc.title}</h3>
                                  </Link>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    Atualizado em {doc.updated}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {doc.fileUrl && (
                                    <Button variant="outline" size="sm" asChild>
                                      <a href={doc.fileUrl} download={doc.title}>
                                        <Download className="h-4 w-4 mr-1" />
                                        Baixar
                                      </a>
                                    </Button>
                                  )}
                                  <Button variant="outline" size="sm" asChild>
                                    <Link to={`/document/${doc.id}`}>Ver</Link>
                                  </Button>
                                  <ConfirmationDialog
                                    title="Excluir Documento"
                                    description={`Tem certeza que deseja excluir "${doc.title}"?`}
                                    confirmLabel="Excluir"
                                    variant="destructive"
                                    onConfirm={handleDeleteDocument(doc.id)}
                                    triggerButton={
                                      <Button variant="outline" size="sm">
                                        <FileX className="h-4 w-4 mr-1" />
                                        Excluir
                                      </Button>
                                    }
                                  />
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">{doc.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-lg text-muted-foreground">Nenhum documento encontrado</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Use o botão de upload acima para adicionar documentos.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Back to top button */}
      {isScrolled && (
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default CategoryPage;
