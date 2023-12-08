import { ProductImageGroup } from "./components/product-image-group";
import { ProductProvider } from "./components/product-provider";

import { ColorSelect } from "./components/color-select";
import { SizeSelect } from "./components/size-select";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

import { getFakeData, preloadFakeData } from "@/faker/faker-functions";
import { prose, section } from "@/styles";

export default async function ProductPage({ searchParams }: { searchParams: any }) {
    preloadFakeData("product");
    const { name, description, images, sizes, colors, price } = await getFakeData("product");

    return (
        <section className={section()}>
            <Card className="rounded-2xlarge max-w-4xl">
                <CardBody className="gap-6 p-6 max-md:max-w-min md:flex-row md:items-center">
                    <ProductProvider>
                        <ProductImageGroup
                            images={images.map((image, i) => ({
                                src: image,
                                alt: `Product Image ${i}`,
                                width: 384,
                                height: 384,
                                classNames: {
                                    wrapper: "flex-none max-md:w-[calc(100vw-96px)] max-w-sm",
                                },
                                sizes: "100vw",
                            }))}
                        />

                        <div className="flex basis-full flex-col gap-6">
                            <div className={prose()}>
                                <h2 className="pb-6">{name}</h2>
                                <p>{description}</p>
                                <p className="font-bold">{price}</p>
                            </div>

                            <ColorSelect colors={colors} />

                            <SizeSelect
                                sizes={sizes}
                                sizeParams={searchParams.size}
                            />

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
