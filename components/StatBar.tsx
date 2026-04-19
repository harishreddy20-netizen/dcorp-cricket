"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 20, suffix: "+", label: "Squad Members" },
  { target: 10, suffix: "+", label: "Seasons Active" },
  { target: 75, suffix: "%", label: "Win Rate 2025" },
  { target: 2,  suffix: "",  label: "League Titles" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        const step = Math.ceil(target / 40);
        let cur = 0;
        const id = setInterval(() => {
          cur = Math.min(cur + step, target);
          setVal(cur);
          if (cur >= target) clearInterval(id);
        }, 30);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ fontFamily: "var(--font-display)", fontSize: "52px", fontWeight: 900, lineHeight: 1, color: "var(--gold)" }}>
      {val}{suffix}
    </div>
  );
}

export default function StatBar() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={s.label}
          style={{
            padding: "32px 40px",
            borderRight: i < 3 ? "1px solid var(--border)" : "none",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Counter target={s.target} suffix={s.suffix} />
          <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
