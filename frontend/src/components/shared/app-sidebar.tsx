import {
  Home,
  Siren,
  UserRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "dashboard",
    url: "/dashboard/overview",
    icon: Home,
  },
  {
    title: "Policias",
    url: "/dashboard/cops/",
    icon: Siren,
  },
  {
    title: "Personas",
    url: "/dashboard/personas",
    icon: UserRound,
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="space-y-2">
          <SidebarGroupLabel>Police SQL</SidebarGroupLabel>
          <Button className="bg-primary">
            <Link href={'/dashboard/report/new'}>
              Crear Reporte
            </Link>
          </Button>          
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Rutas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
