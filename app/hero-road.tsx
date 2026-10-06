"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

export type RoadStop = { at: number; time: string; title: string; photo: string; side: "up" | "down" };
export type RoadCopy = {
  eyebrow: string;
  title: [string, string];
  lede: string;
  cta: string;
  cta2: string;
  scroll: string;
  hud: string;
  km: string;
  stops: RoadStop[];
  outroTitle: string;
  outroText: string;
  outroCta: string;
  rating: string;
};

const DESK = { vb: [1440, 900] as const, d: "M -80 790 C 220 790, 330 560, 560 540 C 760 525, 820 330, 1040 320 C 1240 310, 1300 150, 1540 90" };
const MOB = { vb: [390, 800] as const, d: "M -40 770 C 150 770, 220 640, 190 540 C 160 440, 40 420, 90 320 C 140 220, 350 230, 330 120 C 320 60, 300 20, 420 -20" };
const TOTAL_KM = 184;

function Van({ wheelRef }: { wheelRef: React.RefObject<SVGGElement | null> }) {
  return (
    <g className="van" transform="translate(-78,-60)">
      <ellipse cx="78" cy="62" rx="70" ry="7" fill="rgba(14,34,56,.18)" />
      <path d="M8 44 Q8 24 22 22 L52 20 L64 6 Q68 2 74 2 L128 2 Q138 2 141 12 L146 30 Q148 44 146 46 L8 46 Z" fill="#ff5a7a" />
      <path d="M8 44 Q8 24 22 22 L52 20 L64 6 Q68 2 74 2 L128 2 Q138 2 141 12 L146 30 Q148 44 146 46 L8 46 Z" fill="none" stroke="#c93b58" strokeWidth="1.5" />
      <path d="M66 8 L76 8 Q80 8 80 12 L80 22 L58 22 Z" fill="#dff3ff" />
      <path d="M86 8 L108 8 L108 22 L86 22 Z" fill="#dff3ff" />
      <path d="M114 8 L128 8 Q134 8 135 14 L138 22 L114 22 Z" fill="#dff3ff" />
      <rect x="10" y="30" width="136" height="4" fill="#ffffff" opacity=".55" />
      <circle cx="12" cy="26" r="3" fill="#ffe9a8" />
      <circle cx="145" cy="38" r="2.5" fill="#ffd166" />
      <g ref={wheelRef}>
        <g className="wheel" style={{ transformOrigin: "40px 48px" }}><circle cx="40" cy="48" r="11" fill="#17202b" /><circle cx="40" cy="48" r="5" fill="#9fb3c8" /><path d="M40 39 V57 M31 48 H49" stroke="#17202b" strokeWidth="2" /></g>
        <g className="wheel" style={{ transformOrigin: "118px 48px" }}><circle cx="118" cy="48" r="11" fill="#17202b" /><circle cx="118" cy="48" r="5" fill="#9fb3c8" /><path d="M118 39 V57 M109 48 H127" stroke="#17202b" strokeWidth="2" /></g>
      </g>
    </g>
  );
}

