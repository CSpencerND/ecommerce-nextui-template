"use client";

import { Carousel, CarouselItem } from "@/components/carousel";
// import { Carousel } from "@/components/nuka-carousel";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { useFaker } from "@/faker/faker-store";
import { useHydrated } from "@/hooks/use-hydrated";

export function Featured() {
    useFaker((s) => s.setFeaturedItems());
    const featuredItems = useFaker((s) => s.featuredItems);

    const hydrated = useHydrated();
    if (!hydrated) return null;

    // return (
    //     <>
    //         <div className="prose dark:prose-invert">
    //             <h1>Featured</h1>
    //         </div>
    //         <div className="relative w-full min-h-[192px] max-w-prose rounded-2xl border border-content2 bg-content1 p-3">
    //             <Carousel>
    //                 {featuredItems.map(({ image, name }, i) => (
    //                     <Image
    //                         onDrag={(e) => e.preventDefault()}
    //                         key={i}
    //                         as={NextImage}
    //                         src={image}
    //                         alt={name}
    //                         width={192}
    //                         height={192}
    //                         className="w-full h-full object-contain object-center !static"
    //                         // classNames={{img: "w-full h-full object-contain object-center !static"}}
    //                         radius="sm"
    //                     />
    //                 ))}
    //             </Carousel>
    //         </div>
    //     </>
    // );

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
