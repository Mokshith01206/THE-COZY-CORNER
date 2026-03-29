// src/hooks/useRevealOnScroll.js
import { useEffect } from "react";

export default function useRevealOnScroll(selector = ".reveal") {
  useEffect(() => {
    const items = document.querySelectorAll(selector);
    if (!items.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          if (!entry.target.classList.contains("keep")) entry.target.classList.remove("in-view");
        }
      });
    }, { threshold: 0.12 });
    items.forEach(i => io.observe(i));
    return () => io.disconnect();
  }, [selector]);
}
