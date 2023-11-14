import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

import { ArrowRight } from "lucide-react";

import { faker } from "@faker-js/faker";

export async function Hero() {
    const headline = faker.company.catchPhrase();
    const descriptor = faker.lorem.paragraph();
    const banner = faker.image.urlPicsumPhotos({
        width: 800,
        height: 450,
    });

    return (
        <div className="relative flex flex-col items-center gap-8 lg:flex-row">
            <div className="prose relative isolate flex flex-col items-center text-center dark:prose-invert lg:max-w-[50ch] lg:items-start lg:text-left">
                <h1 className="m-0 bg-gradient-to-br from-default-900 to-default-300 bg-clip-text text-transparent">
                    {headline}
                </h1>
                <p>{descriptor}</p>
                <Button
                    color="primary"
                    variant="shadow"
                >
                    <ArrowRight size={16} />
                    <span>Get Started</span>
                </Button>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -z-10 h-3/4 w-full transform-gpu bg-gradient-to-b from-secondary to-cyan-600/60 opacity-40 blur-3xl"
                />
            </div>

            <Image
                as={NextImage}
                src={banner}
                alt="banner"
                width={800}
                height={450}
                classNames={{img: "object-cover object-center h-full" }}
            />
        </div>
    );
}
