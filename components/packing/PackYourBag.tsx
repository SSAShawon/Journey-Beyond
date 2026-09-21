"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { packingItems } from "@/data/packing";

gsap.registerPlugin(ScrollTrigger);

export default function PackYourBag() {
  const sectionRef = useRef<HTMLElement>(null);
  const suitcaseRef = useRef<HTMLDivElement>(null);
  const [packedItems, setPackedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const progress = Math.round(
    (packedItems.length / packingItems.length) * 100,
  );

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".packing-header",
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
        suitcaseRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: suitcaseRef.current,
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".packing-item",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".packing-items",
            start: "top 82%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleItem = (itemId: string) => {
    const isPacked = packedItems.includes(itemId);

    if (isPacked) {
      setPackedItems((current) =>
        current.filter((id) => id !== itemId),
      );
      return;
    }

    setPackedItems((current) => [...current, itemId]);

    if (suitcaseRef.current) {
      gsap.fromTo(
        suitcaseRef.current,
        {
          rotate: -1,
          scale: 1,
        },
        {
          rotate: 1,
          scale: 1.015,
          duration: 0.12,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut",
        },
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="packing"
      className="relative overflow-hidden bg-[#0c1928] px-5 py-28 md:px-8 md:py-40"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#38bdf8]/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="packing-header max-w-3xl">
          <p className="mb-5 text-xs font-medium tracking-[0.35em] text-[#38bdf8]">
            BEFORE YOU GO
          </p>

          <h2 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-7xl">
            Pack the essentials.
            <br />
            <span className="text-white/40">Leave room for memories.</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/45 md:text-base">
            Choose what comes with you. The rest can wait for another
            adventure.
          </p>
        </div>

        {/* Main Experience */}
        <div className="mt-16 grid items-center gap-14 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Suitcase */}
          <div className="flex justify-center">
            <div
              ref={suitcaseRef}
              className="relative w-full max-w-[430px]"
            >
              {/* Suitcase Handle */}
              <div className="mx-auto h-14 w-28 rounded-t-2xl border-x-8 border-t-8 border-white/15" />

              {/* Suitcase */}
              <div className="relative rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-[#16283d] to-[#091522] p-5 shadow-2xl">
                {/* Outer Border */}
                <div className="relative min-h-[350px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] p-5">
                  {/* Suitcase Shine */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#38bdf8]/10 blur-[70px]" />

                  {/* Packed Items */}
                  <div className="relative flex min-h-[310px] flex-wrap content-start gap-3">
                    {packedItems.length === 0 ? (
                      <div className="flex min-h-[280px] w-full items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl opacity-30">✦</div>

                          <p className="mt-4 text-xs tracking-[0.25em] text-white/30">
                            YOUR BAG IS EMPTY
                          </p>

                          <p className="mt-2 text-sm text-white/20">
                            Start packing your adventure.
                          </p>
                        </div>
                      </div>
                    ) : (
                      packedItems.map((itemId) => {
                        const item = packingItems.find(
                          (packingItem) => packingItem.id === itemId,
                        );

                        if (!item) return null;

                        return (
                          <div
                            key={item.id}
                            className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg"
                          >
                            <span className="text-3xl">{item.icon}</span>

                            <span className="mt-1 text-[8px] tracking-wider text-white/40">
                              {item.name.toUpperCase()}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Suitcase Strap */}
                  <div className="pointer-events-none absolute bottom-0 left-1/2 h-full w-10 -translate-x-1/2 border-x border-white/5" />
                </div>

                {/* Suitcase Locks */}
                <div className="absolute -bottom-2 left-16 h-5 w-10 rounded-b-lg border border-white/15 bg-[#101f30]" />
                <div className="absolute -bottom-2 right-16 h-5 w-10 rounded-b-lg border border-white/15 bg-[#101f30]" />
              </div>

              {/* Progress */}
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.3em] text-white/40">
                    PACKING PROGRESS
                  </span>

                  <span className="text-sm text-white">
                    {progress}%
                  </span>
                </div>

                <div className="h-px overflow-hidden bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#38bdf8] via-[#f5c76b] to-[#ff8a3d] transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="packing-items">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs tracking-[0.3em] text-white/40">
                CHOOSE YOUR ESSENTIALS
              </p>

              <span className="text-xs text-white/30">
                {packedItems.length}/{packingItems.length}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {packingItems.map((item) => {
                const isPacked = packedItems.includes(item.id);
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    onMouseEnter={() => setActiveItem(item.id)}
                    onMouseLeave={() => setActiveItem(null)}
                    className={`packing-item group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 ${
                      isPacked
                        ? "border-[#38bdf8]/40 bg-[#38bdf8]/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    {/* Hover Glow */}
                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#38bdf8]/10 blur-2xl transition-opacity duration-500 ${
                        isActive || isPacked
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />

                    <div className="relative flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-2xl transition-all duration-500 ${
                          isPacked
                            ? "rotate-3 border-[#38bdf8]/30 bg-[#38bdf8]/10"
                            : "border-white/10 bg-white/5 group-hover:-rotate-3"
                        }`}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-sm font-medium text-white">
                            {item.name}
                          </h3>

                          <span
                            className={`text-[9px] tracking-[0.2em] transition-colors ${
                              isPacked
                                ? "text-[#38bdf8]"
                                : "text-white/25"
                            }`}
                          >
                            {isPacked ? "PACKED" : item.category}
                          </span>
                        </div>

                        <p className="mt-1 text-xs leading-5 text-white/35">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Completion Message */}
            <div
              className={`mt-6 overflow-hidden rounded-2xl border border-[#f5c76b]/20 bg-[#f5c76b]/5 transition-all duration-700 ${
                progress === 100
                  ? "max-h-32 translate-y-0 opacity-100"
                  : "max-h-0 -translate-y-2 opacity-0"
              }`}
            >
              <div className="p-5">
                <p className="text-xs tracking-[0.25em] text-[#f5c76b]">
                  YOU&apos;RE READY
                </p>

                <p className="mt-2 font-display text-2xl text-white">
                  The world is waiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}