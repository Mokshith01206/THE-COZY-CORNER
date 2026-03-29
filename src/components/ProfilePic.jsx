// src/components/ProfilePic.jsx
import React, { useEffect, useRef, useState } from "react";
import { fetchProfile, saveProfile } from "../apiFirebase";

export default function ProfilePic({ username }) {
  const [src, setSrc] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!username || username === "GuestUser") {
      setSrc(null);
      return;
    }

    (async () => {
      try {
        const profile = await fetchProfile(username);
        if (profile?.photo) setSrc(profile.photo);
        else setSrc(null);
      } catch (err) {
        console.error("Profile load error:", err);
      }
    })();
  }, [username]);

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f || !username || username === "GuestUser") return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      setSrc(dataUrl);
      try {
        await saveProfile(username, dataUrl);
      } catch (err) {
        console.error("Profile save error:", err);
      }
    };
    reader.readAsDataURL(f);
  };

  const removePic = async () => {
    setSrc(null);
    if (!username || username === "GuestUser") return;
    try {
      await saveProfile(username, null);
    } catch (err) {
      console.error("Profile remove error:", err);
    }
  };

  return (
    <div className="profile-pic-wrap">
      <div className="profile-pic-frame">
        {src ? <img src={src} alt="Profile" /> : <div className="profile-pic-placeholder">👤</div>}
      </div>

      <div className="profile-pic-actions">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onPick}
          style={{ display: "none" }}
        />

        <button className="btn primary" onClick={() => fileRef.current?.click()}>
          Upload
        </button>

        {src && (
          <button className="btn outline" onClick={removePic}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
