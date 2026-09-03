import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl font-display text-4xl leading-[1.05] text-charcoal sm:text-5xl">
          Craftmint isn&rsquo;t just supplying a coating. We&rsquo;re helping create the surface of your space.
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton href="/sample-request" size="lg">
            Request a Sample
          </LinkButton>
          <LinkButton href="/contact" size="lg" variant="secondary">
            Start Your Project
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
