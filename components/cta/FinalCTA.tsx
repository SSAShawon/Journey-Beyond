"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import AmbientGlow from "../effects/AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const horizon = horizonRef.current;

    if (!section || !horizon) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );

      gsap.to(horizon, {
        yPercent: -15,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".cta-glow", {
        scale: 1.25,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#07111f] px-5 py-28 md:min-h-screen md:px-8"
    >
      <AmbientGlow />
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(255,138,61,0.14),transparent_32%),radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.08),transparent_30%)]" />

      {/* Horizon Glow */}
      <div
        ref={horizonRef}
        className="absolute left-1/2 top-[58%] h-[45vh] w-[90vw] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#ff8a3d]/20 via-[#f5c76b]/10 to-transparent blur-[80px]"
      />

      {/* Sun */}
      <div className="cta-glow absolute left-1/2 top-[55%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5c76b]/25 blur-[30px] md:h-48 md:w-48" />

      {/* Horizon Line */}
      <div className="absolute left-0 right-0 top-[58%] h-px bg-gradient-to-r from-transparent via-[#f5c76b]/30 to-transparent" />

      {/* Stars / Particles */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[12%] top-[22%] h-1 w-1 animate-pulse rounded-full bg-white/50" />
        <span className="absolute left-[25%] top-[35%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/30 [animation-delay:700ms]" />
        <span className="absolute right-[18%] top-[24%] h-1 w-1 animate-pulse rounded-full bg-[#38bdf8]/70 [animation-delay:1200ms]" />
        <span className="absolute right-[30%] top-[40%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/30 [animation-delay:500ms]" />
        <span className="absolute left-[42%] top-[17%] h-1 w-1 animate-pulse rounded-full bg-[#f5c76b]/60 [animation-delay:1500ms]" />
      </div>

      {/* Main Content */}
      <div className="cta-content relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-6 text-xs font-medium tracking-[0.4em] text-[#ffb067]">
          YOUR NEXT CHAPTER
        </p>

        <h2 className="font-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl lg:text-[9rem]">
          The world
          <br />
          <span className="text-white/35">is waiting.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/45 md:text-base">
          There are roads you haven`t taken, places you haven`t seen and
          stories you haven`t lived yet.
        </p>

        {/* CTA */}
        <a
          href="#"
          className="group mx-auto mt-10 inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-sm font-medium text-[#07111f] transition-all duration-500 hover:scale-105 hover:bg-[#ffb067] md:px-8 md:py-4"
        >
          Begin Your Journey

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#07111f] text-white transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
        </a>

        <p className="mt-8 text-[9px] tracking-[0.3em] text-white/20">
          GO SOMEWHERE YOU&apos;VE NEVER BEEN
        </p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#07111f] to-transparent" />
    </section>
  );
}