export function HeroRoad({ c, wa }: { c: RoadCopy; wa: string }) {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const dashRef = useRef<SVGPathElement>(null);
  const vanRef = useRef<SVGGElement>(null);
  const wheelRef = useRef<SVGGElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [passed, setPassed] = useState(reduced ? 99 : -1);
  const [phase, setPhase] = useState<"intro" | "trip" | "outro">("intro");
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const geo = mobile ? MOB : DESK;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const f = () => setMobile(mq.matches); f();
    mq.addEventListener("change", f); return () => mq.removeEventListener("change", f);
  }, []);

  /* stop markers: computed from the path once it is in the DOM */
  useEffect(() => {
    const p = pathRef.current; if (!p) return;
    const L = p.getTotalLength();
    setPts(c.stops.map(s => { const q = p.getPointAtLength(L * s.at); return { x: q.x, y: q.y }; }));
    for (const el of [roadRef.current, dashRef.current]) { if (el) { el.style.strokeDasharray = `${L}`; } }
    apply(reduced ? 0.5 : (scrollYProgress.get() || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, c.stops, reduced]);

  const apply = (v: number) => {
    const p = pathRef.current, van = vanRef.current; if (!p || !van) return;
    const L = p.getTotalLength();
    const drive = Math.min(1, Math.max(0, (v - 0.08) / 0.84));
    const e = drive < 0.5 ? 2 * drive * drive : 1 - Math.pow(-2 * drive + 2, 2) / 2;
    const d = L * e; const a = p.getPointAtLength(d); const b = p.getPointAtLength(Math.min(L, d + 2));
    const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    const s = mobile ? 0.62 : 1;
    van.setAttribute("transform", `translate(${a.x},${a.y}) rotate(${ang}) scale(${s})`);
    if (wheelRef.current) { const rot = (d / (2 * Math.PI * 11)) * 360; for (const w of wheelRef.current.querySelectorAll<SVGGElement>(".wheel")) w.style.transform = `rotate(${rot}deg)`; }
    const reveal = Math.min(1, e + 0.12);
    for (const el of [roadRef.current, dashRef.current]) { if (el) el.style.strokeDashoffset = `${L * (1 - reveal)}`; }
    if (kmRef.current) kmRef.current.textContent = String(Math.round(TOTAL_KM * e));
    ref.current?.style.setProperty("--p", v.toFixed(4));
    let idx = -1; c.stops.forEach((st, i) => { if (e >= st.at - 0.01) idx = i; });
    setPassed(prev => (prev === idx ? prev : idx));
    const ph = v < 0.07 ? "intro" : v > 0.9 ? "outro" : "trip";
    setPhase(prev => (prev === ph ? prev : ph));
  };
  useMotionValueEvent(scrollYProgress, "change", v => { if (!reduced) apply(v); });

  return (
    <section className={`road${reduced ? " reduced" : ""}`} ref={ref} id="top">
      <div className="road-stage">
        <div className="road-sky" />
        <div className="road-sun" />
        <div className="road-clouds"><span /><span /><span /></div>
        <div className="road-hills h1" /><div className="road-hills h2" /><div className="road-hills h3" />

        <svg className="road-svg" viewBox={`0 0 ${geo.vb[0]} ${geo.vb[1]}`} preserveAspectRatio="xMidYMax slice" aria-hidden>
          <path ref={pathRef} d={geo.d} fill="none" stroke="none" />
          <path d={geo.d} fill="none" stroke="rgba(14,34,56,.08)" strokeWidth={mobile ? 30 : 46} strokeLinecap="round" />
          <path ref={roadRef} d={geo.d} fill="none" stroke="#2b3a4d" strokeWidth={mobile ? 26 : 40} strokeLinecap="round" />
          <path ref={dashRef} d={geo.d} fill="none" stroke="#ffd166" strokeWidth={mobile ? 2 : 3} strokeDasharray="22 18" strokeLinecap="round" className="road-dash" />
          {pts.map((q, i) => (
            <g key={i} className={`road-pin${passed >= i ? " on" : ""}`} transform={`translate(${q.x},${q.y})`}>
              <circle r={mobile ? 9 : 12} fill="#fff" stroke="#ff5a7a" strokeWidth="4" />
              <circle r={mobile ? 3 : 4} fill="#ff5a7a" />
            </g>
          ))}
          <g ref={vanRef}><Van wheelRef={wheelRef} /></g>
        </svg>

        {pts.map((q, i) => {
          const s = c.stops[i]; const on = passed >= i;
          const lo = mobile ? 24 : 9, hi = 100 - lo;
          const left = Math.min(hi, Math.max(lo, (q.x / geo.vb[0]) * 100)), top = (q.y / geo.vb[1]) * 100;
          return (
            <div key={s.title} className={`road-card ${s.side}${on ? " on" : ""}`} style={{ left: `${left}%`, top: `${top}%` }}>
              <Image src={s.photo} alt="" width={160} height={110} sizes="160px" />
              <div><time>{s.time}</time><b>{s.title}</b></div>
            </div>
          );
        })}

        <div className={`road-intro${phase === "intro" ? " on" : ""}`}>
          <p className="road-eyebrow">{c.eyebrow}</p>
          <h1 className="road-title"><span>{c.title[0]}</span><em>{c.title[1]}</em></h1>
          <p className="road-lede">{c.lede}</p>
          <div className="road-actions">
            <a className="btn btn-coral" href={wa} target="_blank" rel="noopener noreferrer">{c.cta}</a>
            <a className="btn btn-white" href="#tours">{c.cta2}</a>
          </div>
          <p className="road-scroll">{c.scroll} <i>↓</i></p>
        </div>

        <div className={`road-hud${phase === "trip" ? " on" : ""}`}>
          <span className="road-hud-label">{c.hud}</span>
          <b><span ref={kmRef}>0</span> {c.km}</b>
          <span className="road-hud-stop">{passed >= 0 ? c.stops[Math.min(passed, c.stops.length - 1)].title : "—"}</span>
        </div>

        <div className={`road-outro${phase === "outro" ? " on" : ""}`}>
          <p className="road-eyebrow">{c.rating}</p>
          <h2>{c.outroTitle}</h2>
          <p>{c.outroText}</p>
          <a className="btn btn-coral" href="#tours">{c.outroCta} ↓</a>
        </div>
      </div>
    </section>
  );
}
