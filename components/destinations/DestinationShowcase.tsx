"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destinations } from "@/data/destinations";

gsap.registerPlugin(ScrollTrigger);

export default function DestinationShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".destination-heading",
        {
          y: 80,
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
            end: "top 45%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".destination-card",
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
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    image: HTMLDivElement,
  ) => {
    const card = event.currentTarget.parentElement;

    if (!card) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = x / rect.width - 0.5;
    const percentY = y / rect.height - 0.5;

    const moveX = percentX * 18;
    const moveY = percentY * 18;

    const rotateY = percentX * 4;
    const rotateX = percentY * -4;

    gsap.to(image, {
      x: moveX,
      y: moveY,
      scale: 1.08,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (image: HTMLDivElement) => {
    const card = image.closest(".destination-card");

    gsap.to(image, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });

    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="relative overflow-hidden bg-[#07111f] px-6 py-32 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="destination-heading mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.35em] text-[#ff8a3d]">
              DESTINATIONS
            </p>

            <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              PLACES
              <br />
              <span className="text-gradient">WORTH FINDING.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/40">
            Some places are visited. Others become part of your story. Discover
            destinations that stay with you long after the journey ends.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {destinations.map((destination, index) => (
            <article
              key={destination.id}
              className={`destination-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1928] transition-transform duration-500 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "aspect-[21/10]" : "aspect-[4/5]"
                }`}
                onMouseMove={(event) => {
                  const image = event.currentTarget.querySelector(
                    ".destination-image",
                  ) as HTMLDivElement | null;

                  if (image) {
                    handleMouseMove(event, image);
                  }
                }}
                onMouseLeave={(event) => {
                  const image = event.currentTarget.querySelector(
                    ".destination-image",
                  ) as HTMLDivElement | null;

                  if (image) {
                    handleMouseLeave(image);
                  }
                }}
              >
                <div
                  className="destination-image absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url("${destination.image}")`,
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111f]/90 via-[#07111f]/20 to-transparent" />

                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 70% 30%, ${destination.accent}22, transparent 45%)`,
                  }}
                />
                <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />

                <div className="absolute left-6 top-6 flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.3em] text-white/40">
                    0{index + 1}
                  </span>

                  <span className="h-px w-8 bg-white/20" />

                  <span className="text-[10px] tracking-[0.25em] text-white/40">
                    {destination.region}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <p
                    className="mb-3 text-xs tracking-[0.25em]"
                    style={{ color: destination.accent }}
                  >
                    {destination.country}
                  </p>

                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                      <h3 className="font-display text-4xl leading-none tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                        {destination.name}
                      </h3>

                      <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
                        {destination.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="group/button flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-white/40 hover:bg-white hover:text-[#07111f]"
                      aria-label={`Explore ${destination.name}`}
                    >
                      <span className="text-lg transition-transform duration-300 group-hover/button:rotate-45">
                        ↗
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-[-10rem] top-1/3 h-[25rem] w-[25rem] rounded-full bg-[#38bdf8]/5 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-10rem] bottom-10 h-[30rem] w-[30rem] rounded-full bg-[#ff8a3d]/5 blur-[160px]" />
    </section>
  );
}
