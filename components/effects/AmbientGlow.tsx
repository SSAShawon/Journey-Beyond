"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;

    if (!glow) return;

    const mediaQuery = window.matchMedia("(pointer: fine)");

    if (!mediaQuery.matches) return;

    const moveGlow = (event: MouseEvent) => {
      gsap.to(glow, {
        x: event.clientX * 0.08,
        y: event.clientY * 0.06,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a3d]/10 blur-[120px] md:h-[600px] md:w-[600px]"
    />
  );
}