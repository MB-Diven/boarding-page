import Header from "@/components/header";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import axios from "axios";

export const supabase = createClient(
  "https://xmfozbvukwgcisiiwnkf.supabase.co",
  process.env.SUPABASE_ANON_KEY ?? "",
);

export default function Layout() {
  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then(({ data }) => {
      if (localStorage.getItem("ip") !== data.ip) {
        localStorage.setItem("ip", data.ip);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}
