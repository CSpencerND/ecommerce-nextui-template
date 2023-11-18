import { Button } from "@nextui-org/button";
import { ArrowRight } from "lucide-react";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { API_URL } from "@/site.config";

import type { HeroData } from "@/faker/faker-functions";

export async function Hero() {
    const data = await fetch(`${API_URL}/hero`);
    const { headline, descriptor, banner } = (await data.json()) as HeroData;

    return (
        <div className="relative flex flex-col items-center gap-y-8 lg:flex-row lg:gap-12">
            <div className="prose relative isolate flex flex-col items-center text-center dark:prose-invert lg:items-start lg:text-left">
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
            />
        </div>
    );
}
