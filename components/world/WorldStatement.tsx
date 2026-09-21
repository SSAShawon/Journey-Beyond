"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorldStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;

    if (!section || !heading || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        {
          y: 100,
          opacity: 0,
          scale: 0.92,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        text,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="world"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#07111f] px-6 py-32"
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8]/10 blur-[140px]" />

      {/* Orange Glow */}
      <div className="pointer-events-none absolute left-[15%] top-[25%] h-40 w-40 rounded-full bg-[#ff8a3d]/10 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p className="mb-8 text-xs font-medium tracking-[0.35em] text-[#f5c76b]/70">
          THERE IS MORE OUT THERE
        </p>

        <h2
          ref={headingRef}
          className="font-display text-[3.5rem] leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[7.5rem]"
        >
          THE WORLD
          <br />
          <span className="text-gradient">AWAITS YOU.</span>
        </h2>

        <p
          ref={textRef}
          className="mx-auto mt-10 max-w-2xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8"
        >
          Beyond the familiar roads are places that change the way you see
          the world. Mountains, oceans, hidden streets and unforgettable
          moments are waiting to become part of your story.
        </p>

        {/* Decorative Line */}
        <div className="mx-auto mt-14 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-white/10" />

          <span className="h-2 w-2 rounded-full bg-[#ff8a3d] shadow-[0_0_20px_rgba(255,138,61,0.6)]" />

          <span className="h-px w-12 bg-white/10" />
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07111f] to-transparent" />
    </section>
  );
}