import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import './index.css'
import App from './App.jsx'
import MainPage from './pages/MainPage.jsx';
import Brand from './components/Brand.jsx';
import Category from './components/Category.jsx';
import Product from './components/Product.jsx';
import Cart from './components/Cart.jsx';
import { AuthForm } from './components/auth.jsx';
import AdminPanel from './pages/admin.jsx';
import AdminOrders from './components/AdminOrders.jsx';
import UserOrders from './components/UserOrders.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import ReturnRefundPolicy from './pages/ReturnRefundPolicy.jsx';
import ShippingPolicy from './pages/ShippingPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import { Contact } from './pages/Contact.jsx';
import ProtectedRoute from './protectedRoute/Route.jsx';

  const url = "https://showcrew-backend.onrender.com"

const handleAuth = async (formData, mode) => {
  try {
    let mappedData = formData;
    let endpoint = "";

    if (mode === "signup") {
      // 🟢 Signup
      mappedData = {
        fullname: formData.fullName,
        email: formData.email,
        streetAddress: formData.street,
        state: formData.state,
        city: formData.city,
        number: formData.phone,
        password: formData.password,
        role: "user",
        adminId: "68a48d4bee9d2590a8c1b7e2" // 🔑 replace with your real adminId
      };
      endpoint = "user/signup";
    }
    else if (mode === "signin") {
      // 🟡 Normal Login
      endpoint = "user/login";
    }
    else if (mode === "google") {
      // 🔵 Google login
      mappedData = { token: formData.credential }; // Google JWT
      endpoint = "user/google-login";
    }

    const res = await fetch(`${url}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // cookie-based session
      body: JSON.stringify(mappedData),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    console.log("✅ Auth success:", result);
    if (endpoint === "user/signup") {
      window.location.href = "/signin"; // redirect to home/dashboard
    } else {
      window.location.href = "/"; // redirect to home/dashboard
    }

  } catch (err) {
    console.error("❌ Auth failed:", err.message);
    alert(err.message);
  }
};



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "brand/:brand", element: <Brand /> },
      { path: "category/:brand", element: <Category brands={"brand"} /> },
      { path: "product/:product", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "/signup", element: <AuthForm mode="signup" onSubmit={handleAuth} /> },
      { path: "/signin", element: <AuthForm mode="signin" onSubmit={handleAuth} /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <AdminPanel />
          </ProtectedRoute>
        )
      },
      {
        path: "/admin/order",
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <AdminOrders />
          </ProtectedRoute>
        )
      },
      { path: "/user/order", element: <UserOrders /> },
      { path: "/PrivacyPolicy", element: <PrivacyPolicy /> },
      { path: "/ReturnRefundPolicy", element: <ReturnRefundPolicy /> },
      { path: "/ShippingPolicy", element: <ShippingPolicy /> },
      { path: "/TermsAndConditions", element: <TermsAndConditions /> },
      { path: "/Contact", element: <Contact /> },
    ]
  }
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
