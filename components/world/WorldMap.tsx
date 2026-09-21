"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X } from "lucide-react";

import { destinations } from "@/components/world/LeafletMap";

const LeafletMap = dynamic(
  () => import("@/components/world/LeafletMap"),
  {
    ssr: false,
  },
);

gsap.registerPlugin(ScrollTrigger);

export default function WorldMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [selectedDestination, setSelectedDestination] = useState<
    (typeof destinations)[number] | null
  >(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mapWrapper = mapWrapperRef.current;

    if (!section || !mapWrapper) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapWrapper,
        {
          y: 80,
          scale: 0.94,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        ".real-map-header",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".real-map-overlay",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const card = cardRef.current;

    if (!card || !selectedDestination) return;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 20,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
      },
    );
  }, [selectedDestination]);

  const closeCard = () => {
    const card = cardRef.current;

    if (!card) {
      setSelectedDestination(null);
      return;
    }

    gsap.to(card, {
      opacity: 0,
      y: 15,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setSelectedDestination(null);
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="relative overflow-hidden bg-[#07111f] px-5 py-28 sm:px-8 md:py-36 lg:px-10"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#38bdf8]/5 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-[#ff8a3d]/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="real-map-header mb-14 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.35em] text-[#ff8a3d]">
              CHOOSE YOUR HORIZON
            </p>

            <h2 className="font-display text-5xl leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              WHERE WILL
              <br />
              <span className="text-gradient">YOU GO?</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/40">
            From quiet mountain villages to distant islands, every point on
            the map holds a story waiting to be discovered.
          </p>
        </div>

        {/* Real World Map */}
        <div
          ref={mapWrapperRef}
          className="relative h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a1725] shadow-2xl md:h-[650px]"
        >
          <LeafletMap
            selectedDestination={selectedDestination}
            onSelect={setSelectedDestination}
          />

          {/* Cinematic Overlay */}
          <div className="real-map-overlay pointer-events-none absolute inset-0 z-[400]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_25%,rgba(7,17,31,0.22)_100%)]" />

            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07111f]/45 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07111f]/70 to-transparent" />

            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07111f]/25 to-transparent" />

            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07111f]/25 to-transparent" />
          </div>

          {/* Top Label */}
          <div className="pointer-events-none absolute right-5 top-5 z-[401] rounded-full border border-white/10 bg-[#07111f]/70 px-4 py-2 backdrop-blur-xl sm:right-6 sm:top-6">
            <p className="text-[9px] tracking-[0.25em] text-white/45">
              05 DESTINATIONS
            </p>
          </div>

          {/* Bottom Label */}
          <div className="pointer-events-none absolute bottom-5 right-5 z-[401] hidden sm:block sm:bottom-6 sm:right-6">
            <p className="text-[9px] tracking-[0.3em] text-white/35">
              EXPLORE THE WORLD
            </p>
          </div>

          {/* Destination Card */}
          {selectedDestination && (
            <div
              ref={cardRef}
              className="absolute bottom-5 left-5 z-[402] w-[calc(100%-2.5rem)] max-w-sm rounded-2xl border border-white/10 bg-[#07111f]/90 p-5 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-6"
            >
              <button
                type="button"
                onClick={closeCard}
                aria-label="Close destination"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                <X size={15} />
              </button>

              <p className="text-[10px] tracking-[0.3em] text-[#ff8a3d]">
                DESTINATION
              </p>

              <h3 className="mt-2 pr-8 font-display text-3xl text-white">
                {selectedDestination.name}
              </h3>

              <p className="mt-1 text-xs text-white/40">
                {selectedDestination.country}
              </p>

              <p className="mt-4 text-sm leading-6 text-white/55">
                {selectedDestination.description}
              </p>

              <button
                type="button"
                className="group mt-5 inline-flex items-center gap-2 text-xs font-medium text-white transition-colors duration-300 hover:text-[#ffb067]"
              >
                Explore destination

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          )}

          {/* Map Corner */}
          <div className="pointer-events-none absolute bottom-5 left-5 z-[401] hidden sm:block sm:bottom-6 sm:left-6">
            <p className="text-[9px] tracking-[0.3em] text-white/30">
              JOURNEY BEGINS HERE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}