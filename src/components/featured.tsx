import { Carousel, CarouselItem } from "@/components/carousel-embla";
import { section, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import card from "@/styles/product-card";

import type { ApiType } from "@/faker/faker-functions";

export function Featured({ copy, items }: ApiType["featured"]) {
    return (
        <section className={section({ row: "lg" })}>
            <div className="prose text-center dark:prose-invert lg:hidden">
                <h1 className={title()}>{copy.adjective}</h1>
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
                            className={card.image()}
                        />
                    </CarouselItem>
                ))}
            </Carousel>

            <div className="prose flex flex-col items-center justify-center dark:prose-invert max-lg:hidden lg:items-start lg:text-left">
                <h1 className="m-0 bg-gradient-to-br from-default-900 to-default-300 bg-clip-text text-transparent">
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

            <div className="prose flex flex-col items-center justify-center dark:prose-invert lg:hidden lg:items-start lg:text-left">
                <p className="max-lg:text-center">{copy.description}</p>
                <Button
                    color="primary"
                    variant="shadow"
                    className="lg:self-end"
                >
                    See More
                </Button>
            </div>
        </section>
    );
}
