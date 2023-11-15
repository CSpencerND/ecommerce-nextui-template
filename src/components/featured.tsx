"use client";

import { Carousel } from "@/components/carousel";

import { useFaker } from "@/faker/faker-store";

export function Featured() {
    useFaker((s) => s.setFeaturedItems());
    const featuredItems = useFaker((s) => s.featuredItems);

    return (
        <Carousel
            title="Featured"
            items={featuredItems}
        />
    );
}
