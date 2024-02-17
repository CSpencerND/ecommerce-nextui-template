import { MotionListItem } from "@/components/utility/motion";
import Link from "next/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { getCollections } from "@/actions";

import { grid, heading, prose, section } from "@/styles";

export default async function CollectionDirectoryPage() {
    const collections = await getCollections();

    return (
        <section className="space-y-f6">
            <header className={prose({ class: "text-center" })}>
                <h1 className={heading()}>Collection Directory</h1>
            </header>
            <menu className={grid()}>
                {collections.map(({ image, name }, i) => (
                    <MotionListItem
                        key={`Collection ${i}`}
                        index={i}
                        className="relative rounded-f4 border border-divider/10"
                    >
                        <Image
                            as={NextImage}
                            src={image.src}
                            alt="Collection Preview Image"
                            fill
                            sizes="192px"
                            classNames={{
                                wrapper: "!max-w-none",
                                img: "!static",
                            }}
                        />
                        <Link
                            href={`/${name.toLowerCase()}`}
                            className="absolute inset-0 z-10 grid items-end rounded-f4 p-f2 focus-visible:focus-ring"
                        >
                            <div className="h-fit rounded-f3 border border-divider bg-black/20 p-f2 backdrop-blur backdrop-saturate-150">
                                <h3 className="px-f1 font-bold">{name}</h3>
                            </div>
                        </Link>
                    </MotionListItem>
                ))}
            </menu>
        </section>
    );
}
