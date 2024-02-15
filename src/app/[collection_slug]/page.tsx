import {
    ProductImageProvider,
    ProductImageGroup,
    ProductLink,
} from "@/components/product";

import { ColorSelectorPreview } from "@/components/selectors";
import { MotionListItem } from "@/components/utility/motion";

import { getCollection } from "@/actions";

import { grid, heading, prose, section } from "@/styles";

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
        <section className={section()}>
            <header
                className={prose({
                    class: "text-center",
                    wrap: "balance",
                })}
            >
                <h1 className={heading()}>{collectionName}</h1>
                <p>{description}</p>
            </header>
            <menu className={grid()}>
                {products.map(({ name, images, colors }, i) => (
                    <MotionListItem
                        key={`Product ${i}`}
                        index={i}
                        className="space-y-f3 relative rounded-f5 border border-divider/10 bg-content1 p-f3"
                    >
                        <ProductImageProvider>
                            <div className="relative">
                                <ProductImageGroup
                                    images={images.map((image, j) => ({
                                        src: image,
                                        alt: `Product Image ${j + 1}`,
                                    }))}
                                    size="preview"
                                    shadow="sm"
                                />
                                <ProductLink
                                    href={`/${collection_slug}/${name.toLowerCase()}`}
                                    data={products[i]}
                                    className="absolute inset-0 z-10 grid items-end rounded-f4 p-f2 focus-visible:focus-ring"
                                >
                                    <div className="h-fit rounded-f3 border border-divider bg-black/20 p-f2 backdrop-blur backdrop-saturate-150">
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
