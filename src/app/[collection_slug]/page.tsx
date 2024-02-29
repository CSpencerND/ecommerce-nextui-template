import { Image } from "@/components/ui/image";

import {
    ProductImageProvider,
    ProductImageGroup,
    ProductLink,
} from "@/components/product";

import { ColorSelectorPreview } from "@/components/selectors";
import { MotionListItem } from "@/components/utility/motion";

import { getCollection } from "@/actions";

import { heading, prose } from "@/styles";

export default async function CollectionPage({
    params: { collection_slug },
}: {
    params: { collection_slug: string };
}) {
    const collection = await getCollection();
    const { description, products } = collection;
    const collectionName = collection_slug.replace(/\b\w/g, (match) =>
        match.toUpperCase(),
    );

    return (
        <section className="std-section">
            <header
                className={prose({
                    class: "text-center",
                    wrap: "balance",
                })}
            >
                <h1 className={heading()}>{collectionName}</h1>
                <p>{description}</p>
            </header>
            <menu className="std-grid">
                {products.map(({ name, images, colors }, i) => (
                    <MotionListItem
                        key={`Product ${i}`}
                        index={i}
                        className="relative space-y-f3 rounded-f5 bg-content1 p-f3 shadow-small"
                    >
                        <ProductImageProvider>
                            <div className="relative aspect-square rounded-f4 shadow-small">
                                <ProductImageGroup
                                    images={images.map((image) => (
                                        <Image
                                            key={image.id}
                                            data={image}
                                            fill
                                            ratio="square"
                                        />
                                    ))}
                                />
                                <ProductLink
                                    href={`/${collection_slug}/${name.toLowerCase()}`}
                                    data={products[i]}
                                    className="absolute inset-0 z-10 grid items-end rounded-[calc(var(--fibo-4)_+_var(--ring-gap))] p-f2 focus-visible:focus-ring"
                                >
                                    <div className="h-fit rounded-f3 border border-divider/10 bg-black/20 p-f2 backdrop-blur backdrop-saturate-150">
                                        <h3 className="px-f1 font-bold">
                                            {name}
                                        </h3>
                                    </div>
                                </ProductLink>
                            </div>
                            <ColorSelectorPreview
                                colors={colors}
                                className="rounded-f4"
                            />
                        </ProductImageProvider>
                    </MotionListItem>
                ))}
            </menu>
        </section>
    );
}
