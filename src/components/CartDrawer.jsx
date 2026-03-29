// src/components/CartDrawer.jsx
import React, { useState, useEffect } from "react";

export default function CartDrawer({ open, onClose, cart = [], onRemove, onChangeQty, onCheckout }) {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!open) setProcessing(false);
  }, [open]);

  if (!open) return null;

  const overlay = { position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "flex-end" };
  const panel = { width: 420, maxWidth: "96%", height: "100vh", background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", padding: 18, boxShadow: "-12px 0 40px rgba(0,0,0,0.7)", overflowY: "auto" };

  const total = cart.reduce((s, c) => s + (c.qty || 1) * (c.price || 0) * 82, 0);

  const handleCheckout = async (method = "card") => {
    setProcessing(true);
    // simulate payment/delivery creation
    await new Promise((r) => setTimeout(r, 1200));
    setProcessing(false);
    if (onCheckout) onCheckout({ method, total });
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: "#ffb36a" }}>Your Cart</h3>
          <button onClick={onClose} style={{ background: "transparent", border: 0, color: "#ff8080", cursor: "pointer" }}>✖</button>
        </div>

        <div>
          {cart.length === 0 && <div style={{ color: "rgba(255,255,255,0.7)", padding: 20 }}>Your cart is empty</div>}
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14, background: "rgba(255,255,255,0.02)", padding: 10, borderRadius: 10 }}>
              <img src={item.img} alt={item.title} style={{ width: 76, height: 110, objectFit: "cover", borderRadius: 8 }} onError={(e)=>{ e.target.onerror=null; e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='300'><rect width='100%' height='100%' fill='%2306090b'/><text x='50%' y='50%' fill='%239fbadf' font-size='12' text-anchor='middle' dominant-baseline='middle'>No cover</text></svg>"; }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800 }}>{item.title}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{item.author}</div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontWeight: 900, color: "#ffd39a" }}>₹{Math.round((item.price || 0) * 82)}</div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => onChangeQty && onChangeQty(item.id, -1)} style={{ padding: 6, borderRadius: 6 }}>-</button>
                    <div style={{ minWidth: 22, textAlign: "center" }}>{item.qty || 1}</div>
                    <button onClick={() => onChangeQty && onChangeQty(item.id, 1)} style={{ padding: 6, borderRadius: 6 }}>+</button>
                  </div>
                </div>
              </div>

              <div>
                <button onClick={() => onRemove && onRemove(item.id)} style={{ background: "transparent", border: 0, color: "#ff6a6a", cursor: "pointer" }}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.85)" }}>Total</div>
            <div style={{ fontWeight: 900, color: "#ffd39a" }}>₹{Math.round(total)}</div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => handleCheckout("card")} disabled={processing} style={{ flex: 1, padding: 12, borderRadius: 10, border: 0, background: "linear-gradient(90deg,#ff6a00,#ff8e3a)", color: "#060606", fontWeight: 900, cursor: "pointer" }}>
              {processing ? "Processing..." : "Checkout"}
            </button>
            <button onClick={() => handleCheckout("cod")} disabled={processing} style={{ padding: 12, borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)", background: "transparent", color: "var(--muted)" }}>
              COD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
