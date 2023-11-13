import { Hero } from "@/components/hero";
import { Section } from "@/components/section";

export default async function Home() {
    return (
        <>
            <Section>
                <Hero />
            </Section>
            {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"> */}
            {/*     <div className="prose text-center dark:prose-invert"> */}
            {/*         <h1>Featured</h1> */}
            {/*     </div> */}
            {/* </section> */}
        </>
    );
}
