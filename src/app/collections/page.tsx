import { MotionListItem } from "@/components/utility/motion";
import Link from "next/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { getCollections } from "@/actions";

import { grid, heading, prose, section } from "@/styles";

export default async function CollectionDirectoryPage() {
    const collections = await getCollections();

    return (
        <section className={section()}>
            <header className={prose({ class: "px-6 max-lg:text-center" })}>
                <h1 className={heading()}>Collection Directory</h1>
            </header>
            <menu className={grid()}>
                {collections.map(({ image, name }, i) => (
                    <MotionListItem
                        key={`Collection ${i}`}
                        index={i}
                        className="rounded-f4 relative border border-divider/10"
                    >
                        <Image
                            as={NextImage}
                            src={image}
                            alt="Collection Preview Image"
                            width={192}
                            height={192}
                            sizes="192px"
                        />
                        <Link
                            href={`/${name.toLowerCase()}`}
                            className="p-f2 rounded-f4 absolute inset-0 z-10 grid items-end focus-visible:focus-ring"
                        >
                            <div className="p-f2 rounded-f3 h-fit border border-divider bg-black/20 backdrop-blur backdrop-saturate-150">
                                <h3 className="px-f1 font-bold">{name}</h3>
                            </div>
                        </Link>
                    </MotionListItem>
                ))}
            </menu>
        </section>
    );
}
