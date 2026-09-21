"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    number: "01",
    location: "THE BEGINNING",
    title: "Dream Beyond",
    description:
      "Every unforgettable journey begins with a single thought — somewhere beyond the familiar, there is more to discover.",
    image: "/images/journeys/journey-01.jpg",
  },
  {
    number: "02",
    location: "THE DEPARTURE",
    title: "Leave The Ordinary",
    description:
      "Pack light, follow the horizon and step outside the world you already know.",
    image: "/images/journeys/journey-02.jpg",
  },
  {
    number: "03",
    location: "THE DISCOVERY",
    title: "Find Your Story",
    description:
      "Meet new places, taste unfamiliar flavors and collect moments that become part of who you are.",
    image: "/images/journeys/journey-03.jpg",
  },
  {
    number: "04",
    location: "THE RETURN",
    title: "Come Back Different",
    description:
      "The best journeys don't simply take you somewhere. They bring you home with a new perspective.",
    image: "/images/journeys/journey-04.jpg",
  },
];

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;

    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(
        line,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // Journey step animations
      stepsRef.current.forEach((step) => {
        if (!step) return;

        // Active step
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => step.classList.add("journey-active"),
          onEnterBack: () => step.classList.add("journey-active"),
          onLeave: () => step.classList.remove("journey-active"),
          onLeaveBack: () => step.classList.remove("journey-active"),
        });

        // Reveal animation
        gsap.fromTo(
          step,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journeys"
      className="relative overflow-hidden bg-[#07111f] px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-24 max-w-3xl md:mb-32">
          <p className="mb-5 text-xs font-medium tracking-[0.35em] text-[#ff8a3d]">
            YOUR JOURNEY
          </p>

          <h2 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-7xl">
            Every journey
            <br />
            <span className="text-white/40">changes you.</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 md:text-base">
            From the first dream to the moment you return home, every step
            becomes part of a story worth remembering.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

          {/* Animated Line */}
          <div
            ref={lineRef}
            className="absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-[#ff8a3d] via-[#f5c76b] to-[#38bdf8] md:left-1/2 md:-translate-x-1/2"
          />

          {/* Journey Steps */}
          <div className="flex flex-col gap-24 md:gap-32">
            {journeySteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  ref={(element) => {
                    if (element) {
                      stepsRef.current[index] = element;
                    }
                  }}
                  className="journey-step relative grid items-center md:grid-cols-2"
                >
                  {/* Timeline Marker */}
                  <div className="absolute left-0 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#07111f] md:left-1/2 md:-translate-x-1/2">
                    <span className="timeline-dot relative h-2.5 w-2.5 rounded-full bg-[#ff8a3d] shadow-[0_0_20px_#ff8a3d]">
                      <span className="absolute inset-[-7px] rounded-full border border-[#ff8a3d]/40" />
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`relative pl-12 md:pl-0 ${
                      isEven
                        ? "md:pr-20 md:text-right"
                        : "md:col-start-2 md:pl-20"
                    }`}
                  >
                    {/* Decorative Number */}
                    <span
                      className={`pointer-events-none absolute -top-16 hidden select-none text-[8rem] font-light leading-none text-white/[0.035] lg:block ${
                        isEven
                          ? "right-10"
                          : "left-10"
                      }`}
                    >
                      {step.number}
                    </span>

                    <p className="relative text-xs tracking-[0.3em] text-[#38bdf8]">
                      {step.location}
                    </p>

                    <h3 className="relative mt-3 font-display text-3xl text-white sm:text-4xl md:text-5xl">
                      {step.title}
                    </h3>

                    <p className="relative mt-4 max-w-xl text-sm leading-7 text-white/45 md:text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Journey Image */}
                  <div
                    className={`group relative mt-8 h-56 overflow-hidden rounded-[1.5rem] border border-white/10 md:mt-0 md:h-72 ${
                      isEven
                        ? "md:col-start-2 md:ml-20"
                        : "md:col-start-1 md:row-start-1 md:mr-20"
                    }`}
                  >
                    {/* Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out group-hover:scale-110"
                      style={{
                        backgroundImage: `url("${step.image}")`,
                      }}
                    />

                    {/* Dark Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/80 via-[#07111f]/10 to-transparent" />

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-[#ff8a3d]/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                    {/* Image Label */}
                    <div className="absolute bottom-4 left-4">
                      <p className="text-[10px] tracking-[0.3em] text-white/60">
                        JOURNEY {step.number}
                      </p>
                    </div>

                    {/* Image Border Glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] border border-white/0 transition-colors duration-700 group-hover:border-white/20" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8]/5 blur-[120px]" />
    </section>
  );
}