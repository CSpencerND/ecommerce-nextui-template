"use client";

import { Image, type ImageProps } from "@nextui-org/image";
import NextImage from "next/image";

import { cardImage } from "@/styles/product-card";
import { useProduct } from "./use-product";

export type ProductPreviewProps = ImageProps & {
    images: string[]
    altTag: string
}

import { useState, useEffect } from "react";

export function ProductPreview({images, altTag, ...props}: ProductPreviewProps) {
    const [selectedImage, setImage] = useState(0)
    const selectedIndex = useProduct(s=>s.selectedIndex)

    useEffect(() => {
        setImage(Number(selectedIndex))
    }, [selectedIndex])

    return (
        <Image
            as={NextImage}
            src={images[selectedImage]}
            alt={altTag}
            width={192}
            height={192}
            className={cardImage()}
            isZoomed
            {...props}
        />
    );
}


                        {/* <CardBody> */}
                        {/*     {items.map((item, j) => ( */}
                        {/*         <> */}
                        {/*             <Image */}
                        {/*                 key={j} */}
                        {/*                 as={NextImage} */}
                        {/*                 src={item.image[0]} */}
                        {/*                 alt={item.name} */}
                        {/*                 width={192} */}
                        {/*                 height={192} */}
                        {/*                 className={card.image()} */}
                        {/*                 isZoomed */}
                        {/*             /> */}
                        {/*             <CardFooter className={card.footer({ hasPadding: true })}> */}
                        {/*                 <h3>{item.name}</h3> */}
                        {/*             </CardFooter> */}
                        {/*         </> */}
                        {/*     ))} */}
                        {/* </CardBody> */}
