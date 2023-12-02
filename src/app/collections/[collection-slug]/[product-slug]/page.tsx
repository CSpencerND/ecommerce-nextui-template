import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { getFakeData, preloadFakeData } from "@/faker/faker-functions";

import { card, prose, section } from "@/styles";
import { VisuallyHidden } from "@react-aria/visually-hidden";

export default async function ProductPage() {
    preloadFakeData("product");
    const { name, description, images, sizes, colors, price } = await getFakeData("product");

    return (
        <section className={section()}>
            <Card className="">
                <CardBody className="space-y-6">
                    <div className="w-full">
                        <Image
                            as={NextImage}
                            src={images[0]}
                            alt={name}
                            width={192}
                            height={192}
                            className={card.image()}
                        />
                    </div>
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
                                {size}
                            </Button>
                        ))}
                    </div>

                    <div className="inline-flex gap-3">
                        <Button>Buy Now</Button>
                        <Button>Add To Bag</Button>
                    </div>
                </CardBody>
            </Card>
        </section>
    );
}
