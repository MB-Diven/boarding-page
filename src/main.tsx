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
import { PostHogProvider } from "posthog-js/react";
import AppointmentsPage from "./pages/Dashboard/Appointments";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProductsPage from "./pages/Dashboard/Products";
import WorkersPage from "./pages/Dashboard/Workers";
import AnalyticsPage from "./pages/Dashboard/Analytics";
import SettingsPage from "./pages/Dashboard/Settings";
import ClientsPage from "./pages/Dashboard/Clients";

// Import i18n
import "./i18n/i18n";

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
      {
        path: "products",
        Component: ProductsPage,
      },
      {
        path: "workers",
        Component: WorkersPage,
      },
      {
        path: "analytics",
        Component: AnalyticsPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_KEY!}
      options={{
        api_host: import.meta.env.VITE_POSTHOG_HOST!,
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PostHogProvider>
  </StrictMode>,
);
