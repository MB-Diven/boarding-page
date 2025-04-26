import { Outlet, useNavigate } from "react-router";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Calendar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Store,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

import divenLogo from "../../assets/logo_big.svg";
import divenLogoSmall from "../../assets/logo_small.svg";
import { supabase } from "@/main";

export default function DashboardLayout() {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Clients",
      href: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Workers",
      href: "/dashboard/workers",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Appointments",
      href: "/dashboard/appointments",
      icon: Calendar,
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  useEffect(() => {
    supabase.auth
      .getUser()
      .then((response) => {
        if (response.error) {
          console.error("Error fetching user:", response.error);
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return (
    <SidebarProvider defaultOpen={!isCollapsed} onOpenChange={setIsCollapsed}>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <a
            href="/dashboard"
            className="hidden overflow-hidden md:flex items-center max-h-[50px] max-w-[125px] space-x-2"
          >
            <img
              width={500}
              height={200}
              className="object-cover w-[550px] h-[200px]"
              src={divenLogo}
              alt="Diven logo"
            />
          </a>
          <a
            href="/dashboard"
            className="flex overflow-hidden md:hidden max-w-[50px] object-cover max-h-[50px] items-center space-x-2"
          >
            <img
              width={125}
              height={125}
              src={divenLogoSmall}
              alt="Diven logo"
              className="object-cover w-[125px] h-[125px]"
            />
          </a>
          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-0" asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <span className="sr-only">Open user menu</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    JD
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-2">
                <Store className="h-6 w-6" />
                <span className="text-lg font-semibold">Elegance Salon</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {routes.map((route) => (
                  <SidebarMenuItem key={route.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === route.href}
                      tooltip={isCollapsed ? route.title : undefined}
                    >
                      <a href={route.href}>
                        <route.icon className="h-5 w-5" />
                        <span>{route.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <div className="px-3 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="#"
                    onClick={() => {
                      supabase.auth.signOut().then(() => {
                        navigate("/");
                      });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Back to Website</span>
                  </a>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
