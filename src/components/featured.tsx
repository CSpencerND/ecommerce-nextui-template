import { Carousel, CarouselItem } from "@/components/carousel-embla";
import { Button } from "@nextui-org/button";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { API_URL } from "@/site.config";

import type { FeaturedData } from "@/faker/faker-functions";

export async function Featured() {
    const data = await fetch(`${API_URL}/featured`);
    const { copy, items } = (await data.json()) as FeaturedData;

    return (
        <div className="flex flex-col gap-x-12 lg:flex-row">
            <div className="prose text-center dark:prose-invert lg:hidden">
                <h1 className="pb-4">{copy.adjective}</h1>
            </div>

            <Carousel
                numSlides={items.length}
                loop
                showControls
                className="lg:max-w-6xl"
            >
                {items.map(({ image, name }, i) => (
                    <CarouselItem
                        key={i}
                        index={i}
                        title={name}
                    >
                        <Image
                            as={NextImage}
                            src={image}
                            alt={name}
                            width={192}
                            height={192}
                        />
                    </CarouselItem>
                ))}
            </Carousel>

            <div className="prose relative isolate flex flex-col items-center justify-center dark:prose-invert lg:items-start lg:text-left">
                <h1 className="m-0 bg-gradient-to-br from-default-900 to-default-300 bg-clip-text text-transparent max-lg:hidden">
                    {copy.adjective}
                </h1>
                <p className="max-lg:text-center">{copy.description}</p>
                <Button
                    color="primary"
                    variant="shadow"
                    className="lg:self-end"
                >
                    See More
                </Button>
            </div>
        </div>
    );
}
