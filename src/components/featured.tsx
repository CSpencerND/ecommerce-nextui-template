import { ScrollArea, ScrollBar } from "@/components/scroll-area";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { ArrowRight } from "lucide-react";

import { faker } from "@faker-js/faker";

export async function Featured() {
    const featuredItems = faker.helpers.arrayElements(
        [faker.image.urlLoremFlickr({ category: "product", height: 256, width: 256 })],
        7,
    );

    console.log(featuredItems)

    return (
        <>
            <div className="prose dark:prose-invert">
                <h1>Featured</h1>
            </div>
            <div className="relative">
                <ScrollArea>
                    <ul className="flex space-x-4 pb-4">
                        {featuredItems.map((f, i) => (
                            <li key={i}>
                                <Image
                                    as={NextImage}
                                    src={f}
                                    alt={`product-${i}`}
                                    width={256}
                                    height={256}
                                />
                            </li>
                        ))}
                        {/* {listenNowAlbums.map((album) => ( */}
                        {/*     <AlbumArtwork */}
                        {/*         key={album.name} */}
                        {/*         album={album} */}
                        {/*         className="w-[250px]" */}
                        {/*         aspectRatio="portrait" */}
                        {/*         width={250} */}
                        {/*         height={330} */}
                        {/*     /> */}
                        {/* ))} */}
                    </ul>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </>
    );
}
