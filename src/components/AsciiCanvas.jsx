import { useEffect, useRef, useState } from "react";

export default function AsciiCanvas({
  renderFrame,
  cols = 38,
  rows = 12,
  fps = 10,
  paused = false,
  label = "",
}) {
  const ref = useRef(null);
  const [frame, setFrame] = useState(0);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInView(entries[0]?.isIntersecting ?? true);
      },
      { rootMargin: "80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setFrame((f) => (f + 1) % 10000);
    }, Math.round(1000 / fps));

    return () => window.clearInterval(interval);
  }, [paused, inView, fps]);

  return (
    <pre
      ref={ref}
      className="art"
      style={{ "--cols": cols, "--rows": rows }}
      role="img"
      aria-label={label}
    >
      {renderFrame(frame)}
    </pre>
  );
}
