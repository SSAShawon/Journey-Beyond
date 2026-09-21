"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroBackground from "./HeroBackground";
import HeroParallax from "./HeroParallax";
import HeroPlane from "./HeroPlane";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Cinematic text reveal
  useEffect(() => {
    const content = heroContentRef.current;

    if (!content) return;

    const elements = content.querySelectorAll("[data-hero-reveal]");

    gsap.set(elements, {
      y: 40,
      opacity: 0,
    });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    timeline.to(elements, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.18,
    });

    return () => {
      timeline.kill();
    };
  }, []);

  // Hero scroll transition
  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap.to(hero, {
        scale: 0.92,
        opacity: 0.35,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="explore"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#07111f] will-change-transform"
    >
      {/* Background Travel Image */}
      <HeroParallax />

      {/* Atmospheric Background */}
      <HeroBackground />

      {/* Animated Airplane */}
      <HeroPlane />

      {/* Main Content */}
      <div
        ref={heroContentRef}
        className="relative z-30 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-32 sm:px-8 lg:px-10"
      >
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div
            data-hero-reveal
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#ff8a3d]" />

            <p className="text-xs font-medium tracking-[0.3em] text-white/60 sm:text-sm">
              A JOURNEY BEYOND THE ORDINARY
            </p>
          </div>

          {/* Main Heading */}
          <h1
            data-hero-reveal
            className="font-display text-[4rem] leading-[0.88] tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[9rem]"
          >
            THE
            <br />
            <span className="text-gradient">WORLD</span>
            <br />
            <span className="text-white/90">AWAITS.</span>
          </h1>

          {/* Description */}
          <p
            data-hero-reveal
            className="mt-8 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8"
          >
            Leave the ordinary behind and discover places, stories and
            experiences that turn every journey into something unforgettable.
          </p>

          {/* Buttons */}
          <div
            data-hero-reveal
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#destinations"
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#07111f] transition-all duration-500 hover:scale-105 hover:bg-[#ffb067]"
            >
              Explore the world

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#journeys"
              className="inline-flex w-fit items-center rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/75 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              Discover journeys
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] text-white/35">
            SCROLL TO EXPLORE
          </span>

          <div className="h-12 w-px overflow-hidden bg-white/10">
            <div className="h-1/2 w-full animate-bounce bg-white/60" />
          </div>
        </div>
      </div>

      {/* Hero Corner Text */}
      <div className="absolute bottom-8 right-8 z-30 hidden text-right lg:block">
        <p className="text-[10px] tracking-[0.25em] text-white/30">
          EST. 2026
        </p>

        <p className="mt-1 text-xs text-white/50">
          EVERY JOURNEY
          <br />
          BEGINS SOMEWHERE
        </p>
      </div>
    </section>
  );
}