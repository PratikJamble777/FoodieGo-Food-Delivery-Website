import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";
import { api } from "../lib/api";

const statusLabels = {
  placed: "Placed",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled"
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get("/orders/my-orders");
      setOrders(data.orders);
      setLoading(false);
    }

    loadOrders();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-black">My orders</h1>
      {loading ? (
        <p className="text-ink/60">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-ink/60 shadow-soft">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order._id} className="rounded-lg bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black">{order.restaurant?.name}</h2>
                  <p className="mt-1 text-sm text-ink/60">
                    {new Date(order.createdAt).toLocaleString()} • {statusLabels[order.orderStatus]}
                  </p>
                </div>
                <strong className="inline-flex items-center text-lg">
                  <IndianRupee size={17} /> {order.totalAmount}
                </strong>
              </div>
              <div className="mt-4 grid gap-3">
                {order.items.map((item) => (
                  <div key={item.menuItem} className="flex items-center justify-between gap-3 text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
