import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, IndianRupee, MapPin, Plus, Star } from "lucide-react";
import { api } from "../lib/api";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

export default function RestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function load() {
      const [{ data: restaurantData }, { data: menuData }] = await Promise.all([
        api.get(`/restaurants/${id}`),
        api.get(`/restaurants/${id}/menu`)
      ]);
      setRestaurant(restaurantData.restaurant);
      setItems(menuData.items);
    }

    load();
  }, [id]);

  const categories = useMemo(() => ["All", ...new Set(items.map((item) => item.category))], [items]);
  const visibleItems = activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);

  async function handleAdd(itemId) {
    if (!user) {
      navigate("/auth");
      return;
    }
    await addItem(itemId);
  }

  if (!restaurant) {
    return <p className="py-20 text-center text-ink/60">Loading menu...</p>;
  }

  return (
    <section>
      <div className="relative h-[320px] overflow-hidden">
        <img className="h-full w-full object-cover" src={restaurant.image} alt={restaurant.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
        <div className="absolute bottom-0 left-1/2 w-full max-w-6xl -translate-x-1/2 px-4 pb-8 text-white">
          <h1 className="text-4xl font-black sm:text-6xl">{restaurant.name}</h1>
          <p className="mt-3 max-w-2xl text-white/85">{restaurant.description}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="inline-flex items-center gap-1 rounded bg-white/15 px-3 py-2 backdrop-blur">
              <Star size={16} fill="currentColor" /> {restaurant.rating}
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-white/15 px-3 py-2 backdrop-blur">
              <Clock size={16} /> {restaurant.deliveryTime}
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-white/15 px-3 py-2 backdrop-blur">
              <MapPin size={16} /> {restaurant.location}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                activeCategory === category ? "bg-ink text-white" : "bg-white text-ink/70"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {visibleItems.map((item) => (
            <article key={item._id} className="grid gap-4 rounded-lg bg-white p-4 shadow-soft sm:grid-cols-[120px_1fr_auto]">
              <img className="h-28 w-full rounded object-cover sm:w-28" src={item.image} alt={item.name} />
              <div>
                <p className={`mb-2 text-xs font-bold ${item.isVeg ? "text-mint" : "text-tomato"}`}>
                  {item.isVeg ? "VEG" : "NON-VEG"}
                </p>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="mt-1 text-sm leading-6 text-ink/60">{item.description}</p>
                <p className="mt-2 inline-flex items-center text-base font-black">
                  <IndianRupee size={16} /> {item.price}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleAdd(item._id)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded bg-tomato px-5 font-bold text-white"
              >
                <Plus size={18} /> Add
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
