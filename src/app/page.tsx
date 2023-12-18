import { Carousel, CarouselItem } from "@/components/carousel-embla";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowRight } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import Image from "next/image";

import { prose, section, title } from "@/styles";

import { getHero, getFeatured } from "@/actions";
import { isImageUnoptimized } from "@/site.config";

export default async function HomePage() {
    const [hero, featured] = await Promise.all([getHero(), getFeatured()]);

    const { descriptor, banner, headline } = hero;
    const { items, copy } = featured;

    return (
        <>
            <section className={section({ row: "lg" })}>
                <div
                    className={prose({
                        class: "relative isolate flex basis-3/4 flex-col items-center text-center lg:items-start lg:text-left",
                    })}
                >
                    <h1 className={title()}>{headline}</h1>
                    <p>{descriptor}</p>
                    <Button
                        href="/collections"
                        as={Link}
                        color="primary"
                        variant="shadow"
                    >
                        Get Started
                        <ArrowRight size={16} />
                    </Button>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -z-10 h-3/4 w-full transform-gpu bg-gradient-to-b from-secondary to-cyan-600/60 opacity-40 blur-3xl"
                    />
                </div>

                <div>
                    <Image
                        unoptimized={isImageUnoptimized}
                        src={banner}
                        alt="banner"
                        width={698}
                        height={393}
                        sizes="(min-width: 640px) 698px, calc(100vw - 48px)"
                        priority
                        className="rounded-xlarge sm:max-w-prose lg:max-w-lg"
                    />
                </div>
            </section>

            <section className={section({ row: "lg" })}>
                <div className={prose({ class: "text-center lg:hidden" })}>
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
                            <ProductImage
                                src={image}
                                alt={name}
                                width={192}
                                height={192}
                                sizes="192px"
                            />
                        </CarouselItem>
                    ))}
                </Carousel>

                <div
                    className={prose({
                        class: "flex flex-col items-center justify-center lg:hidden lg:items-start lg:text-left",
                    })}
                >
                    <p className="max-lg:text-center">{copy.description}</p>
                    <Button
                        color="primary"
                        variant="shadow"
                        className="lg:self-end"
                    >
                        See More
                    </Button>
                </div>

                <div
                    className={prose({
                        class: "flex flex-col items-start max-lg:hidden",
                    })}
                >
                    <h1 className="m-0 bg-gradient-to-br from-default-900 to-default-300 bg-clip-text text-transparent">
                        {copy.adjective}
                    </h1>
                    <p className="max-lg:text-center">{copy.description}</p>
                    <Button
                        color="primary"
                        variant="shadow"
                    >
                        See More
                    </Button>
                </div>
            </section>
        </>
    );
}
