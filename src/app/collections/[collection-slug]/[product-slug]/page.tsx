import { ProductImageList } from "../components/product-preview";
import { ProductProvider } from "./components/product-provider";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
                        <ProductImageList
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
                                <p>{price}</p>
                            </div>

                            <ToggleGroup
                                /**
                                 * TODO: Try to figure out a way to not be a able to toggle it off.
                                 * ie: Always have one selected.
                                 * Maybe: If toggled off, the last one is automatically toggled back on.
                                 */
                                type="single"
                                defaultValue={colors[0]}
                                size="sm"
                                isSquared
                            >
                                {colors.map((color) => (
                                    <ToggleGroupItem
                                        key={color}
                                        value={color}
                                        style={{ backgroundColor: color }}
                                    >
                                        <span className="sr-only">{color}</span>
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>

                            <ToggleGroup
                                /**
                                 * TODO:
                                 * Try to figure out a way to not be a able to toggle it off.
                                 * ie: Always have one selected.
                                 * Maybe: If toggled off, the last one is automatically toggled back on.
                                 */
                                /**
                                 * PERF:
                                 * Also, adapt this to the product previews,
                                 * and deprecate the other color swatch component.
                                 */
                                type="single"
                                defaultValue={sizes[0]}
                                size="sm"
                                isSquared
                                className="max-sm:flex-wrap"
                            >
                                {sizes.map((size) => (
                                    <ToggleGroupItem
                                        key={size}
                                        value={size}
                                    >
                                        {size}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>

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
