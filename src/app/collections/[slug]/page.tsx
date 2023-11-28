import { section, title } from "@/components/primitives";
import { ColorSwatch, ColorSwatchGroup } from "@collections/components/color-swatch";

import {
    ProductPreviewCard,
    ProductPreviewCardBody,
    ProductPreviewCardFooter,
} from "@collections/components/product-preview-card";

import { getFakeData } from "@/faker/faker-functions";

export default async function CollectionPage() {
    const { name, description, items } = await getFakeData("collection");

    return (
        <section className={section()}>
            <header className="prose px-6 dark:prose-invert max-lg:text-center">
                <h1 className={title()}>{name}</h1>
                <p>{description}</p>
            </header>
            <menu className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6">
                {/* PERF: The `ProductPreviewCard` may need to become a context provider */}
                {items.map((item, i) => (
                    <ProductPreviewCard
                        key={i}
                        index={i}
                    >
                        <ProductPreviewCardBody
                            title={item.name}
                            alt={item.name}
                            images={item.images}
                        />
                        <ProductPreviewCardFooter>
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
                        </ProductPreviewCardFooter>
                    </ProductPreviewCard>
                ))}
            </menu>
        </section>
    );
}
