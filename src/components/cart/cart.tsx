import { ShoppingCartIcon as CartIcon } from "lucide-react";
import { Button } from "@nextui-org/button";

export function Cart() {
    return (
        <Button
            isIconOnly
            variant="light"
        >
            <CartIcon
                size={22}
                className="stroke-foreground-600"
            />
        </Button>
    );
}
