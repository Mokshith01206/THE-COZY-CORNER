// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ProfilePic from "./components/ProfilePic";
import { fetchOrders, createOrder } from "./apiFirebase";

/* ---------- BOOKS ---------- */
const BOOKS = [
  { id: 1, title: "Naruto Vol.1 - 18+age", author: "Masashi Kishimoto", price: 10, img: "https://imgs.search.brave.com/pQ4wqj7fP05St_ZgVj2qaa4ijzqTIiuWHS7__105RrQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/OS85NC9OYXJ1dG9D/b3ZlclRhbmtvYm9u/MS5qcGcvNTEycHgt/TmFydXRvQ292ZXJU/YW5rb2JvbjEuanBn", summary: "Ninja action, friendship, and the journey of Naruto.", category: "Manga" },
  { id: 2, title: "One Piece Vol.1 6+age", author: "Eiichiro Oda", price: 12, img: "https://imgs.search.brave.com/O8oTKisVqK9PUJGC7vnu8OHgb5WUgov0PO7_FJgUWeU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vOS85MC9P/bmVfUGllY2UlMkNf/Vm9sdW1lXzYxX0Nv/dmVyXyUyOEphcGFu/ZXNlJTI5LmpwZw", summary: "Luffy sets sail to find the legendary One Piece treasure.", category: "Manga" },
  { id: 3, title: "Dragon Ball Vol.1 4+age", author: "Akira Toriyama", price: 11, img: "https://imgs.search.brave.com/SH1dvKg2fp-uctu0dbkz9dFAo7vKpzo122TyT3whFY8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi83LzdkL0Ry/YWdvbl9CYWxsX21h/bmdhXzFzdF9KYXBh/bmVzZV9lZGl0aW9u/X2xvZ28uc3ZnLzI1/MHB4LURyYWdvbl9C/YWxsX21hbmdhXzFz/dF9KYXBhbmVzZV9l/ZGl0aW9uX2xvZ28u/c3ZnLnBuZw", summary: "Goku's early adventures with Dragon Balls.", category: "Manga" },
  { id: 4, title: "Demon Slayer Vol.1 6+age", author: "Koyoharu Gotouge", price: 14, img: "https://imgs.search.brave.com/p2awJXB_JpEK7Wqq5_H51cwHUbcaiFoA5TK5OrdHGGc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/YS9hZS9LaW1ldHN1/X05vX1lhaWJhX011/Z2VuX0p5by1oZW5f/dGhlYXRyaWNhbF9w/b3N0ZXIuanBnLzUx/MnB4LUtpbWV0c3Vf/Tm9fWWFpYmFfTXVn/ZW5fSnlvLWhlbl90/aGVhdHJpY2FsX3Bv/c3Rlci5qcGc", summary: "Dark fantasy about Tanjiro's quest.", category: "Manga" },
  { id: 5, title: "Jujutsu Kaisen Vol.1 18+age", author: "Gege Akutami", price: 13, img: "https://imgs.search.brave.com/DbiR9g_zvX0h2WhjBLGR9XQAtdBTlj69993sunF-zpM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/NC80Ni9KdWp1dHN1/X2thaXNlbi5qcGcv/NTEycHgtSnVqdXRz/dV9rYWlzZW4uanBn", summary: "Curses, sorcery and high-energy fights.", category: "Manga" },
  { id: 6, title: "Chainsaw Man Vol.1 18+age", author: "Tatsuki Fujimoto", price: 15, img: "https://imgs.search.brave.com/zbBBPLlw5YPj32c1cPkxybP37iVQRjSkV-H9Uc5H9p8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Mi8yNC9DaGFpbnNh/d21hbi5qcGcvNTEy/cHgtQ2hhaW5zYXdt/YW4uanBn", summary: "A dark, wild, and surprising action-horror manga.", category: "Manga" },
  { id: 7, title: "Blue Lock Vol.1 6+age", author: "Muneyuki Kaneshiro", price: 12, img: "https://imgs.search.brave.com/Rhdjg4Q72RShFqf9diAOYjU-mDTzX1NW5du02K0eT8A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vYy9jNi9C/bHVlX0xvY2tfbWFu/Z2Ffdm9sdW1lXzEu/cG5n", summary: "Competitive soccer training and drama.", category: "Manga" },
  { id: 8, title: "Black Clover Vol.1 11+age", author: "Yūki Tabata", price: 10, img: "https://imgs.search.brave.com/PhL9oi8KqTzljzYzXnKWqBgTxBgF-Qsne7qWmnHL3lI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vNi82OS9C/bGFja19DbG92ZXIl/MkNfdm9sdW1lXzEu/anBn", summary: "Magic knights in a high-energy fantasy.", category: "Manga" },
  { id: 9, title: "Spider-Man: Homecoming Comic", author: "Marvel Comics", price: 15, img: "https://imgs.search.brave.com/AivxDuQoDjamXbAS1o0TpJXyonPa0-zjk99xJOujW1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vZi9mOS9T/cGlkZXItTWFuX0hv/bWVjb21pbmdfcG9z/dGVrLmpwZw", summary: "Classic Marvel action.", category: "Comic" },
  { id: 10, title: "Iron Man: Extremis", author: "Warren Ellis", price: 16, img: "https://imgs.search.brave.com/TcQ4eQJW82Eua1zZegJhUODQoA6vh2AeD83vwnA3SB8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Ny83Yy9Jcm9uX01h/bl9FeHRyZW1pcy5q/cGcvNTEycHgtSXJv/bl9NYW5fRXh0cmVt/aXMuanBn", summary: "A high-tech, intense arc of Tony Stark.", category: "Comic" },
  { id: 11, title: "The Avengers: Assemble", author: "Stan Lee", price: 18, img: "https://imgs.search.brave.com/_BeKlcnT1IRkfZr01Be4q4qMHWTy5D9_KUhk9kYbiFM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vNi82My9B/dmVuZ2Vyc19Bc3Nl/bWJsZV9UVl9zZXJp/ZXMuanBn", summary: "Team-up of Earth's mightiest heroes!", category: "Comic" },
  { id: 12, title: "Captain America: Winter Soldier", author: "Ed Brubaker", price: 17, img: "https://imgs.search.brave.com/RfTMq2XP_Auct1IjxfOlFmqyr8-QHC4vMSOMAggPH6M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzRiL0Nh/cHRhaW5fQW1lcmlj/YV9UaGVfV2ludGVy/X1NvbGRpZXJfbG9n/by5zdmcvMjUwcHgt/Q2FwdGFpbl9BbWVy/aWNhX1RoZV9XaW50/ZXJfU29sZGllcl9s/b2dvLnN2Zy5wbmc", summary: "Espionage and action with Steve Rogers.", category: "Comic" },
  { id: 13, title: "Thor: God of Thunder", author: "Jason Aaron", price: 16, img: "https://imgs.search.brave.com/2LqXxtwbPvlTcVe2qqweJtISXD0i0uxtcBC5owCceOE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzQxNi80MTYveGlm/MHEvYm9vay93L2Qv/ci90aG9yLWdvZC1v/Zi10aHVuZGVyLXZv/bHVtZS0xLXRoZS1n/b2QtYnV0Y2hlci1t/YXJ2ZWwtbm93LW9y/aWdpbmFsLWltYWd5/aHhzZTVoY3BmcGYu/anBlZz9xPTcwJmNy/b3A9ZmFsc2U", summary: "Epic Asgardian tale.", category: "Comic" },
  { id: 14, title: "Encyclopedia of Space", author: "DK Publishing", price: 20, img: "https://imgs.search.brave.com/mCV16njXGQcy4pshMCLgsK5WmVrvCB7yMKfz1ZEJKm0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ib29r/c2FuZHlvdS5pbi9j/ZG4vc2hvcC9maWxl/cy9Lbm93bGVkZ2Vl/bnN5Y2xvcGVkaWFz/cGFjZV8yLmpwZz92/PTE2OTk0MzE5NDkm/d2lkdGg9MTQ0NQ", summary: "Beautifully illustrated guides to the cosmos.", category: "Encyclopedia" },
  { id: 15, title: "The Animal Encyclopedia", author: "David Alderton", price: 22, img: "https://imgs.search.brave.com/oIacuXB8XwXgLXHseavPOVUpEbs_X2U2hUsAH7fnwcU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFkS1RycGZ3NEwu/anBn", summary: "Animals, habitats and more.", category: "Encyclopedia" },
  { id: 16, title: "Encyclopedia of World History", author: "Peter N. Stearns", price: 24, img: "https://imgs.search.brave.com/7uMKTajCmRL_UKzLnX65pvIQ0tfZ4IefoYm8o219cmY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTE3cEI4VkIwOUwu/anBn", summary: "Comprehensive global history.", category: "Encyclopedia" },
  { id: 17, title: "The Ocean Encyclopedia", author: "Fabien Cousteau", price: 23, img: "https://imgs.search.brave.com/xLokU6FSzob1VEjrj8aG4569u5QN6zjU_TpVLhtd0eU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/ZGUxNDczM2Q0MWM5/YjU3OGJiOWJkNjUv/NjJhNTM2ZjcyMWFj/ZWY2MWI3MmQwMzNl/XzYwZGNhNzAxYzMy/MmNmZDcxNDY5ZjQ1/Yl91c2Jvcm5lLWJv/b2tzLWZpcnN0LWVu/Y3ljbG9wZWRpYS1v/Zi1zZWFzLW9jZWFu/cy5qcGVn", summary: "Ocean worlds and exploration.", category: "Encyclopedia" },
  { id: 18, title: "Human Body Encyclopedia", author: "Richard Walker", price: 21, img: "https://imgs.search.brave.com/74tngth88_MGYvQHfKprd8x0SHZJzfLNIAYQ2KXDihQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vZGstaHViL2lt/YWdlL3VwbG9hZC9j/X2xpbWl0LGZfYXV0/byx3XzU4MCxoXzY1/MC9kay1jb3JlLW5v/bnByb2QvOTc4MTQ2/NTQ0MzQ4OS85Nzgx/NDY1NDQzNDg5X2Nv/dmVyLmpwZw", summary: "Human anatomy explained.", category: "Encyclopedia" }
];



