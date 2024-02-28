// import {
//     Carousel,
//     CarouselArrows,
//     CarouselContent,
//     CarouselControls,
//     CarouselDots,
//     CarouselItem,
// } from "@/components/ui/carousel";

import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowRight } from "lucide-react";

import { MImage } from "@/components/ui/image";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { heading, prose } from "@/styles";

import { getFeatured, getHero } from "@/actions";
import { isImageUnoptimized } from "@/site.config";

export default async function HomePage() {
    const [hero, featured] = await Promise.all([getHero(), getFeatured()]);

    const { descriptor, image, headline } = hero;
    const { items, copy } = featured;

    return (
        <>
            <section className="std-section">
                <div
                    className={prose({
                        class: "relative isolate mx-auto items-center space-y-f5 text-center",
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
                        className="pointer-events-none absolute top-0 -z-10 h-3/4 w-full bg-gradient-to-b from-secondary to-cyan-600/60 opacity-40 blur-3xl"
                    />
                </div>

                <MImage
                    image={image}
                    radius="lg"
                    ratio="video"
                    sizes="(min-width: 640px) 698px, calc(100vw - 48px)"
                    fill
                    priority
                    disableMaxWidth
                />
            </section>

            <section className="grid place-items-center space-y-f5">
                <div className={prose({ class: "text-center" })}>
                    <h1 className={heading()}>{copy.adjective}</h1>
                </div>

                <div className="overflow-clip rounded-f5 bg-content1 shadow-medium focus-visible-within:focus-ring">
                    <ScrollShadow
                        as="ul"
                        orientation="horizontal"
                        className="carousel"
                    >
                        {items.map(({ image, name, id }) => (
                            <li
                                key={id}
                                className="carousel-item relative isolate aspect-square overflow-clip rounded-f4 border border-divider/5 shadow-small"
                            >
                                <MImage
                                    image={image}
                                    sizes="192px"
                                />

                                <div className="absolute inset-0 z-10 grid items-end p-f2">
                                    <div className="h-fit rounded-f3 border border-divider/10 bg-black/20 p-f2 backdrop-blur backdrop-saturate-150">
                                        <h3 className="px-1 font-bold">{name}</h3>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ScrollShadow>
                </div>

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

            {/* <section className="grid place-items-center space-y-9"> */}
            {/*     <div className={prose({ class: "text-center" })}> */}
            {/*         <h1 className={heading()}>{copy.adjective}</h1> */}
            {/*     </div> */}
            {/**/}
            {/*     <Carousel */}
            {/*         opts={{ */}
            {/*             align: "start", */}
            {/*             skipSnaps: true, */}
            {/*             containScroll: false, */}
            {/*             loop: true, */}
            {/*         }} */}
            {/*         className="rounded-f5" */}
            {/*     > */}
            {/*         <CarouselContent> */}
            {/*             {items.map(({ image, name }, i) => ( */}
            {/*                 <CarouselItem key={`Item ${i}`}> */}
            {/*                     <div className="relative overflow-clip rounded-f4 border border-divider/5"> */}
            {/*                         <Image */}
            {/*                             as={NextImage} */}
            {/*                             src={image.src} */}
            {/*                             alt={image.alt} */}
            {/*                             width={image.width} */}
            {/*                             height={image.height} */}
            {/*                             sizes="192px" */}
            {/*                             isBlurred */}
            {/*                             classNames={{ */}
            {/*                                 wrapper: */}
            {/*                                     "aspect-square size-full overflow-clip", */}
            {/*                             }} */}
            {/*                         /> */}
            {/*                         <div className="absolute inset-0 z-10 grid items-end p-f2"> */}
            {/*                             <div className="h-fit rounded-f3 border border-divider/10 bg-black/20 p-f2 backdrop-blur backdrop-saturate-150"> */}
            {/*                                 <h3 className="px-1 font-bold"> */}
            {/*                                     {name} */}
            {/*                                 </h3> */}
            {/*                             </div> */}
            {/*                         </div> */}
            {/*                     </div> */}
            {/*                 </CarouselItem> */}
            {/*             ))} */}
            {/*         </CarouselContent> */}
            {/*         <CarouselControls> */}
            {/*             <CarouselDots numSlides={items.length} /> */}
            {/*             <CarouselArrows /> */}
            {/*         </CarouselControls> */}
            {/*     </Carousel> */}
            {/**/}
            {/*     <div */}
            {/*         className={prose({ */}
            {/*             class: "grid place-items-center text-center", */}
            {/*             wrap: "balance", */}
            {/*         })} */}
            {/*     > */}
            {/*         <p>{copy.description}</p> */}
            {/*         <Button */}
            {/*             color="primary" */}
            {/*             variant="shadow" */}
            {/*         > */}
            {/*             See More */}
            {/*         </Button> */}
            {/*     </div> */}
            {/* </section > */}
        </>
    );
}
