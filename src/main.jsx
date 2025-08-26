import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

// 🟢 Lazy load components (better performance)
const MainPage = lazy(() => import("./pages/MainPage.jsx"));
const Brand = lazy(() => import("./components/Brand.jsx"));
const Category = lazy(() => import("./components/Category.jsx"));
const Product = lazy(() => import("./components/Product.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const { AuthForm } = await import("./components/auth.jsx");
const AdminPanel = lazy(() => import("./pages/admin.jsx"));
const AdminOrders = lazy(() => import("./components/AdminOrders.jsx"));
const UserOrders = lazy(() => import("./components/UserOrders.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const ReturnRefundPolicy = lazy(() => import("./pages/ReturnRefundPolicy.jsx"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions.jsx"));
const { Contact } = await import("./pages/Contact.jsx");
import ProtectedRoute from "./protectedRoute/Route.jsx";

// 🟡 API URL from .env
const url = import.meta.env.VITE_API_URL || "https://showcrew-backend.onrender.com";

const handleAuth = async (formData, mode) => {
  try {
    let mappedData = formData;
    let endpoint = "";

    if (mode === "signup") {
      mappedData = {
        fullname: formData.fullName,
        email: formData.email,
        streetAddress: formData.street,
        state: formData.state,
        city: formData.city,
        number: formData.phone,
        password: formData.password,
        role: "user",
        adminId: "68a48d4bee9d2590a8c1b7e2", // replace later with env or dynamic
      };
      endpoint = "user/signup";
    } else if (mode === "signin") {
      endpoint = "user/login";
    } else if (mode === "google") {
      mappedData = { token: formData.credential };
      endpoint = "user/google-login";
    }

    const res = await fetch(`${url}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(mappedData),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    console.log("✅ Auth success:", result);

    window.location.href = endpoint === "user/signup" ? "/signin" : "/";
  } catch (err) {
    console.error("❌ Auth failed:", err.message);
    alert(err.message);
  }
};

// 🟢 Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "brand/:brand", element: <Brand /> },
      { path: "category/:brand", element: <Category brands="brand" /> },
      { path: "product/:product", element: <Product /> },
      { path: "cart", element: <Cart /> },
      {
        path: "/signup",
        element: <AuthForm mode="signup" onSubmit={handleAuth} />,
      },
      {
        path: "/signin",
        element: <AuthForm mode="signin" onSubmit={handleAuth} />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/order",
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <AdminOrders />
          </ProtectedRoute>
        ),
      },
      { path: "/user/order", element: <UserOrders /> },
      { path: "/PrivacyPolicy", element: <PrivacyPolicy /> },
      { path: "/ReturnRefundPolicy", element: <ReturnRefundPolicy /> },
      { path: "/ShippingPolicy", element: <ShippingPolicy /> },
      { path: "/TermsAndConditions", element: <TermsAndConditions /> },
      { path: "/Contact", element: <Contact /> },
    ],
  },
]);

// 🟡 Suspense wrapper for lazy-loaded routes
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
