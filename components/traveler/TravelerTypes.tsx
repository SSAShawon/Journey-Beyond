"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Compass } from "lucide-react";
import { travelerTypes } from "@/data/travelers";

export default function TravelerTypes() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(travelerTypes[0].id);

  const activeTraveler =
    travelerTypes.find((traveler) => traveler.id === activeId) ??
    travelerTypes[0];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".traveler-header",
        {
          y: 70,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        ".traveler-content",
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".traveler-content",
            start: "top 82%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 1.08,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      },
    );
  }, [activeId]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!imageRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = x / rect.width - 0.5;
    const percentY = y / rect.height - 0.5;

    gsap.to(imageRef.current, {
      x: percentX * 14,
      y: percentY * 14,
      scale: 1.04,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#07111f] px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="traveler-header mb-16 max-w-3xl md:mb-24">
          <p className="mb-5 flex items-center gap-3 text-xs font-medium tracking-[0.35em] text-[#ff8a3d]">
            <Compass size={14} />
            FIND YOUR TRAVELER TYPE
          </p>

          <h2 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-7xl">
            How do you
            <br />
            <span className="text-white/40">see the world?</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/45 md:text-base">
            There is no single way to travel. Discover the kind of journey
            that feels most like you.
          </p>
        </div>

        {/* Main Content */}
        <div className="traveler-content grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Types */}
          <div className="flex flex-col gap-2">
            {travelerTypes.map((traveler) => {
              const isActive = traveler.id === activeId;

              return (
                <button
                  key={traveler.id}
                  type="button"
                  onClick={() => setActiveId(traveler.id)}
                  onMouseEnter={() => setActiveId(traveler.id)}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ${
                    isActive
                      ? "border-white/20 bg-white/[0.07]"
                      : "border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Active Accent */}
                  <div
                    className={`absolute bottom-0 left-0 top-0 w-1 transition-all duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      backgroundColor: traveler.accent,
                    }}
                  />

                  <div className="relative flex items-center gap-5">
                    <span
                      className={`font-display text-2xl transition-colors duration-500 ${
                        isActive ? "text-white" : "text-white/20"
                      }`}
                    >
                      {traveler.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-display text-2xl transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/50"
                        }`}
                      >
                        {traveler.name}
                      </h3>

                      <p
                        className={`mt-1 text-xs transition-colors duration-500 ${
                          isActive ? "text-white/50" : "text-white/20"
                        }`}
                      >
                        {traveler.tagline}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className={`transition-all duration-500 ${
                        isActive
                          ? "rotate-45 text-white"
                          : "text-white/20"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Featured Traveler */}
          <div
            className="group relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1928] md:min-h-[620px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Image */}
            <div
              ref={imageRef}
              key={activeTraveler.id}
              className="absolute inset-[-2%] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${activeTraveler.image}")`,
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/35 to-transparent" />

            {/* Accent Atmosphere */}
            <div
              className="absolute inset-0 opacity-25 mix-blend-screen transition-all duration-700"
              style={{
                background: `radial-gradient(circle at 75% 20%, ${activeTraveler.accent} 0%, transparent 48%)`,
              }}
            />

            {/* Top Info */}
            <div className="absolute left-6 right-6 top-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-white/50">
                  YOUR TYPE
                </p>

                <p className="mt-1 font-display text-2xl text-white">
                  {activeTraveler.number}
                </p>
              </div>

              <div
                className="h-3 w-3 rounded-full shadow-[0_0_25px_currentColor]"
                style={{
                  backgroundColor: activeTraveler.accent,
                  color: activeTraveler.accent,
                }}
              />
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p
                className="text-[10px] tracking-[0.3em]"
                style={{
                  color: activeTraveler.accent,
                }}
              >
                YOUR JOURNEY STYLE
              </p>

              <h3 className="mt-2 font-display text-4xl text-white sm:text-5xl md:text-6xl">
                {activeTraveler.name}
              </h3>

              <p className="mt-2 font-display text-xl italic text-white/60">
                {activeTraveler.tagline}
              </p>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
                {activeTraveler.description}
              </p>

              {/* Traits */}
              <div className="mt-6 flex flex-wrap gap-2">
                {activeTraveler.traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[9px] tracking-[0.2em] text-white/60 backdrop-blur-md"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Border Glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent transition-all duration-700"
              style={{
                boxShadow: `inset 0 0 100px ${activeTraveler.accent}12`,
              }}
            />

            {/* Light Sweep */}
            <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#ff8a3d]/5 blur-[140px]" />
    </section>
  );
}