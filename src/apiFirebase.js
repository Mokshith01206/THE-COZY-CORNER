// src/apiFirebase.js
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/* ---------- ORDERS ---------- */
export async function fetchOrders(username) {
  const q = query(
    collection(db, "orders"),
    where("username", "==", username)
  );

  const snap = await getDocs(q);
  const orders = [];

  snap.forEach((d) => {
    const data = d.data();
    if (Array.isArray(data.items)) {
      data.items.forEach((item) => orders.push(item));
    }
  });

  return orders; // flat list of books
}

export async function createOrder(username, items) {
  await addDoc(collection(db, "orders"), {
    username,
    items,
    createdAt: serverTimestamp(),
  });
}

/* ---------- PROFILE ---------- */
export async function fetchProfile(username) {
  const ref = doc(db, "profiles", username);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data();
}

export async function saveProfile(username, photo) {
  const ref = doc(db, "profiles", username);
  await setDoc(ref, { photo: photo || null }, { merge: true });
}
