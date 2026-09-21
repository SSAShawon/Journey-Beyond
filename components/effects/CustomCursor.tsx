"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    const mediaQuery = window.matchMedia("(pointer: fine)");

    if (!mediaQuery.matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.set([dot, ring], {
      opacity: 0,
    });

    const showCursor = () => {
      gsap.to([dot, ring], {
        opacity: 1,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", showCursor, { once: true });

    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
    });

    const moveCursor = (event: MouseEvent) => {
      gsap.to(dot, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(ring, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const handleEnter = () => {
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "rgba(255, 176, 103, 0.8)",
        backgroundColor: "rgba(255, 138, 61, 0.08)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(dot, {
        scale: 0.65,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.35)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const updateInteractiveElements = () => {
      const elements = document.querySelectorAll("a, button, [role='button']");

      elements.forEach((element) => {
        element.addEventListener("mouseenter", handleEnter);
        element.addEventListener("mouseleave", handleLeave);
      });

      return elements;
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = updateInteractiveElements();

    return () => {
      window.removeEventListener("mousemove", showCursor);
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full bg-[#ffb067] md:block"
      />

      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-9 w-9 rounded-full border border-white/35 md:block"
      />
    </>
  );
}
