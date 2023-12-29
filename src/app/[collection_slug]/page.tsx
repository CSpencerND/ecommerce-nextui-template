import {
    ProductImageProvider,
    ProductCard,
    ProductCardBody,
    ProductCardFooter,
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
                    >
                        <ProductCard
                            isFooterBlurred
                            isBodyLink
                            hasPadding
                        >
                            <ProductImageProvider>
                                <ProductCardBody
                                    as={ProductLink}
                                    href={`/${collection_slug}/${name.toLowerCase()}`}
                                    data={products[i]}
                                    className="rounded-xlarge"
                                >
                                    <ProductImageGroup
                                        images={images.map((image, j) => ({
                                            src: image,
                                            alt: `Product Image ${j + 1}`,
                                        }))}
                                        size="preview"
                                        isBordered
                                    />
                                    <ProductCardFooter title={name} />
                                </ProductCardBody>
                                <div className="flex flex-col justify-center gap-3 px-3 pb-3 @container">
                                    <ColorSelectorPreview
                                        colors={colors}
                                        className="@[146px]:justify-between"
                                    />
                                </div>
                            </ProductImageProvider>
                        </ProductCard>
                    </MotionListItem>
                ))}
            </menu>
        </section>
    );
}
