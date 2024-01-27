import { Button, type ButtonProps } from "@nextui-org/button";
import { useCart } from "./cart-store";

import type { Product } from "@/types";

export function AddToCartButton({
    item,
    ...props
}: {
    item: Product;
} & ButtonProps) {
    const addItem = useCart((s) => s.addItem);

    return (
        <Button
            color="primary"
            variant="ghost"
            fullWidth
            onPress={() => addItem(item)}
            {...props}
        >
            Add To Cart
        </Button>
    );
}
