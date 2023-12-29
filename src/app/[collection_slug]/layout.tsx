export default function CollectionLayout({
    children,
    product_modal,
}: {
    children: React.ReactNode;
    product_modal: React.ReactNode;
}) {
    return (
        <>
            {children}
            {product_modal}
        </>
    );
}
