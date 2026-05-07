import { create } from "zustand";
import { api } from "../lib/api";

function calculateCart(cart) {
  const items = cart?.items || [];
  const subtotal = items.reduce((sum, entry) => {
    const item = entry.menuItem;
    return sum + (item?.price || 0) * entry.quantity;
  }, 0);

  return {
    cart: cart || { items: [] },
    subtotal,
    deliveryFee: cart?.restaurant?.deliveryFee || 0,
    total: subtotal + (cart?.restaurant?.deliveryFee || 0),
    count: items.reduce((sum, entry) => sum + entry.quantity, 0)
  };
}

export const useCartStore = create((set) => ({
  cart: { items: [] },
  subtotal: 0,
  deliveryFee: 0,
  total: 0,
  count: 0,
  loading: false,
  async fetchCart() {
    set({ loading: true });
    try {
      const { data } = await api.get("/cart");
      set({ ...calculateCart(data.cart), loading: false });
    } catch {
      set({ loading: false });
    }
  },
  async addItem(menuItemId) {
    const { data } = await api.post("/cart/items", { menuItemId, quantity: 1 });
    set(calculateCart(data.cart));
  },
  async updateItem(menuItemId, quantity) {
    const { data } = await api.patch(`/cart/items/${menuItemId}`, { quantity });
    set(calculateCart(data.cart));
  },
  async removeItem(menuItemId) {
    const { data } = await api.delete(`/cart/items/${menuItemId}`);
    set(calculateCart(data.cart));
  },
  clearLocal() {
    set(calculateCart({ items: [] }));
  }
}));
