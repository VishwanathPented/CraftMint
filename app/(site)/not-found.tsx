import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-20">
      <Container className="text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3 font-display text-5xl text-charcoal sm:text-6xl">This surface doesn&rsquo;t exist.</h1>
        <p className="mx-auto mt-4 max-w-md font-sans text-base text-charcoal-soft">
          The page you&rsquo;re looking for may have moved. Explore the collection or head back home.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <LinkButton href="/" size="lg">
            Back to Home
          </LinkButton>
          <LinkButton href="/finishes" variant="secondary" size="lg">
            Explore Finishes
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
