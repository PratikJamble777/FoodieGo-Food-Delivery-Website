import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { api } from "../lib/api";
import { RestaurantCard } from "../components/RestaurantCard";

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRestaurants() {
      setLoading(true);
      const { data } = await api.get("/restaurants", {
        params: search ? { search } : {}
      });
      setRestaurants(data.restaurants);
      setLoading(false);
    }

    const timer = setTimeout(loadRestaurants, 250);
    return () => clearTimeout(timer);
  }, [search]);

  const cuisines = useMemo(
    () => [...new Set(restaurants.flatMap((restaurant) => restaurant.cuisines))].slice(0, 8),
    [restaurants]
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <div className="grid gap-6 py-8 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-mint">Fresh meals near you</p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-6xl">
            Order food from your favorite local restaurants.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink/65">
            Browse menus, add dishes to your cart, and place a cash-on-delivery order in a few clicks.
          </p>
        </div>
        <img
          className="h-72 w-full rounded-lg object-cover shadow-soft"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
          alt="Assorted restaurant dishes"
        />
      </div>

      <div className="mb-6 rounded-lg bg-white p-3 shadow-soft">
        <label className="flex items-center gap-3">
          <Search className="text-ink/45" size={20} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-11 w-full bg-transparent outline-none"
            placeholder="Search restaurants, cuisine, or location"
          />
        </label>
      </div>

      {cuisines.length > 0 && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              onClick={() => setSearch(cuisine)}
              className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink/75"
            >
              {cuisine}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="py-10 text-center text-ink/60">Loading restaurants...</p>
      ) : restaurants.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow-soft">
          <h2 className="text-2xl font-black">No restaurants found</h2>
          <p className="mt-2 text-ink/60">Try searching for Pune, Kothrud, Hinjewadi, pizza, biryani, or cafe.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
}
