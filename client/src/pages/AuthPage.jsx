import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuthStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const success = mode === "login" ? await login(form) : await register(form);
    if (success) navigate("/");
  }

  return (
    <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-mint">Welcome back</p>
        <h1 className="text-4xl font-black leading-tight sm:text-5xl">Sign in to order from restaurants near you.</h1>
        <p className="mt-4 max-w-xl leading-7 text-ink/65">
          Your account keeps your cart, orders, and delivery details together.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg bg-white p-5 shadow-soft sm:p-8">
        <div className="mb-6 grid grid-cols-2 rounded bg-[#f1ede6] p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded px-4 py-3 font-bold ${mode === "login" ? "bg-white shadow" : "text-ink/55"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`rounded px-4 py-3 font-bold ${mode === "register" ? "bg-white shadow" : "text-ink/55"}`}
          >
            Signup
          </button>
        </div>

        {mode === "register" && (
          <label className="mb-4 flex items-center gap-3 rounded border border-black/10 px-4">
            <User size={18} className="text-ink/45" />
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              className="h-12 w-full outline-none"
              placeholder="Full name"
              required
            />
          </label>
        )}

        <label className="mb-4 flex items-center gap-3 rounded border border-black/10 px-4">
          <Mail size={18} className="text-ink/45" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            className="h-12 w-full outline-none"
            placeholder="Email address"
            required
          />
        </label>

        <label className="mb-4 flex items-center gap-3 rounded border border-black/10 px-4">
          <Lock size={18} className="text-ink/45" />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={updateField}
            className="h-12 w-full outline-none"
            placeholder="Password"
            minLength={6}
            required
          />
        </label>

        {error && <p className="mb-4 rounded bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

        <button type="submit" className="h-12 w-full rounded bg-tomato font-black text-white" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </section>
  );
}
