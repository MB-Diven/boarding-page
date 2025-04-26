import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import LandingPage from "@/pages/Landing";
import OnboardForm from "@/pages/OnboardForm";
import Layout from "./pages/Layout";
import SetPasswordPage from "./pages/SetPassword";
import LoginPage from "./pages/Login";
import DashboardLayout from "./pages/Dashboard/Layout";
import DashboardPage from "./pages/Dashboard/Dashboard";
import { createClient } from "@supabase/supabase-js";
import { PostHogProvider } from "posthog-js/react";
import ClientsPage from "./pages/Dashboard/Clients";
import AppointmentsPage from "./pages/Dashboard/Appointments";
import { Provider } from "react-redux";
import { store } from "./store/store";

export const supabase = createClient(
  "https://xmfozbvukwgcisiiwnkf.supabase.co",
  process.env.SUPABASE_ANON_KEY ?? "",
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      {
        path: "onboard",
        Component: OnboardForm,
      },
      {
        path: "set-password",
        Component: SetPasswordPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "clients",
        Component: ClientsPage,
      },
      {
        path: "appointments",
        Component: AppointmentsPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY!}
      options={{
        api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST!,
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PostHogProvider>
  </StrictMode>,
);
