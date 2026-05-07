import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, ShoppingBag, UserRound } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const count = useCartStore((state) => state.count);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-[#faf7f2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-black tracking-tight text-tomato">
          FoodieGo
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <NavLink to="/" className="hidden text-sm font-semibold text-ink/75 hover:text-ink sm:block">
            Restaurants
          </NavLink>
          {user && (
            <NavLink to="/orders" className="hidden text-sm font-semibold text-ink/75 hover:text-ink sm:block">
              Orders
            </NavLink>
          )}
          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft"
            aria-label="Cart"
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-mint px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <Link
              to="/auth"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white"
              aria-label="Login"
              title="Login"
            >
              <UserRound size={18} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
