// src/components/ContactAI.jsx
import React, { useEffect, useRef, useState } from "react";
import "./ContactAI.css";

const rules = [
  { keys: ["hi", "hello", "hey"], resp: "Hi there! 👋 How can CozyBot help you today?" },
  { keys: ["order", "track", "shipping", "delivery"], resp: "Orders usually ship in 48–72 hours. You can track them in your Profile → Orders." },
  { keys: ["payment", "pay", "checkout"], resp: "We accept UPI, debit card and credit card. No Cash on Delivery at the moment." },
  { keys: ["refund", "return", "replace"], resp: "You can request a return or refund within 7 days of delivery from Profile → Orders." },
  { keys: ["books", "manga", "novel", "comic"], resp: "We have manga, comics, novels and encyclopedias. Browse them in the Shop section 📚" },
  { keys: ["help", "support", "contact"], resp: "You can chat with me here or email support@cozycorner.com for detailed issues." }
];

const fallback = [
  "Hmm, I didn’t fully get that — can you rephrase it a bit?",
  "Interesting! Tell me a bit more so I can help better.",
  "I’m here to help with orders, delivery, payments and books. What’s up?"
];

function matchRule(message) {
  const lower = message.toLowerCase();
  for (const r of rules) {
    if (r.keys.some((k) => lower.includes(k))) return r.resp;
  }
  return null;
}

export default function ContactAI({ username }) {
  const [log, setLog] = useState([]); // {who, text}
  const [text, setText] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log, thinking]);

  const send = () => {
    if (!text.trim() || thinking) return;

    const userMsg = { who: username || "Guest", text: text.trim() };
    setLog((prev) => [...prev, userMsg]);
    setText("");
    setThinking(true);

    const reply = matchRule(userMsg.text) ||
      fallback[Math.floor(Math.random() * fallback.length)];

    setTimeout(() => {
      setLog((prev) => [...prev, { who: "CozyBot", text: reply }]);
      setThinking(false);
    }, 500 + Math.random() * 400);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="contact-ai-container">
      <div className="ai-status">
        <span className="ai-status-dot" />
        <span>CozyBot • {thinking ? "Thinking…" : "Online"}</span>
      </div>

      <h2>Chat with CozyBot</h2>
      <p className="contact-ai-subtitle">
        Ask about orders, delivery, payments, refunds or books ✨
      </p>

      <div className="chat-box">
        {log.map((m, i) => (
          <div
            key={i}
            className={`chat-message ${m.who === "CozyBot" ? "bot" : "user"}`}
          >
            <span className="chat-message-label">
              {m.who === "CozyBot" ? "CozyBot" : m.who}
            </span>
            <div>{m.text}</div>
          </div>
        ))}

        {thinking && (
          <div className="chat-message bot">
            <span className="chat-message-label">CozyBot</span>
            <div className="typing-indicator">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="chat-actions">
        <textarea
          className="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your message… (e.g. “Where is my order?”)"
        />
        <button className="send-btn" onClick={send}>
          <span>Send</span>
          <span className="send-btn-icon">➤</span>
        </button>
      </div>
    </div>
  );
}
