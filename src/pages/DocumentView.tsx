
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Download, File } from "lucide-react";
import { useEffect } from "react";

// Sample document data
const documents = {
  "1": {
    title: "Política de Férias",
    category: "Férias",
    categoryId: "ferias",
    subcategoryId: "politicas",
    updated: "10/05/2023",
    author: "Departamento de RH",
    content: `
      <h2>Política de Férias</h2>
      
      <p>Este documento estabelece as diretrizes para solicitação, aprovação e gozo de férias pelos colaboradores da empresa.</p>
      
      <h3>1. Período Aquisitivo</h3>
      <p>O colaborador adquire direito a férias após completar 12 (doze) meses de trabalho para o mesmo empregador (período aquisitivo).</p>
      
      <h3>2. Duração das Férias</h3>
      <p>As férias terão duração de 30 (trinta) dias corridos, podendo ser fracionadas em até 3 (três) períodos, sendo que um deles não poderá ser inferior a 14 (quatorze) dias corridos e os demais não poderão ser inferiores a 5 (cinco) dias corridos cada um.</p>
      
      <h3>3. Solicitação de Férias</h3>
      <p>O colaborador deve solicitar suas férias com no mínimo 30 (trinta) dias de antecedência através do formulário específico disponível no Portal RH.</p>
      
      <h3>4. Aprovação</h3>
      <p>A aprovação das férias está condicionada à avaliação do gestor direto e considerará o planejamento do departamento e a legislação vigente.</p>
      
      <h3>5. Remuneração</h3>
      <p>O pagamento das férias será realizado até 2 (dois) dias antes do início do período de gozo, com acréscimo de 1/3 (um terço) sobre o salário normal, conforme previsto na Constituição Federal.</p>
      
      <h3>6. Abono Pecuniário</h3>
      <p>O colaborador poderá converter 1/3 (um terço) do período de férias em abono pecuniário, desde que solicitado até 15 (quinze) dias antes do término do período aquisitivo.</p>
      
      <h3>7. Férias Coletivas</h3>
      <p>A empresa poderá conceder férias coletivas, devendo comunicar os colaboradores com no mínimo 15 (quinze) dias de antecedência.</p>
    `,
  },
  "2": {
    title: "Manual do Colaborador",
    category: "Geral",
    categoryId: null,
    subcategoryId: null,
    updated: "15/03/2023",
    author: "Departamento de RH",
    content: `
      <h2>Manual do Colaborador</h2>
      
      <p>Bem-vindo à nossa equipe! Este manual foi elaborado para auxiliar em sua integração e fornecer informações importantes sobre a empresa e seus processos.</p>
      
      <h3>1. Nossa História</h3>
      <p>A empresa foi fundada em 2010 com o objetivo de oferecer soluções inovadoras para o mercado. Desde então, crescemos e nos tornamos referência em nosso segmento.</p>
      
      <h3>2. Missão, Visão e Valores</h3>
      <p><strong>Missão:</strong> Entregar soluções que transformam negócios e impactam positivamente a sociedade.</p>
      <p><strong>Visão:</strong> Ser reconhecida como líder em inovação e qualidade em nosso segmento.</p>
      <p><strong>Valores:</strong> Integridade, Respeito, Inovação, Colaboração e Excelência.</p>
      
      <h3>3. Horário de Trabalho</h3>
      <p>O horário padrão é de segunda a sexta-feira, das 9h às 18h, com 1 hora de almoço. Flexibilizações podem ser acordadas com o gestor direto.</p>
      
      <h3>4. Benefícios</h3>
      <p>A empresa oferece os seguintes benefícios:</p>
      <ul>
        <li>Plano de saúde</li>
        <li>Vale-refeição</li>
        <li>Vale-transporte</li>
        <li>Seguro de vida</li>
        <li>Programa de participação nos resultados</li>
      </ul>
      
      <h3>5. Desenvolvimento Profissional</h3>
      <p>Valorizamos o crescimento de nossos colaboradores e oferecemos programas de capacitação e treinamento contínuos.</p>
    `,
  },
  "3": {
    title: "Formulário de Admissão",
    category: "Admissão",
    categoryId: "admissao",
    subcategoryId: "formularios",
    updated: "22/04/2023",
    author: "Departamento de RH",
    content: `
      <h2>Formulário de Admissão</h2>
      
      <p>Este formulário deve ser preenchido por todos os novos colaboradores no processo de admissão.</p>
      
      <h3>Dados Pessoais</h3>
      <p>Nome completo: _______________________________</p>
      <p>Data de nascimento: ___/___/______</p>
      <p>RG: ________________ Órgão Emissor: ______</p>
      <p>CPF: ___.___.___-__</p>
      <p>Estado Civil: _______________</p>
      <p>Endereço: ____________________________________________________________</p>
      <p>Bairro: ________________ Cidade: ________________ Estado: ____</p>
      <p>CEP: _____-___</p>
      <p>Telefone: (___) _____-_____</p>
      <p>E-mail: _______________________________</p>
      
      <h3>Dados Bancários</h3>
      <p>Banco: _______________</p>
      <p>Agência: ________</p>
      <p>Conta Corrente: ______________</p>
      
      <h3>Dependentes</h3>
      <p>Nome: _______________________________ Parentesco: _________ Data de Nasc.: ___/___/______</p>
      <p>Nome: _______________________________ Parentesco: _________ Data de Nasc.: ___/___/______</p>
      
      <h3>Documentos Necessários</h3>
      <p>- Cópia do RG e CPF</p>
      <p>- Cópia do Título de Eleitor</p>
      <p>- Cópia da Carteira de Trabalho (páginas com foto e número)</p>
      <p>- Comprovante de Residência</p>
      <p>- 1 foto 3x4</p>
      <p>- Cópia da Certidão de Nascimento dos dependentes (se houver)</p>
    `,
  },
  // Adicionando novos documentos para a categoria "Funcionários"
  "22": {
    title: "Contrato de Trabalho",
    category: "Funcionários",
    categoryId: "funcionarios",
    subcategoryId: "joao-silva",
    updated: "15/03/2023",
    author: "Departamento de RH",
    content: `
      <h2>Contrato de Trabalho - João Silva</h2>
      <p>Este documento representa o contrato de trabalho firmado entre a empresa e o colaborador.</p>
      
      <h3>Dados do Contrato</h3>
      <p>Data de Admissão: 15/03/2023</p>
      <p>Cargo: Analista de RH</p>
      <p>Salário: R$ 4.500,00</p>
      <p>Carga Horária: 44 horas semanais</p>
      
      <h3>Obrigações do Empregador</h3>
      <p>- Pagar pontualmente o salário acordado</p>
      <p>- Fornecer condições adequadas de trabalho</p>
      <p>- Respeitar as leis trabalhistas</p>
      
      <h3>Obrigações do Empregado</h3>
      <p>- Cumprir com zelo e dedicação suas atribuições</p>
      <p>- Seguir as normas da empresa</p>
      <p>- Manter sigilo sobre informações confidenciais</p>
    `,
  },
  "25": {
    title: "Contrato de Trabalho",
    category: "Funcionários",
    categoryId: "funcionarios",
    subcategoryId: "maria-santos",
    updated: "20/05/2022",
    author: "Departamento de RH",
    content: `
      <h2>Contrato de Trabalho - Maria Santos</h2>
      <p>Este documento representa o contrato de trabalho firmado entre a empresa e a colaboradora.</p>
      
      <h3>Dados do Contrato</h3>
      <p>Data de Admissão: 20/05/2022</p>
      <p>Cargo: Gerente de Projetos</p>
      <p>Salário: R$ 7.800,00</p>
      <p>Carga Horária: 44 horas semanais</p>
      
      <h3>Obrigações do Empregador</h3>
      <p>- Pagar pontualmente o salário acordado</p>
      <p>- Fornecer condições adequadas de trabalho</p>
      <p>- Respeitar as leis trabalhistas</p>
      
      <h3>Obrigações do Empregado</h3>
      <p>- Cumprir com zelo e dedicação suas atribuições</p>
      <p>- Seguir as normas da empresa</p>
      <p>- Manter sigilo sobre informações confidenciais</p>
    `,
  },
};

const DocumentView = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  
  // Get document information based on documentId
  const documentData = documentId && documents[documentId as keyof typeof documents];
  
  // Animation effect for document content
  useEffect(() => {
    if (!documentData) return;

    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.section-animate');
      elements.forEach(el => el.classList.add('in-view'));
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [documentData]);

  if (!documentData) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Documento não encontrado</h1>
        <Button asChild>
          <Link to="/documents">Voltar aos documentos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="gap-1"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </Button>
      
      <div className="section-animate">
        <Card className="overflow-hidden">
          <div className="bg-blue-600 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded">
                <File className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">{documentData.title}</h1>
                <div className="flex flex-wrap items-center gap-2 text-sm text-blue-100 mt-1">
                  {documentData.categoryId && (
                    <Link 
                      to={documentData.subcategoryId 
                        ? `/category/${documentData.categoryId}/${documentData.subcategoryId}` 
                        : `/category/${documentData.categoryId}`} 
                      className="hover:text-white transition-colors"
                    >
                      {documentData.category}
                    </Link>
                  )}
                  {documentData.categoryId && <span>•</span>}
                  <span>Atualizado em {documentData.updated}</span>
                  <span>•</span>
                  <span>{documentData.author}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: documentData.content }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DocumentView;
