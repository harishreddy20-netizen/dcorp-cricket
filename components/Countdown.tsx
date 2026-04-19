"use client";
import { useState, useEffect } from "react";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [t, setT] = useState({ days: 0, hrs: 0, min: 0, sec: 0, past: false });

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate + "T10:00:00").getTime() - Date.now();
      if (diff <= 0) { setT({ days: 0, hrs: 0, min: 0, sec: 0, past: true }); return; }
      setT({
        days: Math.floor(diff / 86400000),
        hrs:  Math.floor((diff % 86400000) / 3600000),
        min:  Math.floor((diff % 3600000) / 60000),
        sec:  Math.floor((diff % 60000) / 1000),
        past: false,
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const blocks = [
    { v: t.days, u: "Days" },
    { v: t.hrs,  u: "Hrs"  },
    { v: t.min,  u: "Min"  },
    { v: t.sec,  u: "Sec"  },
  ];

  return (
    <div>
      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "20px" }}>
        {t.past ? "Match Day!" : "Match Countdown"}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {blocks.map((b, i) => (
          <>
            {i > 0 && (
              <div key={`sep-${i}`} style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 900, color: "var(--border)", marginBottom: "14px" }}>:</div>
            )}
            <div key={b.u} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "var(--bg3)", border: "1px solid var(--border)", padding: "16px 20px", minWidth: "68px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 900, lineHeight: 1, color: "var(--gold)" }}>{pad(b.v)}</span>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{b.u}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
