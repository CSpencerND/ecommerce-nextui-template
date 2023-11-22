import { Hero } from "@/components/hero";
import { Featured } from "@/components/featured";

export default async function Home() {
    return (
        <>
            <Hero />
            <Featured />
        </>
    );
}
