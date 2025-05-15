import Header from "@/components/header";
import { Outlet, useNavigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import axios from "axios";
import supabase from "@/lib/supabase";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then(({ data }) => {
      if (localStorage.getItem("ip") !== data.ip) {
        localStorage.setItem("ip", data.ip);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard");
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
