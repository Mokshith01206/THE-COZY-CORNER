// src/components/BookModal.jsx
import React, { useState } from "react";

export default function BookModal({ book, onClose, onAddToCart, onBuyNow }) {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  if (!book) return null;

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(book);
    // small visual confirm
    alert(`"${book.title}" added to cart`);
  };

  const handleBuyNow = async () => {
    setLoading(true);
    // simulate payment processing
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    if (onBuyNow) onBuyNow(book, method);
  };

  const overlay = {
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(2,6,10,0.72)", display: "flex", alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(6px)"
  };

  const box = {
    width: 520, maxWidth: "94%", borderRadius: 16, padding: 20,
    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
    boxShadow: "0 30px 90px rgba(0,0,0,0.7)", transform: "translateY(0)", animation: "pop .28s ease"
  };

  const imgStyle = { width: 180, height: 260, borderRadius: 10, objectFit: "cover", boxShadow: "0 18px 50px rgba(0,0,0,0.6)" };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={box} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", gap: 18 }}>
          <div>
            <img
              src={book.img}
              alt={book.title}
              style={imgStyle}
              onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='420'><rect width='100%' height='100%' fill='%2306090b'/><text x='50%' y='50%' fill='%239fbadf' font-size='16' text-anchor='middle' dominant-baseline='middle'>No cover</text></svg>"; }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ margin: 0, color: "#ffd7a8" }}>{book.title}</h2>
                <div style={{ color: "rgba(255,255,255,0.8)", marginTop: 8 }}>{book.author}</div>
              </div>
              <button onClick={onClose} style={{ background: "transparent", border: 0, color: "#ff8a8a", cursor: "pointer", fontSize: 18 }}>✖</button>
            </div>

            <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 12 }}>{book.summary}</p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
              <div style={{ fontWeight: 900, color: "#ffb36a", fontSize: 18 }}>₹{Math.round((book.price || 0) * 82)}</div>
              <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ padding: 8, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: "#fff" }}>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              <button onClick={handleAddToCart} style={{ padding: "10px 14px", borderRadius: 10, background: "linear-gradient(90deg,#ff6a00,#ff8e3a)", border: 0, color: "#060606", fontWeight: 800, cursor: "pointer" }}>
                Add to cart
              </button>

              <button onClick={handleBuyNow} disabled={loading} style={{ padding: "10px 14px", borderRadius: 10, background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "#fff", cursor: "pointer" }}>
                {loading ? "Processing..." : `Buy now (${method.toUpperCase()})`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* small popup animation keyframes */}
      <style>{`
        @keyframes pop { from { transform: translateY(12px) scale(.98); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }
      `}</style>
    </div>
  );
}
