import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { contactInfo } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact & Enquire",
  description: "Start your project with CraftMint — enquire about a finish, a bespoke surface, or a full project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>Start Your Project</Eyebrow>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] text-charcoal sm:text-6xl">Let&rsquo;s talk surfaces.</h1>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-charcoal-soft">
              Whether you&rsquo;re specifying a finish for a client, exploring options for your own home, or
              starting a full project, our team is here to help.
            </p>
            <div className="mt-10 space-y-4 font-sans text-sm text-charcoal-soft">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-warm-grey">CraftMint LLP</p>
                <p>Send an enquiry using the form and our team will respond directly.</p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-warm-grey">Email</p>
                <a href={`mailto:${contactInfo.email}`} className="text-charcoal hover:underline">
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-warm-grey">Phone</p>
                <a href={contactInfo.phoneHref} className="text-charcoal hover:underline">
                  {contactInfo.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-warm-grey">Follow</p>
                <SocialLinks className="mt-1" />
              </div>
            </div>

            <div className="mt-10">
              <p className="font-sans text-xs uppercase tracking-[0.16em] text-warm-grey">Studio</p>
              <a
                href={contactInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block aspect-[4/3] w-full overflow-hidden hairline"
              >
                <iframe
                  src={contactInfo.mapsEmbedUrl}
                  title="CraftMint LLP studio location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none h-full w-full border-0"
                />
              </a>
              <a
                href={contactInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-sans text-sm text-charcoal hover:underline"
              >
                Get directions →
              </a>
            </div>
          </div>
          <Suspense fallback={null}>
            <EnquiryForm source="contact-page" />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
