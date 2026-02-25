"use client";

import { useEffect, useRef } from "react";
import { Bookmark, BookOpen, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Bookmark,
    title: "Create Bookmarks",
    description:
      "Save articles, blog posts, and resources with a single click. Add titles, rich content, and cover images to keep everything organized.",
  },
  {
    icon: BookOpen,
    title: "Read Anywhere",
    description:
      "Access your saved bookmarks from any device. Read your curated content in a clean, distraction-free environment.",
  },
  {
    icon: Search,
    title: "Search Instantly",
    description:
      "Find any bookmark in milliseconds. Our full-text search scans titles and content so you never lose a saved post.",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(
        ".features-heading",
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

      // Animate feature cards with stagger
      gsap.fromTo(
        ".feature-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24">
      <div className="text-center mb-16 features-heading" style={{ opacity: 0 }}>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Everything you need to
          <span className="text-primary"> bookmark smarter</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A focused toolkit for saving, organizing, and reading your favorite
          content — no clutter, no complexity.
        </p>
      </div>

      <div className="features-grid grid gap-8 md:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={i}
            className="feature-card group p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300"
            style={{ opacity: 0 }}
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300">
              <feature.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
