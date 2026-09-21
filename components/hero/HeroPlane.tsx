"use client";

export default function HeroPlane() {
  return (
    <div className="pointer-events-none absolute right-[-5%] top-[32%] z-10 animate-[planeFlight_12s_ease-in-out_infinite] sm:right-[5%] lg:right-[12%]">
      <div className="relative rotate-[-8deg]">
        {/* Flight trail */}
        <div className="absolute right-full top-1/2 h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-white/70 sm:w-40 lg:w-56" />

        {/* Plane */}
        <div className="text-4xl drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl">
          ✈
        </div>
      </div>
    </div>
  );
}