"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Explore", href: "#explore" },
  { label: "Destinations", href: "#destinations" },
  { label: "Journeys", href: "#journeys" },
  { label: "Stay", href: "#stay" },
  { label: "Taste", href: "#taste" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full px-5 transition-all duration-500 md:px-8 ${
          scrolled ? "pt-4" : "pt-6"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "border border-white/10 bg-[#07111f]/70 shadow-2xl backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="group relative z-10 flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm transition-transform duration-500 group-hover:rotate-45">
              ✦
            </span>

            <span className="text-sm font-semibold tracking-[0.2em] text-white">
              JOURNEY
              <span className="text-white/50"> BEYOND</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-sm text-white/70 transition-colors duration-300 hover:text-white"
              >
                {item.label}

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#journey"
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#07111f] transition-all duration-300 hover:scale-105 hover:bg-[#ffb067] lg:flex"
          >
            Start Journey
            <ArrowUpRight size={15} />
          </a>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#07111f] transition-all duration-500 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8">
          <p className="mb-8 text-xs tracking-[0.3em] text-white/40">
            EXPLORE THE WORLD
          </p>

          <div className="flex flex-col gap-5">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`font-display text-4xl text-white transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#journey"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 rounded-full bg-[#ff8a3d] px-6 py-3 text-sm font-medium text-[#07111f]"
            >
              Start Journey
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}