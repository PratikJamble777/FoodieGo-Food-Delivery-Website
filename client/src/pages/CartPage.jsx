import { useState } from "react";
import { IndianRupee, Minus, Plus, Trash2 } from "lucide-react";
import { api } from "../lib/api";
import { useCartStore } from "../store/cartStore";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, total, updateItem, removeItem, fetchCart } = useCartStore();
  const [address, setAddress] = useState({ line1: "", city: "", phone: "" });
  const [message, setMessage] = useState("");
  const [placing, setPlacing] = useState(false);

  function updateAddress(event) {
    setAddress((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function placeOrder(event) {
    event.preventDefault();
    setPlacing(true);
    setMessage("");
    try {
      await api.post("/orders", { address });
      await fetchCart();
      navigate("/orders");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  }

  if (!cart.items?.length) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black">Your cart is empty</h1>
        <p className="mt-3 text-ink/60">Add dishes from a restaurant menu to start an order.</p>
        <Link className="mt-6 inline-flex rounded bg-tomato px-5 py-3 font-bold text-white" to="/">
          Browse restaurants
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="mb-5 text-3xl font-black">Your cart</h1>
        <div className="space-y-4">
          {cart.items.map((entry) => {
            const item = entry.menuItem;
            return (
              <article key={item._id} className="grid gap-4 rounded-lg bg-white p-4 shadow-soft sm:grid-cols-[96px_1fr_auto]">
                <img className="h-24 w-full rounded object-cover sm:w-24" src={item.image} alt={item.name} />
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="mt-1 text-sm text-ink/60">{cart.restaurant?.name}</p>
                  <p className="mt-2 inline-flex items-center font-black">
                    <IndianRupee size={15} /> {item.price}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => updateItem(item._id, entry.quantity - 1)}
                    className="grid h-9 w-9 place-items-center rounded bg-[#f1ede6]"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="grid h-9 w-10 place-items-center rounded border border-black/10 font-bold">
                    {entry.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateItem(item._id, entry.quantity + 1)}
                    className="grid h-9 w-9 place-items-center rounded bg-[#f1ede6]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item._id)}
                    className="grid h-9 w-9 place-items-center rounded bg-red-50 text-red-600"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <form onSubmit={placeOrder} className="h-fit rounded-lg bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">Delivery details</h2>
        <div className="mt-4 space-y-3">
          <input
            name="line1"
            value={address.line1}
            onChange={updateAddress}
            className="h-12 w-full rounded border border-black/10 px-4 outline-none"
            placeholder="Full address"
            required
          />
          <input
            name="city"
            value={address.city}
            onChange={updateAddress}
            className="h-12 w-full rounded border border-black/10 px-4 outline-none"
            placeholder="City"
            required
          />
          <input
            name="phone"
            value={address.phone}
            onChange={updateAddress}
            className="h-12 w-full rounded border border-black/10 px-4 outline-none"
            placeholder="Phone number"
            required
          />
        </div>

        <div className="my-5 space-y-3 border-y border-black/10 py-5 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <strong>₹{subtotal}</strong>
          </div>
          <div className="flex justify-between">
            <span>Delivery fee</span>
            <strong>₹{deliveryFee}</strong>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-black">Total</span>
            <strong>₹{total}</strong>
          </div>
        </div>

        <p className="mb-4 rounded bg-[#f1ede6] px-4 py-3 text-sm font-semibold">Payment method: Cash on delivery</p>
        {message && <p className="mb-4 rounded bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{message}</p>}
        <button type="submit" disabled={placing} className="h-12 w-full rounded bg-mint font-black text-white">
          {placing ? "Placing order..." : "Place order"}
        </button>
      </form>
    </section>
  );
}
