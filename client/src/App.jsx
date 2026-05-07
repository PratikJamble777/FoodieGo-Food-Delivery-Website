import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { useAuthStore } from "./store/authStore";
import { useCartStore } from "./store/cartStore";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  const user = useAuthStore((state) => state.user);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const clearLocal = useCartStore((state) => state.clearLocal);

  useEffect(() => {
    if (user) fetchCart();
    else clearLocal();
  }, [user, fetchCart, clearLocal]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants/:id" element={<RestaurantPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
