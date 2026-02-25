"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-3xl border border-border bg-foreground/[0.03] dark:bg-white/[0.04] p-12 sm:p-16 text-center"
        style={{ opacity: 0 }}
      >
        {/* Subtle accent circle */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/6 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary">
            <Sparkles className="w-4 h-4" />
            Start for free today
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Ready to build your
            <br />
            <span className="text-primary">reading collection?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Join thousands of readers who use NexPro to save, organize, and
            discover the best content on the web.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/auth/sign-up"
              className={buttonVariants({
                className: "h-12 px-8 text-base font-semibold",
              })}
            >
              Create Your Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/auth/login"
              className={buttonVariants({
                variant: "outline",
                className: "h-12 px-8 text-base font-semibold",
              })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
