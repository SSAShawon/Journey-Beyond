"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;

    if (!background) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      background.style.setProperty("--mouse-x", `${x}`);
      background.style.setProperty("--mouse-y", `${y}`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="absolute inset-0 z-10 overflow-hidden"
      style={
        {
          "--mouse-x": "0",
          "--mouse-y": "0",
        } as React.CSSProperties
      }
    >
      {/* Atmospheric Base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(35,79,112,0.45)_0%,rgba(12,36,57,0.35)_35%,rgba(7,17,31,0.45)_70%,rgba(2,7,17,0.7)_100%)]" />

      {/* Sky Glow */}
      <div
        className="absolute left-1/2 top-[8%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-sky-300/10 blur-[120px] transition-transform duration-[2000ms] ease-out"
        style={{
          transform:
            "translate(calc(-50% + var(--mouse-x) * 35px), calc(var(--mouse-y) * 25px))",
        }}
      />

      {/* Sun Glow */}
      <div
        className="absolute left-[48%] top-[18%] h-24 w-24 rounded-full bg-orange-200/20 blur-2xl sm:h-32 sm:w-32"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -14px))",
        }}
      />

      {/* Sun Core */}
      <div className="absolute left-[48.5%] top-[19%] h-12 w-12 rounded-full bg-orange-100/30 blur-md sm:h-16 sm:w-16" />

      {/* Upper Clouds */}
      <div
        className="absolute -left-[10%] top-[18%] h-24 w-[120%] opacity-30 blur-sm"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -4px))",
        }}
      >
        <div className="absolute left-[5%] h-20 w-64 rounded-full bg-white/15 blur-xl" />

        <div className="absolute left-[30%] h-28 w-80 rounded-full bg-white/10 blur-xl" />

        <div className="absolute right-[20%] h-24 w-72 rounded-full bg-white/10 blur-xl" />
      </div>

      {/* Moving Clouds */}
      <div className="absolute -left-[20%] top-[34%] h-32 w-[140%] animate-[cloudDrift_30s_linear_infinite] opacity-25 blur-md">
        <div className="absolute left-[5%] h-28 w-72 rounded-full bg-white/20 blur-2xl" />

        <div className="absolute left-[40%] h-32 w-96 rounded-full bg-white/15 blur-2xl" />

        <div className="absolute right-[5%] h-24 w-80 rounded-full bg-white/15 blur-2xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute left-[12%] top-[25%] h-1 w-1 animate-[floatParticle_7s_ease-in-out_infinite] rounded-full bg-white/50" />

      <div className="absolute left-[20%] top-[55%] h-1.5 w-1.5 animate-[floatParticle_9s_ease-in-out_infinite_1s] rounded-full bg-white/30" />

      <div className="absolute right-[15%] top-[30%] h-1 w-1 animate-[floatParticle_8s_ease-in-out_infinite_2s] rounded-full bg-white/50" />

      <div className="absolute right-[25%] top-[58%] h-1.5 w-1.5 animate-[floatParticle_10s_ease-in-out_infinite_3s] rounded-full bg-orange-200/40" />

      <div className="absolute left-[45%] top-[12%] h-1 w-1 animate-pulse rounded-full bg-white/50" />

      {/* Distant Mountains */}
      <div
        className="absolute bottom-[18%] left-[-5%] h-[25%] w-[110%] opacity-40"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * -30px), calc(var(--mouse-y) * -15px))",
        }}
      >
        <div className="absolute bottom-0 left-0 h-full w-[45%] bg-gradient-to-tr from-[#07111f] via-[#18354a] to-transparent [clip-path:polygon(0_100%,30%_35%,45%_60%,65%_15%,100%_100%)]" />

        <div className="absolute bottom-0 right-0 h-full w-[55%] bg-gradient-to-tl from-[#07111f] via-[#142d42] to-transparent [clip-path:polygon(0_100%,25%_45%,42%_65%,65%_20%,100%_100%)]" />
      </div>

      {/* Horizon */}
      <div className="absolute bottom-[17%] left-0 h-px w-full bg-gradient-to-r from-transparent via-orange-200/20 to-transparent" />

      {/* Bottom Atmosphere */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#020711] via-[#07111f]/50 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,rgba(2,7,17,0.65)_100%)]" />

      {/* Film Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.8%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
