import { ProductImageGroupProvider } from "./product-image-group-context";

export function ProductProvider({ children }: React.PropsWithChildren) {
    return <ProductImageGroupProvider>{children}</ProductImageGroupProvider>;
}
