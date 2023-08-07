import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Home from "./pages/Home.jsx";
import NewProducts from "./pages/NewProducts.jsx";
import Cart from "./pages/Cart.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Products from "./pages/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SortOptionContextProvider } from "./context/SortOptionContext.jsx";
import { MenuContextProvider } from "./context/MenuContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      {
        path: "/products/:type",
        element: <Products />,
      },
      {
        path: "/detail/:productId",
        element: <ProductDetail />,
      },

      {
        path: "/products/new",
        element: (
          <ProtectedRoute requireAdmin>
            <NewProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <MenuContextProvider>
    <SortOptionContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </SortOptionContextProvider>
  </MenuContextProvider>
);
