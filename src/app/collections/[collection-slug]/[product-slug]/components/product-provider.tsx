import { ProductPreviewProvider } from "../../components/product-preview-context";

export function ProductProvider({ children }: React.PropsWithChildren) {
    return <ProductPreviewProvider>{children}</ProductPreviewProvider>;
}
