import { Featured } from "@/components/featured";
import { Hero } from "@/components/hero";

import { getFakeData } from "@/faker/faker-functions";

export default async function Home() {
    const [hero, featured] = await Promise.all([getFakeData("hero"), getFakeData("featured")]);

    return (
        <>
            <Hero {...hero} />
            <Featured {...featured} />
        </>
    );
}
