import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SampleRequestForm } from "@/components/forms/SampleRequestForm";

export const metadata: Metadata = {
  title: "Request a Sample",
  description: "Request a physical sample of a Craftmint decorative finish to evaluate in your own space and light.",
};

export default function SampleRequestPage() {
  return (
    <div className="py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Sample Request</Eyebrow>
          <h1 className="mt-3 font-display text-5xl text-charcoal sm:text-6xl">See it before you specify it.</h1>
          <p className="mt-5 font-sans text-base leading-relaxed text-charcoal-soft">
            Evaluate a physical sample of any Craftmint finish in your own space and light before making a
            decision.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-2xl">
          <Suspense fallback={null}>
            <SampleRequestForm />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