const toINR = (usd) => {
  const inr = Math.round(usd * 82);
  return inr.toLocaleString("en-IN", { style: "currency", currency: "INR" });
};

/* If you moved logo to public/logo.png, change this to "/logo.png" */
const logoUrl = "/mnt/data/--a-bold--impactful-typographic-logo-for--the-cozy.png";

export default function App() {
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState({}); // { username: [items...] }
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const canvasRef = useRef(null);
  const chatContainerRef = useRef(null);

  /* ---------- Milky Way canvas ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const stars = [];
    const nebula = [];

    function init() {
      stars.length = 0;
      nebula.length = 0;
      const sc = Math.max(120, Math.floor((w * h) / 60000));
      for (let i = 0; i < sc; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.2,
          v: 0.2 + Math.random() * 0.7,
          hue: 200 + Math.random() * 80,
          a: 0.2 + Math.random() * 0.85
        });
      }
      for (let i = 0; i < 6; i++) {
        nebula.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.7,
          r: Math.max(w, h) * (0.12 + Math.random() * 0.22),
          hue: 210 + Math.random() * 40,
          a: 0.06 + Math.random() * 0.12
        });
      }
    }
    init();

    let raf = null;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#03040a");
      g.addColorStop(0.5, "#041021");
      g.addColorStop(1, "#03030a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      nebula.forEach((n, idx) => {
        const r = n.r;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        grad.addColorStop(0, `hsla(${n.hue},60%,60%,${n.a * 1.2})`);
        grad.addColorStop(0.5, `hsla(${n.hue + 20},60%,30%,${n.a})`);
        grad.addColorStop(1, `rgba(2,6,10,0)`);
        ctx.globalCompositeOperation = idx % 2 === 0 ? "lighter" : "overlay";
        ctx.fillStyle = grad;
        ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2);
      });
      ctx.globalCompositeOperation = "lighter";

      stars.forEach((s) => {
        s.x += s.v * 0.25;
        if (s.x > w + 2) s.x = -2;
        const alpha = 0.5 + Math.sin(Date.now() / 1000 + s.r) * 0.5 * s.a;
        ctx.fillStyle = `hsla(${s.hue},80%,60%,${Math.max(0.12, alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }
    frame();

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    }
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ---------- auth & cart ---------- */
  const login = (u, p) => {
    if (!u || !p) {
      alert("Enter username & password or Quick Guest");
      return;
    }

    setUsername(u);
    setPassword(p);

    // Load Firestore data for real users
    if (u !== "GuestUser") {
      (async () => {
        try {
          const userOrders = await fetchOrders(u);
          setOrders((prev) => ({ ...prev, [u]: userOrders || [] }));
        } catch (err) {
          console.error("Firestore load error:", err);
        }
      })();
    }

    setTimeout(() => setPage("home"), 300);
  };

  const quickGuest = () => login("GuestUser", "guest");

  const logout = () => {
    // clear guest orders so each guest session is fresh
    setOrders((prev) => {
      if (!username || username !== "GuestUser") return prev;
      const copy = { ...(prev || {}) };
      delete copy["GuestUser"];
      return copy;
    });

    setUsername("");
    setPassword("");
    setCart([]);
    setPage("login");
    setSelected(null);
  };

  const addToCart = (book) => {
    setCart((c) => [...c, book]);
    flashToast("Added to cart");
  };
  const removeFromCart = (idx) => setCart((c) => c.filter((_, i) => i !== idx));

  // ✅ Updated: never block UI even if Firestore fails
  const checkout = async () => {
    if (!username) {
      alert("Please login or use Quick Guest");
      return;
    }
    if (cart.length === 0) {
      alert("Cart empty");
      return;
    }

    try {
      if (username !== "GuestUser") {
        // Try to save to Firestore (non-guest only)
        await createOrder(username, cart);
      }
    } catch (err) {
      console.error("Checkout Firestore error:", err);
      // You can show a soft warning if you want:
      // flashToast("Backend issue, order saved only locally");
    }

    // Always update UI + go to profile
    setOrders((prev) => ({
      ...(prev || {}),
      [username]: [...(prev[username] || []), ...cart],
    }));

    setCart([]);
    flashToast("Order placed — delivery within 72 hours");
    setPage("profile");
  };

  const flashToast = (msg, t = 2200) => {
    setToast(msg);
    setTimeout(() => setToast(""), t);
  };

 /* ---------- chatbot (REAL AI + streaming) ---------- */

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const HF_MODEL = "HuggingFaceH4/zephyr-7b-beta";

 /* ---------- CHATBOT (SAFE + FREE + STABLE) ---------- */

// state
const [aiBusy, setAiBusy] = useState(false);

// Hugging Face call (safe)
async function callHF(prompt) {
  try {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are CozyBot, a friendly bookstore assistant.
Answer clearly and shortly.

User: ${prompt}
Bot:`,
        }),
      }
    );

    if (!res.ok) throw new Error("busy");

    const data = await res.json();
    return data?.[0]?.generated_text || "Hmm… I’m thinking 🤔";
  } catch (err) {
    return "🤖 CozyBot is waking up… please try again in a few seconds.";
  }
}

// typewriter animation
function streamBotReply(fullText) {
  const id = `bot-${Date.now()}`;
  setChatLog((c) => [...c, { who: "CozyBot", text: "", id }]);

  let i = 0;
  const step = () => {
    i++;
    setChatLog((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, text: fullText.slice(0, i) } : m
      )
    );
    if (i < fullText.length) {
      setTimeout(step, 10 + Math.random() * 20);
    } else {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };
  step();
}

// main send function
const sendChat = async (text) => {
  if (!text || !text.trim()) return;

  // user message
  setChatLog((c) => [...c, { who: username || "Guest", text }]);

  // prevent spam
  if (aiBusy) {
    streamBotReply("⏳ CozyBot is thinking… please wait.");
    return;
  }

  setAiBusy(true);

  // thinking indicator
  streamBotReply("…");

  const reply = await callHF(text);

  streamBotReply(reply);
  setAiBusy(false);
};

// auto-scroll
useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop =
      chatContainerRef.current.scrollHeight;
  }
}, [chatLog]);

/* ---------- END CHATBOT ---------- */


  /* ---------- UI components ---------- */

  function Header() {
    return (
      <header className="topbar" style={{ position: "sticky", top: 0, zIndex: 60 }}>
        <div className="container top-inner">
          <div className="brand">
            <img
              src={logoUrl}
              alt="Cozy Logo"
              className="logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo.png";
              }}
            />
            <div className="brand-name">The Cozy Corner</div>
          </div>

          <nav className="nav">
            {page !== "login" && (
              <>
                <button onClick={() => setPage("home")}>Home</button>
                <button onClick={() => setPage("shop")}>Shop</button>
                <button onClick={() => setPage("profile")}>Profile</button>
                <button onClick={() => setPage("about")}>About</button>
                <button onClick={() => setPage("contact")}>Contact</button>
              </>
            )}
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              Cart ({cart.length})
            </button>
            {page !== "login" && (
              <button className="logout" onClick={logout}>
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
    );
  }

  function LoginSection() {
    return (
      <section className="login-area">
        <div className="login-card">
          <div className="login-left">
            <img
              src={logoUrl}
              alt="logo"
              className="login-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo.png";
              }}
            />
            <h2>The Cozy Corner</h2>
            <p className="muted">
              Sign in to browse and buy — Quick Guest available.
            </p>
          </div>

          <div className="login-right">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username..."
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
            />

            <div className="login-actions">
              <button
                className="btn primary"
                onClick={() => login(username, password)}
              >
                Login
              </button>
              <button className="btn outline" onClick={quickGuest}>
                Quick Guest
              </button>
            </div>

            <div className="floating-small">
              {BOOKS.slice(0, 6).map((b, i) => (
                <img
                  key={b.id}
                  src={b.img}
                  alt=""
                  className={`floating-book f${i}`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/logo.png";
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Home() {
    return (
      <main className="hero container">
        <div className="hero-inner">
          <h1 className="hero-title">Cozy Corner Books</h1>
          <p className="muted">Hand-picked reads. Delivery across India.</p>

          <div className="hero-cta">
            <button className="btn primary" onClick={() => setPage("shop")}>
              Browse Books
            </button>
            <button className="btn outline" onClick={() => setPage("contact")}>
              Contact
            </button>
          </div>
        </div>

        <div className="home-floats" aria-hidden>
          {BOOKS.slice(0, 12).map((b, i) => (
            <img
              key={b.id}
              className={`home-book hb-${i}`}
              src={b.img}
              alt={b.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo.png";
              }}
            />
          ))}
        </div>
      </main>
    );
  }

  function Shop() {
    return (
      <section className="shop container">
        <div className="search-row">
          <input
            className="search"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid">
          {filteredBooks.map((b) => (
            <div className="book-card" key={b.id}>
              <div className="thumb">
                <img
                  src={b.img}
                  alt={b.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/logo.png";
                  }}
                />
              </div>
              <div className="meta">
                <h3>{b.title}</h3>
                <div className="author">{b.author}</div>
                <div className="summary">{b.summary}</div>
                <div className="row">
                  <div className="price">{toINR(b.price)}</div>
                  <div className="actions">
                    <button className="add-btn" onClick={() => addToCart(b)}>
                      Add
                    </button>
                    <button
                      className="add-btn ghost"
                      onClick={() => setSelected(b)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function BookModal({ book }) {
    if (!book) return null;
    return (
      <div className="modal-overlay" onClick={() => setSelected(null)}>
        <div className="book-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-left">
            <img
              src={book.img}
              alt={book.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo.png";
              }}
            />
          </div>
          <div className="modal-right">
            <h2>{book.title}</h2>
            <div className="author">{book.author}</div>
            <p className="summary">{book.summary}</p>
            <div className="modal-actions">
              <div className="price">{toINR(book.price)}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn primary"
                  onClick={() => {
                    addToCart(book);
                    setSelected(null);
                  }}
                >
                  Buy
                </button>
                <button
                  className="btn outline"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CartSidebar() {
    if (!cartOpen) return null;
    const total = cart.reduce((s, it) => s + it.price, 0);
    return (
      <div className="cart-overlay" onClick={() => setCartOpen(false)}>
        <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <h3>Cart</h3>
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="muted">Cart is empty</div>
            ) : (
              cart.map((c, idx) => (
                <div className="cart-row" key={idx}>
                  <img
                    src={c.img}
                    alt={c.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/logo.png";
                    }}
                  />
                  <div className="cmeta">
                    <div className="ctitle">{c.title}</div>
                    <div className="cprice">{toINR(c.price)}</div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-footer">
            <div className="cart-total">
              <div>Subtotal</div>
              <div className="total-price">{toINR(total)}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn primary"
                onClick={() => {
                  checkout();
                  setCartOpen(false);
                }}
              >
                Proceed to Pay
              </button>
              <button
                className="btn outline"
                onClick={() => setCartOpen(false)}
              >
                Continue
              </button>
            </div>
          </div>
        </aside>
      </div>
    );
  }

  function Contact() {
    const [text, setText] = useState("");
    return (
      <section className="contact container">
        <h2>Contact / CozyBot</h2>
        <p className="muted" style={{ marginBottom: 10 }}>
          Ask anything about books, prices, shipping, or your orders.
        </p>
        <div className="chat-wrap">
          <div className="messages" ref={chatContainerRef}>
            {chatLog.map((m, i) => (
              <div
                key={i}
                className={`msg ${
                  m.who === (username || "Guest") ? "me" : "bot"
                }`}
              >
                <div className="who">{m.who}:</div>
                <div className="txt">{m.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <textarea
              className="chat-input"
              rows={2}
              placeholder="Ask CozyBot... (press Enter to send)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendChat(text);
                  setText("");
                }
              }}
            />
            <button
              className="btn primary"
              onClick={() => {
                sendChat(text);
                setText("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </section>
    );
  }

  function Profile() {
    const userOrders = orders[username] || [];
    const displayName = username || "Guest";

    return (
      <section className="profile container">
        <h2>{displayName}'s Profile</h2>
        <div className="profile-grid">
          <div className="avatar">
            <ProfilePic username={username} />
          </div>

          <div className="profile-details">
            <h3 style={{ margin: "0 0 8px" }}>Recent Orders</h3>
            <div className="profile-orders">
              {userOrders.length === 0 ? (
                <div className="muted">No orders yet</div>
              ) : (
                userOrders.map((o, i) => (
                  <div className="order-row" key={i}>
                    <img
                      src={o.img}
                      alt={o.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/logo.png";
                      }}
                    />
                    <div className="order-row-info">
                      <div className="order-row-title">{o.title}</div>
                      <div className="order-row-meta">
                        {o.author} • {toINR(o.price)} • Estimated delivery: 72
                        hours
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  function About() {
    return (
      <section className="about container">
        <h2>About The Cozy Corner</h2>
        <p className="muted">
          The Cozy Corner is a tiny universe of manga, comics and encyclopedias
          curated for cozy nights, rainy days and long weekends. We deliver
          across India with a goal: make reading feel magical.
        </p>
      </section>
    );
  }

  return (
    <div className="app">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="content-layer" style={{ position: "relative", zIndex: 1 }}>
        <Header />

        {page === "login" && <LoginSection />}

        {page !== "login" && (
          <>
            {page === "home" && <Home />}
            {page === "shop" && <Shop />}
            {page === "contact" && <Contact />}
            {page === "profile" && <Profile />}
            {page === "about" && <About />}
          </>
        )}

        {selected && <BookModal book={selected} />}
        {cartOpen && <CartSidebar />}
        {toast && <div className="toast">{toast}</div>}

        <footer className="footer">© TheCozyStore — All Rights Reserved</footer>
      </div>
    </div>
  );
}
