import { Section } from "@/components/section";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { MotionListItem } from "./components";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { API_URL } from "@/site.config";

import type { CollectionData } from "@/faker/faker-functions";

export default async function CollectionsPage() {
    const data = await fetch(`${API_URL}/collection`);
    const { name, description, items } = (await data.json()) as CollectionData;

    return (
        <Section>
            <header className="prose px-6 dark:prose-invert max-lg:text-center">
                <h1>{name}</h1>
                <p>{description}</p>
            </header>
            <menu className="grid h-full max-h-fit max-w-fit grid-cols-1 place-items-center gap-3 sm:grid-cols-2 md:grid-cols-3">
                {items.map((item, i) => (
                    <Card
                        as={MotionListItem}
                        key={i}
                        index={i}
                        isFooterBlurred
                        disableAnimation
                        className="rounded-xlarge !transition-none"
                    >
                        <CardBody className="relative">
                            <Image
                                as={NextImage}
                                src={item.image}
                                alt={item.name}
                                width={192}
                                height={192}
                            />
                            <CardFooter className="absolute bottom-4 z-10 ml-1 w-[calc(100%_-_32px)] truncate rounded-medium border-1 border-white/20 bg-black/30 py-1 shadow-small">
                                <h3 className="text-medium font-bold">{item.name}</h3>
                            </CardFooter>
                        </CardBody>
                        <footer className="flex flex-col gap-3 px-3 pb-3">
                            {/* <h3 className="px-3 text-medium font-bold">{item.name}</h3> */}
                            <menu className="flex flex-row justify-center gap-3">
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
        </Section>
    );
}

// {/* <div className="prose mx-auto w-fit justify-center text-center dark:prose-invert"> */}
