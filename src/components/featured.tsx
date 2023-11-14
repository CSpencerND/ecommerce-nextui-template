import { ScrollArea, ScrollBar } from "@/components/scroll-area";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { ArrowRight } from "lucide-react";

import { faker } from "@faker-js/faker";

export async function Featured() {
    const getProduct = () => {
        return {
            name: faker.commerce.product(),
            image: faker.image.urlPicsumPhotos({
                height: 256,
                width: 256,
            }),
        };
    };

    const featuredItems = faker.helpers.multiple(getProduct, { count: 7 });

    return (
        <>
            <div className="prose dark:prose-invert">
                <h1>Featured</h1>
            </div>
            <div className="relative">
                <ScrollArea>
                    <ul className="flex space-x-4 pb-4">
                        {featuredItems.map(({ image, name }, i) => (
                            <li key={i}>
                                <Image
                                    as={NextImage}
                                    src={image}
                                    alt={`product-${i}`}
                                    width={256}
                                    height={256}
                                    classNames={{ img: "object-cover object-center h-full" }}
                                />
                                <h3>{name}</h3>
                            </li>
                        ))}
                    </ul>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </>
    );
}
