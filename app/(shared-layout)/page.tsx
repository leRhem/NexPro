"use client";

import { Hero } from "@/components/web/landing/Hero";
import { Features } from "@/components/web/landing/Features";
import { HowItWorks } from "@/components/web/landing/HowItWorks";
import { CallToAction } from "@/components/web/landing/CallToAction";
import { Footer } from "@/components/web/landing/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </>
  );
}
