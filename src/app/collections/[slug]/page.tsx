import { ColorSwatch, ColorSwatchGroup } from "./components/color-swatch";

import {
    ProductPreview,
    ProductPreviewBody,
    ProductPreviewCard,
    ProductPreviewFooter,
} from "./components/product-preview";

import { getFakeData, preloadFakeData } from "@/faker/faker-functions";

import { section, title } from "@/styles";

export default async function CollectionPage() {
    preloadFakeData("collection");
    const { name, description, items } = await getFakeData("collection");

    return (
        <section className={section()}>
            <header className="prose px-6 dark:prose-invert max-lg:text-center">
                <h1 className={title()}>{name}</h1>
                <p>{description}</p>
            </header>
            <menu className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6">
                {items.map((item, i) => (
                    <ProductPreview
                        key={i}
                        index={i}
                        title={item.name}
                        alt={item.name}
                        images={item.images}
                    >
                        <ProductPreviewCard>
                            <ProductPreviewBody />
                            <ProductPreviewFooter>
                                <ColorSwatchGroup isSquared>
                                    {item.colors.map((color, c) => (
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
                    </ProductPreview>
                ))}
            </menu>
        </section>
    );
}
