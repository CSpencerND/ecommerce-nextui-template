import { ProductProvider } from "@/components/product/product-provider";

import { ProductImageGroup } from "@/components/product-image";
import { ColorSelector, SizeSelector } from "@/components/selectors";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

import { getProductByHandle } from "@/actions";
import { prose, section } from "@/styles";

import type { SearchParams } from "@/types";

type ProductPageProps = {
    params: { "collection-slug": string; "product-slug": string };
    searchParams: SearchParams<"color" | "size">;
};

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
    const product = await getProductByHandle(params["product-slug"]);
    const { name, description, images, sizes, colors, price } = product;

    return (
        <section className={section()}>
            <Card className="max-w-4xl !rounded-2xlarge">
                <CardBody className="gap-6 p-6 max-md:max-w-min md:flex-row md:items-center">
                    <ProductProvider>
                        <ProductImageGroup
                            images={images.map((image, i) => ({
                                src: image,
                                alt: `Product Image ${i}`,
                                classNames: {
                                    wrapper:
                                        "flex-none max-md:w-[calc(100vw-96px)] max-w-sm ring-1 ring-default/40",
                                },
                            }))}
                            size="full"
                        />

                        <div className="flex basis-full flex-col gap-6">
                            <div className={prose()}>
                                <h2 className="pb-6">{name}</h2>
                                <p>{description}</p>
                                <p className="font-bold">{price}</p>
                            </div>

                            <ColorSelector colors={colors} />

                            <SizeSelector sizes={sizes} />

                            <div className="inline-flex max-w-min gap-3 [&>*]:flex-1 [&>*]:font-semibold">
                                <Button
                                    color="primary"
                                    variant="shadow"
                                >
                                    Buy Now
                                </Button>
                                <Button
                                    color="primary"
                                    variant="solid"
                                >
                                    Add To Bag
                                </Button>
                            </div>
                        </div>
                    </ProductProvider>
                </CardBody>
            </Card>
        </section>
    );
}
