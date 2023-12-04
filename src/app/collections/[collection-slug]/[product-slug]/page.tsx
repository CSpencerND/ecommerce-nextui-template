import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { getFakeData, preloadFakeData } from "@/faker/faker-functions";

import { card, prose, section } from "@/styles";

export default async function ProductPage() {
    preloadFakeData("product");
    const { name, description, images, sizes, colors, price } = await getFakeData("product");

    return (
        <section className={section()}>
            <Card className="max-w-4xl rounded-xlarge">
                <CardBody className="gap-6 max-md:max-w-min md:flex-row md:items-center md:p-6">
                    <Image
                        as={NextImage}
                        src={images[0]}
                        alt={name}
                        width={384}
                        height={384}
                        classNames={{ wrapper: "flex-none", img: card.image() }}
                        sizes="100vw"
                    />
                    <div className="flex flex-col gap-6 basis-0">
                        <div className={prose()}>
                            <h2 className="pb-6">{name}</h2>
                            <p>{description}</p>
                            <p>{price}</p>
                        </div>

                        {/** TODO: Obviously will be ColorSwatch */}
                        <div className="inline-flex gap-3">
                            {colors.map((color, i) => (
                                <Button
                                    key={i}
                                    size="sm"
                                    isIconOnly
                                    style={{ backgroundColor: color }}
                                >
                                    <span className="sr-only">{color}</span>
                                </Button>
                            ))}
                        </div>

                        {/** TODO: Change this to RadioGroup */}
                        <div className="inline-flex gap-3">
                            {sizes.map((size, i) => (
                                <Button
                                    key={i}
                                    size="sm"
                                    variant="flat"
                                    isIconOnly
                                >
                                    {size.toLowerCase()}
                                </Button>
                            ))}
                        </div>

                        <div className="inline-flex gap-3 max-w-min [&>*]:flex-1">
                            <Button color="primary">Buy Now</Button>
                            <Button color="primary" variant="bordered">Add To Bag</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </section>
    );
}
