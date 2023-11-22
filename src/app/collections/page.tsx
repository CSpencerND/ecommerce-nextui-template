import { Card, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { MotionListItem } from "./components";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { API_URL } from "@/site.config";

import { section, title } from "@/components/primitives";

import type { CollectionDirectoryData } from "@/faker/faker-functions";

export default async function CollectionsDirectoryPage() {
    const data = await fetch(`${API_URL}/collection-directory`);
    const collections = (await data.json()) as CollectionDirectoryData;

    return (
        <section className={section()}>
            <header className="prose px-6 dark:prose-invert max-lg:text-center">
                <h1 className={title()}>Collection Directory</h1>
            </header>
            <menu className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6">
                {collections.map(({image, name}, i) => (
                    <Card
                        as={MotionListItem}
                        key={i}
                        index={i}
                        isFooterBlurred
                        isPressable
                        className="relative rounded-2xl !transition-none"
                    >
                        <Link href="/collections/[slug]">
                            <Image
                                as={NextImage}
                                src={image}
                                alt={name}
                                width={192}
                                height={192}
                                className="bg-content4 bg-stripe-gradient"
                            />
                            <CardFooter
                                className="absolute bottom-1 z-10 ml-1 rounded-medium border-1 border-white/20 bg-black/30 py-1 shadow-small"
                                style={{ width: "calc(100% - 0.5rem)" }}
                            >
                                <h3 className="mx-auto truncate text-large font-bold">
                                    {name}
                                </h3>
                            </CardFooter>
                        </Link>
                    </Card>
                ))}
            </menu>
        </section>
    );
}
