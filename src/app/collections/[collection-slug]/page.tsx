import {
    ActiveImageProvider,
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

type CollectionPageProps = {
    params: { "collection-slug": string };
};

export default async function CollectionPage({ params }: CollectionPageProps) {
    const collection = await getCollection();
    const { name, description, products } = collection;
    const collectionSlug = params["collection-slug"];

    return (
        <section className={section()}>
            <header
                className={prose({
                    class: "prose-invert px-6 max-lg:text-center",
                })}
            >
                <h1 className={heading()}>{name}</h1>
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
                            <ActiveImageProvider>
                                <ProductCardBody
                                    as={ProductLink}
                                    href={`/collections/${collectionSlug}/${name.toLowerCase()}`}
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
                            </ActiveImageProvider>
                        </ProductCard>
                    </MotionListItem>
                ))}
            </menu>
        </section>
    );
}
