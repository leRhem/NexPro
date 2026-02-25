"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Bookmark, ArrowRight } from "lucide-react";
import gsap from "gsap";

const mockBookmarks = [
  {
    title: "Understanding React Server Components",
    tag: "React",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "The Future of Web Development in 2026",
    tag: "Web Dev",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Building Scalable APIs with Convex",
    tag: "Backend",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    title: "CSS Architecture for Large-Scale Apps",
    tag: "CSS",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
      )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );

      // Animate bookmark cards with stagger
      const cards = cardsRef.current?.querySelectorAll(".bookmark-card");
      if (cards) {
        tl.fromTo(
          cards,
          { x: 60, opacity: 0, rotateY: 12 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.5",
        );
      }

      // Subtle floating animation for the glow
      gsap.to(glowRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center py-20 overflow-hidden"
    >
      {/* Subtle glow accent */}
      <div
        ref={glowRef}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
      />

      <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground">
            <Bookmark className="w-4 h-4 text-primary" />
            Your personal reading vault
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]"
            style={{ opacity: 0 }}
          >
            Save. Organize.
            <br />
            <span className="text-primary">Read.</span> Anywhere.
          </h1>

          <p
            ref={subRef}
            className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
            style={{ opacity: 0 }}
          >
            Create bookmarks of your favorite articles, organize them by topic,
            and read them anytime — all in one beautifully fast platform.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4"
            style={{ opacity: 0 }}
          >
            <Link
              href="/auth/sign-up"
              className={buttonVariants({
                className: "h-12 px-8 text-base font-semibold",
              })}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/blog"
              className={buttonVariants({
                variant: "outline",
                className: "h-12 px-8 text-base font-semibold",
              })}
            >
              Explore Posts
            </Link>
          </div>
        </div>

        {/* Right — floating bookmark cards */}
        <div ref={cardsRef} className="relative hidden lg:block">
          <div className="space-y-4 max-w-md ml-auto">
            {mockBookmarks.map((bm, i) => (
              <div
                key={i}
                className="bookmark-card flex items-center gap-4 p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{ opacity: 0 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{bm.title}</p>
                  <span
                    className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${bm.color}`}
                  >
                    {bm.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
