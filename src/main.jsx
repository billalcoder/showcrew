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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "brand/:brand", element: <Brand/> },
      { path: "category/:brand", element: <Category brands={"brand"}/> },
      { path: "product/:product", element: <Product/> },
      { path: "cart", element: <Cart/> },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
