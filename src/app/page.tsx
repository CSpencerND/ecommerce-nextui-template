import {
    Carousel,
    CarouselArrows,
    CarouselContent,
    CarouselControls,
    CarouselDots,
    CarouselItem,
} from "@/components/ui/carousel";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowRight } from "lucide-react";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { heading, prose, section } from "@/styles";

import { getFeatured, getHero } from "@/actions";
import { isImageUnoptimized } from "@/site.config";

export default async function HomePage() {
    const [hero, featured] = await Promise.all([getHero(), getFeatured()]);

    const { descriptor, banner, headline } = hero;
    const { items, copy } = featured;

    return (
        <>
            <section className={section()}>
                <div
                    className={prose({
                        class: "relative isolate mx-auto items-center text-center",
                        wrap: "balance",
                    })}
                >
                    <h1 className={heading()}>{headline}</h1>
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

                <Image
                    as={NextImage}
                    unoptimized={isImageUnoptimized}
                    src={banner}
                    alt="banner"
                    width={1024}
                    height={576}
                    sizes="(min-width: 640px) 698px, calc(100vw - 48px)"
                    priority
                    className="!rounded-f5 border border-divider"
                />
            </section>

            <section className="grid place-items-center space-y-9">
                <div className={prose({ class: "text-center" })}>
                    <h1 className={heading()}>{copy.adjective}</h1>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        skipSnaps: true,
                        containScroll: false,
                        loop: true,
                    }}
                    className="rounded-f5"
                >
                    <CarouselContent>
                        {items.map(({ image, name }, i) => (
                            <CarouselItem key={`Item ${i}`}>
                                <div className="relative overflow-clip rounded-f4 border border-divider/5">
                                    <Image
                                        as={NextImage}
                                        src={image}
                                        alt={name}
                                        width={192}
                                        height={192}
                                        sizes="192px"
                                    />
                                    <div className="absolute inset-0 z-10 grid items-end rounded-[calc(var(--f4)+2px)] p-f2 focus-visible:focus-ring">
                                        <div className="h-fit rounded-f3 border border-divider bg-black/20 p-f2 backdrop-blur backdrop-saturate-150">
                                            <h3 className="px-1 font-bold">
                                                {name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselControls>
                        <CarouselDots numSlides={items.length} />
                        <CarouselArrows />
                    </CarouselControls>
                </Carousel>

                <div
                    className={prose({
                        class: "grid place-items-center text-center",
                        wrap: "balance",
                    })}
                >
                    <p>{copy.description}</p>
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
