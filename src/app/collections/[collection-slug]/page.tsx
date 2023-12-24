import { ActiveImageProvider, ProductImageGroup } from "@/components/product-image";
import { ProductLink } from "@/components/product/product-link";
import { ColorSelectorPreview } from "@/components/selectors";
import { MotionListItem } from "@/components/utility/motion";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

import { getCollection } from "@/actions";

import { card, grid, prose, section, title } from "@/styles";

type CollectionPageProps = {
    params: { "collection-slug": string };
};

export default async function CollectionPage({ params }: CollectionPageProps) {
    const collection = await getCollection();
    const { name, description, products } = collection;
    const collectionSlug = params["collection-slug"];

    return (
        <section className={section()}>
            <header className={prose({ class: "prose-invert px-6 max-lg:text-center" })}>
                <h1 className={title()}>{name}</h1>
                <p>{description}</p>
            </header>
            <menu className={grid()}>
                {products.map(({ name, images, colors }, i) => (
                    <Card
                        key={i}
                        as={MotionListItem}
                        isFooterBlurred
                        className={card.root({ radius: "xl", class: "overflow-visible" })}
                    >
                        <ActiveImageProvider>
                            <CardBody
                                as={ProductLink}
                                href={`/collections/${collectionSlug}/${name.toLowerCase()}`}
                                data={products[i]}
                                className="rounded-xlarge !outline-offset-[-10px] focus-visible:focus-ring"
                            >
                                <ProductImageGroup
                                    images={images.map((image, j) => ({
                                        src: image,
                                        alt: `Product Image ${j + 1}`,
                                    }))}
                                    size="preview"
                                    isBordered
                                />
                                <CardFooter className={card.title({ hasPadding: true })}>
                                    <h3>{name}</h3>
                                </CardFooter>
                            </CardBody>
                            <div className="flex flex-col justify-center gap-3 px-3 pb-3 @container">
                                <ColorSelectorPreview
                                    colors={colors}
                                    className="@[146px]:justify-between"
                                />
                            </div>
                        </ActiveImageProvider>
                    </Card>
                ))}
            </menu>
        </section>
    );
}
