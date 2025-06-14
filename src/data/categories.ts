// Category data
export interface Subcategory {
  id: string;
  title: string;
}

export interface Category {
  title: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Document {
  id: string;
  title: string;
  updated: string;
  description: string;
  content?: string;
  fileUrl?: string;
  fileType?: string;
  categoryId?: string;
  category?: string;
}

// Generate a unique ID for new items
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Get current date formatted as DD/MM/YYYY
export function getCurrentDate(): string {
  const date = new Date();
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

export const categories: Record<string, Category> = {
  "funcionarios": {
    title: "Funcionários",
    description: "Documentos individuais de cada colaborador da empresa.",
    subcategories: [
      { id: "ana-costa", title: "Ana Costa" },
      { id: "carlos-souza", title: "Carlos Souza" },
      { id: "joao-silva", title: "João Silva" },
      { id: "maria-santos", title: "Maria Santos" },
      { id: "pedro-oliveira", title: "Pedro Oliveira" }
    ]
  },
  "admissao": {
    title: "Admissão",
    description: "Documentos relacionados ao processo de admissão de novos colaboradores.",
    subcategories: [
      { id: "formularios", title: "Formulários" },
      { id: "checklist", title: "Checklists" },
      { id: "procedimentos", title: "Procedimentos" }
    ]
  },
  "beneficios": {
    title: "Benefícios",
    description: "Informações sobre os benefícios oferecidos pela empresa.",
    subcategories: [
      { id: "saude", title: "Plano de Saúde" },
      { id: "vale-refeicao", title: "Vale Refeição" },
      { id: "outros", title: "Outros Benefícios" }
    ]
  },
  "ferias": {
    title: "Férias",
    description: "Políticas e formulários relacionados às férias dos colaboradores.",
    subcategories: [
      { id: "politicas", title: "Políticas" },
      { id: "formularios", title: "Formulários" },
      { id: "calendario", title: "Calendário" }
    ]
  },
  "folha-pagamento": {
    title: "Folha de Pagamento",
    description: "Documentos sobre folha de pagamento, holerite e informações relacionadas.",
    subcategories: [
      { id: "holerites", title: "Holerites" },
      { id: "impostos", title: "Impostos" },
      { id: "calendario", title: "Calendário de Pagamento" }
    ]
  },
  "treinamentos": {
    title: "Treinamentos",
    description: "Material de treinamento e certificações para colaboradores.",
    subcategories: [
      { id: "internos", title: "Internos" },
      { id: "externos", title: "Externos" },
      { id: "certificacoes", title: "Certificações" }
    ]
  }
};

// Document data by category and subcategory
export const documentsByCategory: Record<string, Record<string, Document[]>> = {
  "admissao": {
    "formularios": [
      {
        id: "3",
        title: "Formulário de Admissão",
        updated: "22/04/2023",
        description: "Documento para preenchimento durante o processo de admissão.",
        categoryId: "admissao",
        category: "Admissão"
      },
      {
        id: "8",
        title: "Declaração de Dependentes",
        updated: "05/02/2023",
        description: "Formulário para declaração de dependentes para fins de imposto de renda.",
        categoryId: "admissao",
        category: "Admissão"
      },
    ],
    "checklist": [
      {
        id: "7",
        title: "Checklist de Integração",
        updated: "14/03/2023",
        description: "Lista de tarefas para integração de novos colaboradores."
      },
      {
        id: "15",
        title: "Checklist de Documentação",
        updated: "10/02/2023",
        description: "Lista de documentos necessários para admissão."
      },
    ],
    "procedimentos": [
      {
        id: "16",
        title: "Procedimento de Admissão",
        updated: "18/01/2023",
        description: "Detalhamento do processo de admissão de novos colaboradores."
      },
    ]
  },
  "beneficios": {
    "saude": [
      {
        id: "4",
        title: "Política de Benefícios de Saúde",
        updated: "05/01/2023",
        description: "Detalhes sobre os benefícios de saúde oferecidos pela empresa."
      },
    ],
    "vale-refeicao": [
      {
        id: "9",
        title: "Solicitação de Vale Refeição",
        updated: "12/04/2023",
        description: "Formulário para solicitação ou alteração de vale refeição."
      },
    ],
    "outros": [
      {
        id: "17",
        title: "Auxílio Educação",
        updated: "20/03/2023",
        description: "Política de auxílio educação para colaboradores."
      },
    ]
  },
  "ferias": {
    "politicas": [
      {
        id: "1",
        title: "Política de Férias",
        updated: "10/05/2023",
        description: "Diretrizes e procedimentos para solicitação e aprovação de férias."
      },
    ],
    "formularios": [
      {
        id: "10",
        title: "Solicitação de Férias",
        updated: "22/03/2023",
        description: "Formulário para solicitação de período de férias."
      },
    ],
    "calendario": [
      {
        id: "18",
        title: "Calendário de Férias 2023",
        updated: "05/01/2023",
        description: "Programação anual de férias dos colaboradores."
      },
    ]
  },
  "folha-pagamento": {
    "holerites": [
      {
        id: "19",
        title: "Acesso aos Holerites",
        updated: "01/04/2023",
        description: "Instruções para acesso aos holerites mensais."
      },
    ],
    "impostos": [
      {
        id: "20",
        title: "Informações de Imposto de Renda",
        updated: "15/02/2023",
        description: "Orientações sobre o informe de rendimentos anual."
      },
      {
        id: "12",
        title: "Política de Horas Extras",
        updated: "18/02/2023",
        description: "Regras para realização e pagamento de horas extras."
      }
    ],
    "calendario": [
      {
        id: "11",
        title: "Calendário de Pagamento",
        updated: "01/01/2023",
        description: "Datas de pagamento para o ano corrente."
      },
    ]
  },
  "treinamentos": {
    "internos": [
      {
        id: "13",
        title: "Catálogo de Treinamentos",
        updated: "15/04/2023",
        description: "Lista de treinamentos disponíveis para colaboradores."
      },
    ],
    "externos": [
      {
        id: "14",
        title: "Solicitação de Treinamento Externo",
        updated: "10/03/2023",
        description: "Formulário para solicitação de participação em treinamentos externos."
      },
    ],
    "certificacoes": [
      {
        id: "21",
        title: "Programa de Certificações",
        updated: "18/03/2023",
        description: "Detalhes sobre o programa de apoio a certificações profissionais."
      },
    ]
  },
  "funcionarios": {
    "joao-silva": [
      {
        id: "22",
        title: "Contrato de Trabalho",
        updated: "15/03/2023",
        description: "Contrato de trabalho assinado na data de admissão."
      },
      {
        id: "23",
        title: "Ficha Cadastral",
        updated: "15/03/2023",
        description: "Ficha com informações pessoais e contatos de emergência."
      },
      {
        id: "24",
        title: "Avaliação de Desempenho 2023",
        updated: "10/12/2023",
        description: "Resultado da avaliação anual de desempenho."
      }
    ],
    "maria-santos": [
      {
        id: "25",
        title: "Contrato de Trabalho",
        updated: "20/05/2022",
        description: "Contrato de trabalho assinado na data de admissão."
      },
      {
        id: "26",
        title: "Certificados de Treinamento",
        updated: "12/08/2023",
        description: "Certificados de conclusão dos treinamentos internos."
      }
    ],
    "pedro-oliveira": [
      {
        id: "27",
        title: "Contrato de Trabalho",
        updated: "03/07/2021",
        description: "Contrato de trabalho assinado na data de admissão."
      },
      {
        id: "28",
        title: "Aditivo Contratual",
        updated: "15/01/2023",
        description: "Aditivo de alteração de cargo e salário."
      },
      {
        id: "29",
        title: "Atestados Médicos",
        updated: "22/09/2023",
        description: "Registro de atestados médicos apresentados."
      }
    ],
    "ana-costa": [
      {
        id: "30",
        title: "Contrato de Trabalho",
        updated: "10/11/2022",
        description: "Contrato de trabalho assinado na data de admissão."
      },
      {
        id: "31",
        title: "Acordo de Confidencialidade",
        updated: "10/11/2022",
        description: "Acordo de confidencialidade e proteção de dados."
      }
    ],
    "carlos-souza": [
      {
        id: "32",
        title: "Contrato de Trabalho",
        updated: "05/02/2023",
        description: "Contrato de trabalho assinado na data de admissão."
      },
      {
        id: "33",
        title: "Comprovante de Residência",
        updated: "05/02/2023",
        description: "Cópia do comprovante de residência atual."
      }
    ]
  }
};

// Helper functions to get all documents for a category
export function getAllDocumentsForCategory(categoryId: string): Document[] {
  const categoryDocs = documentsByCategory[categoryId];
  if (!categoryDocs) return [];
  
  return Object.values(categoryDocs).flat().map(doc => ({
    ...doc,
    categoryId: categoryId,
    category: categories[categoryId]?.title || "Desconhecido"
  }));
}

// Add new document (used for file uploads)
export function addDocument(categoryId: string, subcategoryId: string, document: Partial<Document>): Document {
  if (!documentsByCategory[categoryId]) {
    documentsByCategory[categoryId] = {};
  }
  
  if (!documentsByCategory[categoryId][subcategoryId]) {
    documentsByCategory[categoryId][subcategoryId] = [];
  }
  
  const newDoc: Document = {
    id: generateId(),
    title: document.title || "Novo documento",
    description: document.description || "",
    updated: getCurrentDate(),
    categoryId: categoryId,
    category: categories[categoryId]?.title || "Desconhecido",
    ...document
  };
  
  documentsByCategory[categoryId][subcategoryId].push(newDoc);
  return newDoc;
}

// Remove document by ID
export function removeDocument(categoryId: string, subcategoryId: string, documentId: string) {
  if (!documentsByCategory[categoryId] || !documentsByCategory[categoryId][subcategoryId]) {
    return false;
  }
  
  const initialLength = documentsByCategory[categoryId][subcategoryId].length;
  documentsByCategory[categoryId][subcategoryId] = documentsByCategory[categoryId][subcategoryId]
    .filter(doc => doc.id !== documentId);
  
  return documentsByCategory[categoryId][subcategoryId].length < initialLength;
}

// Add new subcategory (employee or folder)
export function addSubcategory(categoryId: string, title: string): Subcategory | null {
  if (!categories[categoryId]) {
    return null;
  }
  
  // Generate an ID based on the title (slug)
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Check if subcategory with this ID already exists
  if (categories[categoryId].subcategories.some(sub => sub.id === id)) {
    return null;
  }
  
  const newSubcategory = { id, title };
  categories[categoryId].subcategories.push(newSubcategory);
  
  // Sort subcategories alphabetically by title
  categories[categoryId].subcategories.sort((a, b) => a.title.localeCompare(b.title));
  
  // Initialize empty document array for this subcategory
  if (!documentsByCategory[categoryId]) {
    documentsByCategory[categoryId] = {};
  }
  documentsByCategory[categoryId][id] = [];
  
  return newSubcategory;
}

// Update subcategory
export function updateSubcategory(categoryId: string, oldId: string, title: string): Subcategory | null {
  if (!categories[categoryId]) {
    return null;
  }
  
  const index = categories[categoryId].subcategories.findIndex(sub => sub.id === oldId);
  if (index === -1) {
    return null;
  }
  
  // Generate a new ID based on the updated title
  const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Update the subcategory
  categories[categoryId].subcategories[index] = { id: newId, title };
  
  // Sort subcategories alphabetically
  categories[categoryId].subcategories.sort((a, b) => a.title.localeCompare(b.title));
  
  // Move documents to the new ID
  if (documentsByCategory[categoryId] && documentsByCategory[categoryId][oldId]) {
    documentsByCategory[categoryId][newId] = documentsByCategory[categoryId][oldId];
    delete documentsByCategory[categoryId][oldId];
  }
  
  return categories[categoryId].subcategories[index];
}

// Remove subcategory
export function removeSubcategory(categoryId: string, subcategoryId: string): boolean {
  if (!categories[categoryId]) {
    return false;
  }
  
  const initialLength = categories[categoryId].subcategories.length;
  categories[categoryId].subcategories = categories[categoryId].subcategories
    .filter(sub => sub.id !== subcategoryId);
  
  // Remove documents associated with this subcategory
  if (documentsByCategory[categoryId] && documentsByCategory[categoryId][subcategoryId]) {
    delete documentsByCategory[categoryId][subcategoryId];
  }
  
  return categories[categoryId].subcategories.length < initialLength;
}

// Find document by ID across all categories
export function findDocumentById(documentId: string): { 
  document: Document; 
  categoryId: string; 
  subcategoryId: string 
} | null {
  for (const categoryId in documentsByCategory) {
    for (const subcategoryId in documentsByCategory[categoryId]) {
      const doc = documentsByCategory[categoryId][subcategoryId].find(d => d.id === documentId);
      if (doc) {
        return { 
          document: { 
            ...doc, 
            categoryId, 
            category: categories[categoryId]?.title || "Desconhecido" 
          }, 
          categoryId, 
          subcategoryId 
        };
      }
    }
  }
  return null;
}

// Update document (syncs changes across all instances with the same ID)
export function updateDocument(documentId: string, updates: Partial<Document>): boolean {
  let updated = false;
  
  for (const categoryId in documentsByCategory) {
    for (const subcategoryId in documentsByCategory[categoryId]) {
      const index = documentsByCategory[categoryId][subcategoryId].findIndex(d => d.id === documentId);
      if (index !== -1) {
        documentsByCategory[categoryId][subcategoryId][index] = {
          ...documentsByCategory[categoryId][subcategoryId][index],
          ...updates,
          updated: getCurrentDate(), // Update the modification date
          categoryId,
          category: categories[categoryId]?.title || "Desconhecido"
        };
        updated = true;
      }
    }
  }
  
  return updated;
}
