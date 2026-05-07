import { Clock, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export function RestaurantCard({ restaurant }) {
  return (
    <Link
      to={`/restaurants/${restaurant._id}`}
      className="overflow-hidden rounded-lg bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img className="h-48 w-full object-cover" src={restaurant.image} alt={restaurant.name} />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">{restaurant.name}</h2>
            <p className="mt-1 line-clamp-1 text-sm text-ink/60">{restaurant.cuisines.join(", ")}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded bg-mint px-2 py-1 text-xs font-bold text-white">
            <Star size={13} fill="currentColor" /> {restaurant.rating}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-ink/65">
          <span className="inline-flex items-center gap-1">
            <Clock size={15} /> {restaurant.deliveryTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={15} /> {restaurant.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
