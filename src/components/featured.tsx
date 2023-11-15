"use client";

import { Carousel, CarouselItem } from "@/components/carousel";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { useFaker } from "@/faker/faker-store";
import { useHydrated } from "@/hooks/use-hydrated";

export function Featured() {
    useFaker((s) => s.setFeaturedItems());
    const featuredItems = useFaker((s) => s.featuredItems);

    const hydrated = useHydrated();
    if (!hydrated) return null;

    return (
        <>
            <div className="prose dark:prose-invert">
                <h1>Featured</h1>
            </div>

            <Carousel numSlides={featuredItems.length} showControls>
                {featuredItems.map(({ image, name }, i) => (
                    <CarouselItem
                        key={i}
                        title={name}
                    >
                        <Image
                            as={NextImage}
                            src={image}
                            alt={name}
                            width={192}
                            height={192}
                            className="object-cover object-center"
                            radius="sm"
                        />
                    </CarouselItem>
                ))}
            </Carousel>
        </>
    );
}
