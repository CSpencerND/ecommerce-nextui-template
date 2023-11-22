import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { MotionListItem } from "./components";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { API_URL } from "@/site.config";

import { section, title } from "@/components/primitives";
import { cn } from "@nextui-org/react";

import type { CollectionData } from "@/faker/faker-functions";

export default async function CollectionsPage() {
    const data = await fetch(`${API_URL}/collection`);
    const { name, description, items } = (await data.json()) as CollectionData;

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
                        className="rounded-xlarge !transition-none"
                    >
                        <CardBody className="relative">
                            <Image
                                as={NextImage}
                                src={item.image[0]}
                                alt={item.name}
                                width={192}
                                height={192}
                                className="bg-content4 bg-stripe-gradient"
                            />
                            <CardFooter className="absolute bottom-4 z-10 ml-1 w-[calc(100%_-_32px)] rounded-medium border-1 border-white/20 bg-black/30 py-1 shadow-small">
                                <h3 className="truncate text-medium font-bold">{item.name}</h3>
                            </CardFooter>
                        </CardBody>
                        <footer className="flex flex-col justify-center gap-3 px-3 pb-3">
                            <menu
                                className={cn(
                                    "flex flex-row justify-between overflow-x-scroll p-1",
                                    "[&>*]:max-sm:min-w-0",
                                    "[&>*]:max-sm:w-6",
                                    "[&>*]:max-sm:h-6",
                                )}
                            >
                                <Button
                                    size="sm"
                                    radius="full"
                                    isIconOnly
                                />
                                <Button
                                    size="sm"
                                    radius="full"
                                    isIconOnly
                                />
                                <Button
                                    size="sm"
                                    radius="full"
                                    isIconOnly
                                />
                                <Button
                                    size="sm"
                                    radius="full"
                                    isIconOnly
                                />
                            </menu>
                        </footer>
                    </Card>
                ))}
            </menu>
        </section>
    );
}
