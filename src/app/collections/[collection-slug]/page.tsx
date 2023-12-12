import { MotionListItem } from "@/components/motion";
import { ProductImageGroup, ProductImageGroupProvider } from "@/components/product-image";
import { ColorSelector } from "@/components/selectors";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";

import { getFakeData, preloadFakeData } from "@/faker/faker-functions";

import { card, grid, prose, section, title } from "@/styles";

type CollectionPageProps = {
    params: { "collection-slug": string };
};

export default async function CollectionPage({ params }: CollectionPageProps) {
    preloadFakeData("collection");
    const { name, description, items } = await getFakeData("collection");
    const slug = params["collection-slug"];

    return (
        <section className={section()}>
            <header className={prose({ class: "prose-invert px-6 max-lg:text-center" })}>
                <h1 className={title()}>{name}</h1>
                <p>{description}</p>
            </header>
            <menu className={grid()}>
                {items.map(({ name, images, colors }, i) => (
                    <Card
                        key={i}
                        as={MotionListItem}
                        isFooterBlurred
                        className={card.root({ radius: "xl", class: "overflow-visible" })}
                    >
                        <ProductImageGroupProvider>
                            <CardBody
                                as={Link}
                                href={`/collections/${slug}/${name.toLowerCase()}`}
                                className="focus-visible:focus-ring rounded-xlarge !outline-offset-[-10px]"
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
