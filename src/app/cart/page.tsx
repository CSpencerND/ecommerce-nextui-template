"use client";

import { ProductImage } from "@/components/product";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { useCart } from "@/hooks";
import { heading, prose } from "@/styles";

export default function CartPage() {
    const items = useCart((s) => s.items);
    const removeAll = useCart((s) => s.removeAll);

    // console.log(items)

    if (!items || items.length === 0) {
        return (
            <section className="space-y-f6">
                <div className={prose()}>
                    <h1 className={heading()}>Your Cart Is Empty</h1>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-f6">
            <div className={prose()}>
                <h1 className={heading()}>In Your Cart</h1>
            </div>
            <Card
                as="ul"
                className="!rounded-xlarge"
            >
                {items.map(({ product, subtotal, quantity }, i) => (
                    <>
                        <CardBody
                            as="li"
                            key={i}
                            className="grid grid-cols-[auto_1fr] gap-3 pb-0"
                        >
                            <ProductImage
                                src={product.images[0]?.src}
                                size="preview"
                                isBordered
                            />
                            <div className={prose({ sm: true })}>
                                <h3>{product.name}</h3>
                            </div>
                            <Divider className="col-span-full" />
                        </CardBody>
                    </>
                ))}
                <CardFooter>
                    <Button onPress={removeAll}>Empty Cart</Button>
                </CardFooter>
            </Card>
        </section>
    );
}
