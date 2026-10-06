"use client";
import Image from "next/image";
import { createRef, useMemo, type RefObject } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Tour, Lang } from "./data";

export type StackCopy = { from: string; pp: string; van: string; book: string; includes: string; stops: string; seats: string; time: string };

function Card({ x, i, selfRef, nextRef, lang, c, wa, onPhoto }: { x: Tour; i: number; selfRef: RefObject<HTMLElement | null>; nextRef: RefObject<HTMLElement | null> | null; lang: Lang; c: StackCopy; wa: (s: string) => string; onPhoto: (s: string) => void }) {
  const reduced = useReducedMotion();
  /* progress = how far the NEXT card has risen from the viewport bottom to the stick line */
  const { scrollYProgress } = useScroll({ target: nextRef ?? selfRef, offset: ["start end", "start 84px"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const dim = useTransform(scrollYProgress, [0.3, 1], [0, 0.5]);
  const active = !!nextRef && !reduced;
  return (
    <motion.article ref={selfRef as RefObject<HTMLElement>} className="stack-card" style={{ scale: active ? scale : 1, y: active ? y : 0, top: `calc(84px + ${i * 12}px)` }}>
      <div className="stack-media">
        <button className="stack-photo main" onClick={() => onPhoto(x.photo)} aria-label="Open photo"><Image src={x.photo} alt={x.name[lang]} fill sizes="(max-width: 900px) 100vw, 55vw" style={{ objectFit: "cover" }} /></button>
        <button className="stack-photo small" onClick={() => onPhoto(x.photo2)} aria-label="Open photo"><Image src={x.photo2} alt="" fill sizes="220px" style={{ objectFit: "cover" }} /></button>
        <span className="stack-n" style={{ background: x.color }}>{String(x.n).padStart(2, "0")}</span>
      </div>
      <div className="stack-body">
        <p className="stack-kicker" style={{ color: x.color }}>{x.kicker[lang]}</p>
        <h3>{x.name[lang]}</h3>
        <div className="stack-meta">
          <span><i>{c.time}</i>{x.duration[lang]}</span>
          <span><i>{c.seats}</i>{x.seats[lang]}</span>
        </div>
        <div className="stack-cols">
          <div><i>{c.stops}</i><ol>{x.stops.map(s => <li key={s.en}>{s[lang]}</li>)}</ol></div>
          <div><i>{c.includes}</i><p>{x.includes[lang]}</p></div>
        </div>
        <div className="stack-foot">
          <div className="stack-price">{lang === "ka" ? <><b>${x.price}</b><span>{c.from}</span></> : <><span>{c.from}</span><b>${x.price}</b></>}<span>{x.priceUnit === "pp" ? c.pp : c.van}</span></div>
          <a className="btn btn-wa" href={wa(x.name[lang])} target="_blank" rel="noopener noreferrer">{c.book}</a>
        </div>
      </div>
      {active && <motion.div className="stack-dim" style={{ opacity: dim }} />}
    </motion.article>
  );
}

export function TourStack({ tours, lang, c, wa, onPhoto }: { tours: Tour[]; lang: Lang; c: StackCopy; wa: (s: string) => string; onPhoto: (s: string) => void }) {
  const refs = useMemo(() => tours.map(() => createRef<HTMLElement>()), [tours]);
  return (
    <div className="stack">
      {tours.map((x, i) => <Card key={x.id} x={x} i={i} selfRef={refs[i]} nextRef={refs[i + 1] ?? null} lang={lang} c={c} wa={wa} onPhoto={onPhoto} />)}
    </div>
  );
}
