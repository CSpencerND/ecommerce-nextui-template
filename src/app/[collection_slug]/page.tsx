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
                    class: "prose-invert px-6 max-lg:text-center",
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
                        className="rounded-f5 p-f3 space-y-2 border border-divider/10 bg-content1"
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
                                    className="p-f2 rounded-f4 absolute inset-0 z-10 grid items-end focus-visible:focus-ring"
                                >
                                    <div className="p-f2 rounded-f3 h-fit border border-divider bg-black/20 backdrop-blur backdrop-saturate-150">
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
