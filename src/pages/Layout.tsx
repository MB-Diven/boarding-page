import Header from "@/components/header";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://xmfozbvukwgcisiiwnkf.supabase.co",
  process.env.SUPABASE_ANON_KEY ?? "",
);

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}
