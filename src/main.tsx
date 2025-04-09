import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import LandingPage from "@/pages/Landing";
import OnboardForm from "@/pages/OnboardForm";
import Layout from "./pages/Layout";
import SetPasswordPage from "./pages/SetPassword";
import LoginPage from "./pages/Login";

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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
