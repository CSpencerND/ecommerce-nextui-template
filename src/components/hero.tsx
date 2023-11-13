import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

import { faker } from "@faker-js/faker";

const headline = faker.company.catchPhrase();
const descriptor = faker.lorem.paragraph();
const banner = faker.image.urlLoremFlickr({ category: "computer" });

export async function Hero() {
    return (
        <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="prose relative isolate flex flex-col items-center  text-center dark:prose-invert">
                <h1 className="m-0 bg-gradient-to-br from-default-900 to-default-300 bg-clip-text text-transparent">
                    {headline}
                </h1>
                <p>{descriptor}</p>
                <Button
                    color="primary"
                    variant="shadow"
                >
                    Get Started
                </Button>
                <div
                    aria-hidden="true"
                    className=" absolute -z-10 h-full w-full bg-gradient-radial from-primary to-secondary opacity-30 blur-3xl"
                />
            </div>

            <Image
                as={NextImage}
                src={banner}
                alt="banner"
                width={576}
                height={576}
                // fill
            />
        </div>
    );
}
