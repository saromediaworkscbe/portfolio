import { useEffect, useState } from "react";

/** Live-running timecode HH:MM:SS:FF — the site's running heartbeat. */
export default function TimecodeTicker({ fps = 24 }) {
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrames((f) => f + 1), 1000 / fps);
    return () => clearInterval(id);
  }, [fps]);

  const f = frames % fps;
  const totalSec = Math.floor(frames / fps);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600);
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <span className="font-mono text-xs text-signal tabular-nums">
      {pad(h)}:{pad(m)}:{pad(s)}:{pad(f)}
    </span>
  );
}
