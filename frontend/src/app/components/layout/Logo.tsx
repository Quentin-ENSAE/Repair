const GOLD = "#C9A03C";

export function Logo({
  size = 34,
  wordmark = true,
  onDark = false,
}: {
  size?: number;
  wordmark?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke={onDark ? "rgba(255,255,255,0.9)" : "var(--primary)"}
          strokeWidth="7"
        />
        <g transform="rotate(45 50 50)">
          <path d="M50 22L42 50L58 50Z" fill="var(--accent)" />
          <path
            d="M50 78L42 50L58 50Z"
            fill={onDark ? "rgba(255,255,255,0.85)" : "var(--primary)"}
          />
        </g>
        <circle cx="50" cy="50" r="5.5" fill={GOLD} />
      </svg>
      {wordmark && (
        <span
          className="font-black tracking-tight"
          style={{ fontSize: size * 0.5, color: onDark ? "#FFFFFF" : "var(--primary)" }}
        >
          Re<span style={{ color: "var(--accent)" }}>Pair</span>
        </span>
      )}
    </div>
  );
}
