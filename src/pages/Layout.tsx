import Header from "@/components/header";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}
