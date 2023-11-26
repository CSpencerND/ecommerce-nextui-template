import { section, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowRight } from "lucide-react";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import type { ApiType } from "@/faker/faker-functions";

export function Hero({ headline, descriptor, banner }: ApiType["hero"]) {
    return (
        <section className={section({ row: "lg" })}>
            <div className="prose relative isolate flex basis-3/4 flex-col items-center text-center dark:prose-invert lg:items-start lg:text-left">
                <h1 className={title()}>{headline}</h1>
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
                    className="pointer-events-none absolute -z-10 h-3/4 w-full transform-gpu bg-gradient-to-b from-secondary to-cyan-600/60 opacity-40 blur-3xl"
                />
            </div>

            <Image
                as={NextImage}
                src={banner}
                alt="banner"
                width={800}
                height={450}
                priority
                className="rounded-xlarge"
            />
        </section>
    );
}