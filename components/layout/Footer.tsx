"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Explore", href: "#explore" },
  { label: "Destinations", href: "#destinations" },
  { label: "Journeys", href: "#journeys" },
  { label: "Stay", href: "#stay" },
  { label: "Taste", href: "#taste" },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
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
            trigger: footer,
            start: "top 85%",
          },
        },
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#07111f] px-5 pb-8 pt-20 md:px-8 md:pt-28"
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#38bdf8]/5 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-[#ff8a3d]/5 blur-[140px]" />

      <div className="footer-content relative z-10 mx-auto max-w-7xl">
        {/* Main Footer */}
        <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-[1.4fr_0.6fr_0.6fr] md:pb-20">
          {/* Brand */}
          <div className="max-w-xl">
            <a href="#" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-[#ff8a3d]/50">
                ✦
              </span>

              <span className="text-sm font-semibold tracking-[0.2em] text-white">
                JOURNEY
                <span className="text-white/40"> BEYOND</span>
              </span>
            </a>

            <h2 className="mt-8 max-w-lg font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Go somewhere
              <br />
              <span className="text-white/30">worth remembering.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
              A cinematic invitation to explore new places, experience new
              cultures and collect stories that stay with you.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="mb-6 text-[10px] tracking-[0.3em] text-[#f5c76b]">
              EXPLORE
            </p>

            <div className="flex flex-col items-start gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white"
                >
                  <span>{link.label}</span>

                  <ArrowUpRight
                    size={13}
                    className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-6 text-[10px] tracking-[0.3em] text-[#38bdf8]">
              CONNECT
            </p>

            <div className="flex flex-col gap-4">
              {socials.map((social) => {
                

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="group flex items-center gap-3 text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/5">
                      
                    </span>

                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-6 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-[10px] tracking-[0.2em] text-white/25">
              © 2026 JOURNEY BEYOND
            </p>

            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

            <p className="text-[10px] tracking-[0.2em] text-white/20">
              MADE FOR THE CURIOUS
            </p>
          </div>

          <a
            href="#"
            className="group flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-white"
          >
            BACK TO TOP

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/25">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}