"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { galleryCols, type Lang } from "./data";

export function GalleryParallax({ lang, onPhoto }: { lang: Lang; onPhoto: (s: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [60, -160]);
  const y1 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -220]);
  const ys = [y0, y1, y2];
  return (
    <div className="gp" ref={ref}>
      {galleryCols.map((col, ci) => (
        <motion.div className="gp-col" key={ci} style={reduced ? undefined : { y: ys[ci] }}>
          {col.map(g => (
            <figure key={g.src} className="gp-item">
              <button onClick={() => onPhoto(g.src)} aria-label="Open photo"><Image src={g.src} alt={g.cap[lang]} width={g.w} height={g.h} sizes="(max-width: 760px) 50vw, 30vw" loading="lazy" /></button>
              <figcaption>{g.cap[lang]}</figcaption>
            </figure>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
