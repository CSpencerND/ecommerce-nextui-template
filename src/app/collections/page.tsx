import { ProductImage } from "@/components/product";
import { MotionListItem } from "@/components/utility/motion";
import { Card, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import { getCollections } from "@/actions";

import { card, grid, prose, section, title } from "@/styles";

export default async function CollectionDirectoryPage() {
    const collections = await getCollections();

    return (
        <section className={section()}>
            <header className={prose({ class: "px-6 max-lg:text-center" })}>
                <h1 className={title()}>Collection Directory</h1>
            </header>
            <menu className={grid()}>
                {collections.map(({ image, name }, i) => (
                    <Card
                        as={MotionListItem}
                        key={i}
                        index={i}
                        isFooterBlurred
                        isPressable
                        className={card.root()}
                    >
                        <Link href={`/collections/${name.toLowerCase()}`}>
                            <ProductImage
                                src={image}
                                alt={name}
                                size="preview"
                            />
                            <CardFooter className={card.title()}>
                                <h3 className="text-large">{name}</h3>
                            </CardFooter>
                        </Link>
                    </Card>
                ))}
            </menu>
        </section>
    );
}
