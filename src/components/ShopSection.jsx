// src/components/ShopSection.jsx
import React, { useState, useEffect, useRef } from "react";
import "./ShopSection.css";

/*
  Props:
    - books: array of book objects (id,title,author,price,img,summary,category)
    - onOpenBook(book) -> open book modal
    - onAddToCart(book) -> add book to cart
*/
export default function ShopSection({ books = [], onOpenBook, onAddToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(books || []);
  const gridRef = useRef(null);

  useEffect(() => {
    // filter by search + category
    const q = search.trim().toLowerCase();
    const newFiltered = (books || []).filter(b => {
      const matchesQ =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.summary || "").toLowerCase().includes(q);
      const matchesCat = category === "All" || (b.category || "").toLowerCase() === category.toLowerCase();
      return matchesQ && matchesCat;
    });
    setFiltered(newFiltered);
  }, [books, search, category]);

  // reveal on scroll (simple IntersectionObserver)
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".book-card");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            // optionally unobserve to keep visible
            obs.unobserve(e.target);
          }
        });
      },
      { root: null, threshold: 0.12 }
    );
    items.forEach(i => obs.observe(i));
    return () => obs.disconnect();
  }, [filtered]);

  // collect categories
  const cats = ["All", ...Array.from(new Set((books || []).map(b => b.category || "Other")))];
  // convert price to INR (approx conversion)
  const toINR = (usd) => {
    const rate = 82; // conversion factor, adjust if you want
    return Math.round((usd || 0) * rate);
  };

  return (
    <section className="shop container">
      <div className="search-row">
        <input
          className="search"
          placeholder="Search books, authors or summaries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filters">
          <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid" ref={gridRef}>
        {filtered.length === 0 && (
          <div className="no-results">No books found for your search.</div>
        )}

        {filtered.map(book => (
          <article
            key={book.id}
            className="book-card"
            onClick={() => onOpenBook && onOpenBook(book)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpenBook && onOpenBook(book); }}
          >
            <div className="thumb">
              <img
                src={book.img}
                alt={book.title}
                onError={(ev) => {
                  ev.target.onerror = null;
                  ev.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='420'><rect width='100%' height='100%' fill='%230b0f12'/><text x='50%' y='50%' fill='%239fbadf' font-size='16' text-anchor='middle' dominant-baseline='middle'>No cover</text></svg>";
                }}
              />
            </div>

            <div className="meta">
              <h3>{book.title}</h3>
              <div className="author">{book.author}</div>
              <p className="summary">{book.summary}</p>

              <div className="row">
                <div className="price">₹{toINR(book.price)}</div>

                <div className="actions" onClick={(e) => e.stopPropagation()}>
                  <button className="add-btn" onClick={() => onAddToCart && onAddToCart(book)}>Add to cart</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
