"use client";

import { useEffect, useRef } from "react";
import { UserPlus, PenLine, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your free account in seconds. No credit card required — just pick a username and you're in.",
  },
  {
    number: "02",
    icon: PenLine,
    title: "Create Posts",
    description:
      "Write and save bookmarks with a title, rich body content, and a cover image. Everything is stored securely in the cloud.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Read & Comment",
    description:
      "Dive into your saved posts, explore what others have shared, and join the conversation with comments.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hiw-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".hiw-step",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hiw-timeline",
            start: "top 85%",
          },
        }
      );

      // Animate the connecting line
      gsap.fromTo(
        ".hiw-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hiw-timeline",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24">
      <div className="text-center mb-16 hiw-heading" style={{ opacity: 0 }}>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          How it <span className="text-primary">works</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Three simple steps to start building your personal reading library.
        </p>
      </div>

      <div className="hiw-timeline relative max-w-2xl mx-auto">
        {/* Vertical connecting line */}
        <div
          className="hiw-line absolute left-[27px] top-4 bottom-4 w-px bg-border origin-top hidden sm:block"
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="hiw-step flex gap-6 items-start"
              style={{ opacity: 0 }}
            >
              {/* Number badge */}
              <div className="flex-shrink-0 relative z-10 w-14 h-14 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                <span className="text-sm font-black text-primary">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <step.icon className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
