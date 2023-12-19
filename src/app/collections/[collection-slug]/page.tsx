import { MotionListItem } from "@/components/motion";
import { ProductImageGroup, ProductImageGroupProvider } from "@/components/product-image";
import { ColorSelector } from "@/components/selectors";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";

import { getCollection } from "@/actions";

import { card, grid, prose, section, title } from "@/styles";

type CollectionPageProps = {
    params: { "collection-slug": string };
};

export default async function CollectionPage({ params }: CollectionPageProps) {
    const collection = await getCollection()
    const { name, description, products } = collection;
    const collectionSlug = params["collection-slug"];

    console.log(JSON.stringify(collection, null, 4))

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
                        <ProductImageGroupProvider>
                            <CardBody
                                as={Link}
                                href={`/collections/${collectionSlug}/${name.toLowerCase()}`}
                                className="rounded-xlarge !outline-offset-[-10px] focus-visible:focus-ring"
                            >
                                <ProductImageGroup
                                    images={images.map((image, j) => ({
                                        src: image,
                                        alt: `Product Image ${j}`,
                                        size: "preview",
                                    }))}
                                />
                                <CardFooter className={card.title({ hasPadding: true })}>
                                    <h3>{name}</h3>
                                </CardFooter>
                            </CardBody>
                            <div className="flex flex-col justify-center gap-3 px-3 pb-3 @container">
                                <ColorSelector colors={colors} />
                            </div>
                        </ProductImageGroupProvider>
                    </Card>
                ))}
            </menu>
        </section>
    );
}
