import {
    ProductPreviewBody,
    ProductPreviewImages,
    ProductPreviewCard,
    ProductPreviewFooter,
} from "./components/product-preview";

import { ColorSwatch, ColorSwatchGroup } from "./components/color-swatch";

import { getFakeData, preloadFakeData } from "@/faker/faker-functions";

import { grid, section, title } from "@/styles";

export default async function CollectionPage() {
    preloadFakeData("collection");
    const { name, description, items } = await getFakeData("collection");

    return (
        <section className={section()}>
            <header className="prose px-6 dark:prose-invert max-lg:text-center">
                <h1 className={title()}>{name}</h1>
                <p>{description}</p>
            </header>
            <menu className={grid()}>
                {items.map(({ name, images, colors }, i) => (
                    <ProductPreviewCard
                        key={i}
                        index={i}
                    >
                        <ProductPreviewBody title={name}>
                            <ProductPreviewImages
                                images={images.map((image) => ({
                                    src: image,
                                    alt: `Product Image ${i}`,
                                }))}
                            />
                        </ProductPreviewBody>
                        <ProductPreviewFooter>
                            <ColorSwatchGroup isSquared>
                                {colors.map((color, c) => (
                                    <ColorSwatch
                                        key={c}
                                        value={c.toString()}
                                        color={color}
                                        isSquared
                                    />
                                ))}
                            </ColorSwatchGroup>
                        </ProductPreviewFooter>
                    </ProductPreviewCard>
                ))}
            </menu>
        </section>
    );
}
