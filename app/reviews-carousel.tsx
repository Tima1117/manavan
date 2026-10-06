"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import type { Review, Lang } from "./data";

export function ReviewsCarousel({ reviews, lang, guideLabel }: { reviews: Review[]; lang: Lang; guideLabel: string }) {
  const track = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [idx, setIdx] = useState(0);
  const [max, setMax] = useState(0);
  const step = useRef(400);

  useEffect(() => {
    const measure = () => {
      const t = track.current, w = wrap.current; if (!t || !w) return;
      const card = t.querySelector<HTMLElement>(".rc-card"); const gap = 18;
      step.current = card ? card.offsetWidth + gap : 400;
      setMax(Math.max(0, t.scrollWidth - w.clientWidth));
    };
    measure(); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure);
  }, [reviews]);

  const go = (i: number) => {
    const n = Math.max(0, Math.min(reviews.length - 1, i));
    const target = -Math.min(max, n * step.current);
    animate(x, target, { type: "spring", stiffness: 180, damping: 26 });
    setIdx(n);
  };

  const initials = (name: string) => name.split(/\s+/).slice(0, 2).map(s => s[0] || "").join("").toUpperCase();
  const hues = ["#ff5a7a", "#1b6fa8", "#2fb59b", "#ffc94d", "#8b6cf6"];

  return (
    <div className="rc" ref={wrap}>
      <motion.div className="rc-track" ref={track} drag="x" dragConstraints={{ left: -max, right: 0 }} dragElastic={0.08} style={{ x }} onDragEnd={() => { const i = Math.round(-x.get() / step.current); setIdx(Math.max(0, Math.min(reviews.length - 1, i))); }}>
        {reviews.map((r, i) => (
          <article className="rc-card" key={r.author}>
            <div className="rc-stars">★★★★★</div>
            <p>{r.text[lang]}</p>
            <footer>
              <span className="rc-ava" style={{ background: hues[i % hues.length] }}>{initials(r.author)}</span>
              <div><b>{r.author}</b><span>{r.date[lang]} · Google</span></div>
              {r.guide && <em>{guideLabel}: {r.guide}</em>}
            </footer>
          </article>
        ))}
      </motion.div>
      <div className="rc-nav">
        <button onClick={() => go(idx - 1)} aria-label="Previous" disabled={idx === 0}>←</button>
        <div className="rc-dots">{reviews.map((_, i) => <i key={i} className={i === idx ? "on" : ""} onClick={() => go(i)} />)}</div>
        <button onClick={() => go(idx + 1)} aria-label="Next" disabled={idx >= reviews.length - 1}>→</button>
      </div>
    </div>
  );
}
