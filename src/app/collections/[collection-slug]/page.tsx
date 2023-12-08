import { ColorSelect } from "./[product-slug]/components/color-select";
import { ProductImageGroup } from "./[product-slug]/components/product-image-group";
import {
    ProductPreviewBody,
    ProductPreviewCard,
    ProductPreviewFooter,
} from "./components/product-preview";

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
                        <ProductPreviewBody
                            title={name}
                            slug={name}
                        >
                            <ProductImageGroup
                                images={images.map((image) => ({
                                    src: image,
                                    alt: `Product Image ${i}`,
                                }))}
                            />
                        </ProductPreviewBody>
                        <ProductPreviewFooter>
                            <ColorSelect
                                colors={colors}
                                buttonSize="sm"
                                isSquared
                                noWrap
                                className="@[146px]/footer:justify-between gap-4 bg-content2 shadow-small"
                            />
                        </ProductPreviewFooter>
                    </ProductPreviewCard>
                ))}
            </menu>
        </section>
    );
}
