import { Image } from "@/components/ui/image";
import { MotionListItem } from "@/components/utility/motion";
import Link from "next/link";

import { getCollections } from "@/actions";

import { heading, prose } from "@/styles";

export default async function CollectionDirectoryPage() {
    const collections = await getCollections();

    return (
        <section className="std-section">
            <header className={prose({ class: "self-center text-center" })}>
                <h1 className={heading()}>Collection Directory</h1>
            </header>
            <menu className="std-grid">
                {collections.map(({ image, name }, i) => (
                    <MotionListItem
                        key={`Collection ${i}`}
                        index={i}
                        className="relative aspect-square shadow-small"
                    >
                        <Image
                            data={image}
                            fill
                            ratio="square"
                            sizes="192px"
                        />

                        <Link
                            href={`/${name.toLowerCase()}`}
                            className="absolute inset-0 z-10 grid items-end rounded-[calc(var(--fibo-4)_+_var(--ring-gap))] p-f2 focus-visible:focus-ring"
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
