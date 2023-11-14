import { Hero } from "@/components/hero";
import { Featured } from "@/components/featured";
import { Section } from "@/components/section";

export default async function Home() {
    return (
        <>
            <Section>
                <Hero />
            </Section>
            <Section>
                <Featured />
            </Section>
        </>
    );
}
