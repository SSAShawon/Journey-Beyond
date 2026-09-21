"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroPlane() {
  const planeRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plane = planeRef.current;
    const trail = trailRef.current;

    if (!plane || !trail) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: "sine.inOut",
        },
      });

      timeline
        .to(plane, {
          x: -40,
          y: -20,
          rotation: -6,
          duration: 3,
        })
        .to(plane, {
          x: -100,
          y: 10,
          rotation: -2,
          duration: 4,
        })
        .to(plane, {
          x: -55,
          y: 35,
          rotation: 5,
          duration: 3,
        })
        .to(plane, {
          x: 0,
          y: 0,
          rotation: -2,
          duration: 4,
        });

      gsap.to(trail, {
        opacity: 0.35,
        scaleX: 0.75,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, plane);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute right-[2%] top-[30%] z-20 sm:right-[8%] lg:right-[14%]">
      <div ref={planeRef} className="relative">
        {/* Flight Trail */}
        <div
          ref={trailRef}
          className="absolute right-full top-1/2 h-px w-28 origin-right bg-gradient-to-l from-white/70 via-white/30 to-transparent sm:w-44 lg:w-64"
        />

        {/* Glow */}
        <div className="absolute inset-0 scale-150 rounded-full bg-sky-300/10 blur-xl" />

        {/* Plane */}
        <div className="relative rotate-[-8deg] text-3xl drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-4xl lg:text-5xl">
          ✈
        </div>
      </div>
    </div>
  );
}