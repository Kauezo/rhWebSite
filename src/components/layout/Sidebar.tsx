
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Folder, File, ScrollText, Layout, Search, Users } from "lucide-react";

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

// Main navigation items
const mainItems: NavigationItem[] = [
  { title: "Início", url: "/", icon: Layout },
  { title: "Funcionários", url: "/category/funcionarios", icon: Users },
  { title: "Todos Documentos", url: "/documents", icon: ScrollText },
  { title: "Pesquisa", url: "/documents", icon: Search },
];

// Document categories - "Funcionários" moved to main navigation
const categories: NavigationItem[] = [
  { title: "Admissão", url: "/category/admissao", icon: Folder },
  { title: "Benefícios", url: "/category/beneficios", icon: Folder },
  { title: "Férias", url: "/category/ferias", icon: Folder },
  { title: "Folha de Pagamento", url: "/category/folha-pagamento", icon: Folder },
  { title: "Treinamentos", url: "/category/treinamentos", icon: Folder },
];

// Recent documents (example)
const recentDocs: NavigationItem[] = [
  { title: "Política de Férias", url: "/document/1", icon: File },
  { title: "Manual do Colaborador", url: "/document/2", icon: File },
  { title: "Formulário de Admissão", url: "/document/3", icon: File },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarComponent>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url || 
                      (item.url !== "/" && location.pathname.startsWith(item.url))}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categorias</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === category.url || location.pathname.startsWith(`${category.url}/`)}
                  >
                    <NavLink to={category.url} className="flex items-center gap-3">
                      <category.icon className="h-5 w-5" />
                      <span>{category.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Documentos Recentes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentDocs.map((doc) => (
                <SidebarMenuItem key={doc.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === doc.url}
                  >
                    <NavLink to={doc.url} className="flex items-center gap-3">
                      <doc.icon className="h-5 w-5" />
                      <span className="truncate">{doc.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
