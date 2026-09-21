"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Star } from "lucide-react";
import { stays } from "@/data/stays";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryStay() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stay-header",
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
            duration: 1.1,
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
      x: percentX * 18,
      y: percentY * 18,
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
      id="stay"
      className="relative overflow-hidden bg-[#0c1928] px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="stay-header mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-medium tracking-[0.35em] text-[#f5c76b]">
              STAY SOMEWHERE EXTRAORDINARY
            </p>

            <h2 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-7xl">
              Where you stay
              <br />
              <span className="text-white/40">becomes part of the journey.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/45 md:text-right md:text-base">
            From hidden jungle villas to quiet mountain lodges, discover places
            that make the destination feel even more unforgettable.
          </p>
        </div>

        {/* Stay Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stays.map((stay, index) => (
            <div
              key={stay.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element;
                }
              }}
              className="stay-card group relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] md:min-h-[560px]"
              onMouseMove={(event) => {
                const image = event.currentTarget.querySelector(
                  ".stay-image",
                ) as HTMLDivElement | null;

                if (image) {
                  handleMouseMove(event, image);
                }
              }}
              onMouseLeave={(event) => {
                const image = event.currentTarget.querySelector(
                  ".stay-image",
                ) as HTMLDivElement | null;

                if (image) {
                  handleMouseLeave(event.currentTarget, image);
                }
              }}
            >
              {/* Image */}
              <div
                className="stay-image absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("${stay.image}")`,
                }}
              />

              {/* Main Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/45 to-transparent" />

              {/* Cinematic Color Wash */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-screen transition-opacity duration-700 group-hover:opacity-35"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${stay.accent} 0%, transparent 45%)`,
                }}
              />

              {/* Top Info */}
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[9px] tracking-[0.25em] text-white/70 backdrop-blur-md">
                  {stay.category}
                </span>

                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
                  <Star
                    size={11}
                    fill="currentColor"
                    className="text-[#f5c76b]"
                  />
                  <span className="text-[10px] text-white/80">5.0</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <p
                  className="text-[10px] tracking-[0.3em]"
                  style={{ color: stay.accent }}
                >
                  {stay.location}
                </p>

                <h3 className="mt-2 font-display text-4xl text-white md:text-5xl">
                  {stay.name}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-6 text-white/55">
                  {stay.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs tracking-[0.15em] text-white/70">
                    {stay.price}
                  </span>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#07111f] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ffb067]"
                    aria-label={`Explore ${stay.name}`}
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>

              {/* Hover Border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent transition-all duration-700 group-hover:border-white/25"
                style={{
                  boxShadow: `inset 0 0 80px ${stay.accent}10`,
                }}
              />

              {/* Light Sweep */}
              <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Ambient Background */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#f5c76b]/5 blur-[140px]" />
    </section>
  );
}