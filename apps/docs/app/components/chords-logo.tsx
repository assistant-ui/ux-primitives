"use client";

import { useState, useEffect, useRef } from "react";

interface ChordsLogoProps {
  size?: "sm" | "lg";
  variant?: "simple" | "styled";
  className?: string;
}

const sizes = {
  sm: { height: 24, fontSize: 20 },
  lg: { height: 56, fontSize: 48 },
} as const;

const variants = {
  simple: {
    fontFamily: "'Dancing Script', cursive",
    fontStyle: "normal" as const,
    fontWeight: 600,
    widthFactor: 0.52,
  },
  styled: {
    fontFamily: "'Dancing Script', cursive",
    fontStyle: "normal" as const,
    fontWeight: 700,
    widthFactor: 0.55,
  },
} as const;

export function ChordsLogo({
  size = "lg",
  variant = "simple",
  className,
}: ChordsLogoProps) {
  const { height, fontSize } = sizes[size];
  const v = variants[variant];
  const width = Math.round(fontSize * v.widthFactor * 6.5);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      className={className}
      role="img"
      aria-label="Chords"
    >
      <text
        x="0"
        y={fontSize * 0.82}
        fontFamily={v.fontFamily}
        fontStyle={v.fontStyle}
        fontWeight={v.fontWeight}
        fontSize={fontSize}
      >
        Chords
      </text>
    </svg>
  );
}

export function ChordsLogoAnimated() {
  const textRef = useRef<HTMLSpanElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const [shimmerDone, setShimmerDone] = useState(false);

  const v = variants.styled;
  const { fontSize } = sizes.lg;

  // Listen for shimmer animation end
  useEffect(() => {
    const el = shimmerRef.current;
    if (!el) return;
    const onEnd = () => setShimmerDone(true);
    el.addEventListener("animationiteration", onEnd);
    return () => el.removeEventListener("animationiteration", onEnd);
  }, []);

  // Mouse-follow radial glow via CSS background (active after shimmer)
  useEffect(() => {
    if (!shimmerDone) return;

    const el = textRef.current;
    if (!el) return;

    // Set initial state — show text in currentColor until mouse moves
    el.style.backgroundImage = "linear-gradient(currentColor, currentColor)";
    el.style.backgroundClip = "text";
    (el.style as unknown as Record<string, string>).WebkitBackgroundClip = "text";
    el.style.webkitTextFillColor = "transparent";

    const onMouseMove = (e: MouseEvent) => {
      const isDark = document.documentElement.classList.contains("dark");
      const glowColor = isDark ? "#FFD700" : "white";

      const rect = el.getBoundingClientRect();
      const overLogo =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      let x: number, y: number, r: number;
      if (overLogo) {
        x = ((e.clientX - rect.left) / rect.width) * 100;
        y = ((e.clientY - rect.top) / rect.height) * 100;
        r = 40;
      } else {
        x = (e.clientX / window.innerWidth) * 100;
        y = (e.clientY / window.innerHeight) * 100;
        r = 80;
      }

      el.style.backgroundImage = `radial-gradient(circle ${r}px at ${x}% ${y}%, ${glowColor}, currentColor 60%)`;
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [shimmerDone]);

  const textStyle: React.CSSProperties = {
    fontFamily: v.fontFamily,
    fontWeight: v.fontWeight,
    fontSize,
    display: "inline-block",
  };

  return (
    <span
      ref={(node: HTMLSpanElement | null) => {
        textRef.current = node;
        shimmerRef.current = node;
      }}
      className={shimmerDone ? "shimmer-logo-gold" : "shimmer shimmer-logo-gold"}
      style={textStyle}
      role="img"
      aria-label="Chords"
    >
      Chords
    </span>
  );
}
