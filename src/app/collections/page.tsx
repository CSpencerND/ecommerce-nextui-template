import {
    ProductCard,
    ProductCardBody,
    ProductCardFooter,
    ProductImage,
} from "@/components/product";

import { MotionListItem } from "@/components/utility/motion";
import { Link } from "@nextui-org/link";

import { getCollections } from "@/actions";

import { grid, heading, prose, section } from "@/styles";

export default async function CollectionDirectoryPage() {
    const collections = await getCollections();

    return (
        <section className={section()}>
            <header className={prose({ class: "px-6 max-lg:text-center" })}>
                <h1 className={heading()}>Collection Directory</h1>
            </header>
            <menu className={grid()}>
                {collections.map(({ image, name }, i) => (
                    <MotionListItem
                        key={`Collection ${i}`}
                        index={i}
                    >
                        <ProductCard
                            isFooterAbsolute
                            isFooterBlurred
                            isPressable
                            isBodyLink
                        >
                            <ProductCardBody
                                as={Link}
                                href={`/collections/${name.toLowerCase()}`}
                            >
                                <ProductImage
                                    src={image}
                                    alt={name}
                                    size="preview"
                                />
                                <ProductCardFooter title={name} />
                            </ProductCardBody>
                        </ProductCard>
                    </MotionListItem>
                ))}
            </menu>
        </section>
    );
}
