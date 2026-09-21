"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { tastes } from "@/data/tastes";

gsap.registerPlugin(ScrollTrigger);

export default function TasteExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".taste-header",
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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    image: HTMLDivElement,
  ) => {
    const card = event.currentTarget;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = x / rect.width - 0.5;
    const percentY = y / rect.height - 0.5;

    gsap.to(image, {
      x: percentX * 16,
      y: percentY * 16,
      scale: 1.08,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(card, {
      rotateX: percentY * -3,
      rotateY: percentX * 3,
      transformPerspective: 1000,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (
    card: HTMLDivElement,
    image: HTMLDivElement,
  ) => {
    gsap.to(image, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="taste"
      className="relative overflow-hidden bg-[#07111f] px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="taste-header mb-16 max-w-3xl md:mb-24">
          <p className="mb-5 text-xs font-medium tracking-[0.35em] text-[#ff8a3d]">
            TASTE THE WORLD
          </p>

          <h2 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-7xl">
            Some memories
            <br />
            <span className="text-white/40">are meant to be tasted.</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/45 md:text-base">
            Travel through flavor, tradition and local culture. Because
            discovering a place often begins at the table.
          </p>
        </div>

        {/* Taste Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tastes.map((taste, index) => (
            <div
              key={taste.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element;
                }
              }}
              className="taste-card group relative min-h-[480px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1928] md:min-h-[560px]"
              onMouseMove={(event) => {
                const image = event.currentTarget.querySelector(
                  ".taste-image",
                ) as HTMLDivElement | null;

                if (image) {
                  handleMouseMove(event, image);
                }
              }}
              onMouseLeave={(event) => {
                const image = event.currentTarget.querySelector(
                  ".taste-image",
                ) as HTMLDivElement | null;

                if (image) {
                  handleMouseLeave(event.currentTarget, image);
                }
              }}
            >
              {/* Image */}
              <div
                className="taste-image absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("${taste.image}")`,
                }}
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/45 to-transparent" />

              {/* Color Atmosphere */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-screen transition-opacity duration-700 group-hover:opacity-35"
                style={{
                  background: `radial-gradient(circle at 75% 20%, ${taste.accent} 0%, transparent 48%)`,
                }}
              />

              {/* Top Label */}
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[9px] tracking-[0.25em] text-white/70 backdrop-blur-md">
                  {taste.region}
                </span>

                <span className="text-xs text-white/40">
                  0{index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p
                  className="text-[10px] tracking-[0.3em]"
                  style={{ color: taste.accent }}
                >
                  {taste.country}
                </p>

                <h3 className="mt-2 font-display text-3xl text-white md:text-4xl">
                  {taste.name}
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  {taste.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-[10px] tracking-[0.25em] text-white/40">
                    DISCOVER THE FLAVOR
                  </span>

                  <button
                    type="button"
                    aria-label={`Explore ${taste.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#07111f] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ffb067]"
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>

              {/* Border Glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent transition-all duration-700 group-hover:border-white/25"
                style={{
                  boxShadow: `inset 0 0 80px ${taste.accent}12`,
                }}
              />

              {/* Light Sweep */}
              <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#ff8a3d]/5 blur-[140px]" />
    </section>
  );
}