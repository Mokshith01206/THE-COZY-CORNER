// src/components/AnimatedBackground.jsx
import React, { useEffect, useRef } from "react";

export default function AnimatedBackground({ particleCount = 100 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = Array.from({length: particleCount}).map(()=>({
      x: Math.random()*w, y: Math.random()*h,
      r: Math.random()*2 + 0.6,
      vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.08,
      alpha: 0.02 + Math.random()*0.16
    }));

    let t = 0;
    const draw = ()=>{
      t += 0.006;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      // background
      ctx.clearRect(0,0,w,h);
      const g = ctx.createLinearGradient(0,0,w,h);
      g.addColorStop(0,"rgba(2,6,10,0.92)");
      g.addColorStop(1,"rgba(5,8,12,0.98)");
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

      // ambient moving glow
      const root = getComputedStyle(document.documentElement);
      const mx = parseFloat(root.getPropertyValue("--mx")) || 0;
      const my = parseFloat(root.getPropertyValue("--my")) || 0;
      const gx = w*0.65 + mx*6;
      const gy = h*0.65 + my*8;
      const grd = ctx.createRadialGradient(gx,gy,80,gx,gy,Math.max(w,h)*0.9);
      grd.addColorStop(0,"rgba(255,120,40,0.03)");
      grd.addColorStop(1,"rgba(10,12,16,0)");
      ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);

      // particles
      ctx.globalCompositeOperation = "lighter";
      for(let p of particles){
        p.x += p.vx + Math.sin((t + p.x)*0.4)*0.02;
        p.y += p.vy + Math.cos((t + p.y)*0.4)*0.02;
        if(p.x<-50) p.x=w+50;
        if(p.x>w+50) p.x=-50;
        if(p.y<-50) p.y=h+50;
        if(p.y>h+50) p.y=-50;

        const grdP = ctx.createRadialGradient(p.x + mx*0.05, p.y + my*0.05, 0, p.x, p.y, p.r*8);
        grdP.addColorStop(0, `rgba(120,200,255,${p.alpha})`);
        grdP.addColorStop(0.6, `rgba(20,40,60,0)`);
        ctx.beginPath();
        ctx.fillStyle = grdP;
        ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    const onResize = ()=>{ canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return ()=>{ cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", onResize); };
  },[particleCount]);

  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", filter:"saturate(1) contrast(1.02) blur(.2px)" }}/>;
}
