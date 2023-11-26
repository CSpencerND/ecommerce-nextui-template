import { MotionListItem } from "@.c/components/motion";
import { section, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { getFakeData } from "@/faker/faker-functions";

import card from "@/styles/product-card";

/**
 * TODO: Radio can take different color for each button; should be easy;
 */

export default async function CollectionPage() {
    const { name, description, items } = await getFakeData("collection");

    return (
        <section className={section()}>
            <header className="prose px-6 dark:prose-invert max-lg:text-center">
                <h1 className={title()}>{name}</h1>
                <p>{description}</p>
            </header>
            <menu className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6">
                {items.map((item, i) => (
                    <Card
                        as={MotionListItem}
                        key={i}
                        index={i}
                        isFooterBlurred
                        isPressable
                        className={card.root({ radius: "xl" })}
                    >
                        <CardBody>
                            <Image
                                as={NextImage}
                                src={item.image[0]}
                                alt={item.name}
                                width={192}
                                height={192}
                                className={card.image()}
                                isZoomed
                            />
                            <CardFooter className={card.footer({ hasPadding: true })}>
                                <h3>{item.name}</h3>
                            </CardFooter>
                        </CardBody>
                        <footer className="flex flex-col justify-center gap-3 px-3 pb-3">
                            <menu className="flex flex-row justify-between overflow-x-scroll p-1 scrollbar-hide">
                                {[...Array(4)].map((_, i) => (
                                    <Button
                                        key={i}
                                        size="sm"
                                        radius="full"
                                        isIconOnly
                                        className="max-sm:h-6 max-sm:w-6 max-sm:min-w-0"
                                    />
                                ))}
                            </menu>
                        </footer>
                    </Card>
                ))}
            </menu>
        </section>
    );
}
