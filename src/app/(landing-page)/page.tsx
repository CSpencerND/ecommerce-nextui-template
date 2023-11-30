import { Featured } from "./components/featured";
import { Hero } from "./components/hero";

import { getFakeData, preloadFakeData } from "@/faker/faker-functions";

export default async function HomePage() {
    preloadFakeData("hero");
    const heroData = await getFakeData("hero");
    const featuredData = await getFakeData("featured");

    return (
        <>
            <Hero {...heroData} />
            <Featured {...featuredData} />
        </>
    );
}
