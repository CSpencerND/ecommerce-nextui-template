import { ProductProvider } from "./components/product-provider";
import { ProductImageGroup } from "./components/product-image-group";

import { ColorSelect } from "./components/color-select";
import { SizeSelect } from "./components/size-select";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

import { getFakeData, preloadFakeData } from "@/faker/faker-functions";
import { prose, section } from "@/styles";

export default async function ProductPage() {
    preloadFakeData("product");
    const { name, description, images, sizes, colors, price } = await getFakeData("product");

    return (
        <section className={section()}>
            <Card className="max-w-4xl rounded-xlarge">
                <CardBody className="gap-6 max-md:max-w-min md:flex-row md:items-center md:p-6">
                    <ProductProvider>
                        <ProductImageGroup
                            images={images.map((image, i) => ({
                                src: image,
                                alt: `Product Image ${i}`,
                                width: 384,
                                height: 384,
                                classNames: {
                                    wrapper: "flex-none max-sm:w-[calc(93vw-24px)] max-w-96",
                                },
                                sizes: "100vw",
                            }))}
                        />

                        <div className="flex basis-0 flex-col gap-6">
                            <div className={prose()}>
                                <h2 className="pb-6">{name}</h2>
                                <p>{description}</p>
                                <p className="font-bold">{price}</p>
                            </div>

                            <ColorSelect
                                isSquared
                                colors={colors}
                            />

                            <SizeSelect
                                isSquared
                                sizes={sizes}
                            />

                            <div className="inline-flex max-w-min gap-3 [&>*]:flex-1">
                                <Button color="primary">Buy Now</Button>
                                <Button
                                    color="primary"
                                    variant="bordered"
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
