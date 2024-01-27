import { ShoppingCartIcon as CartIcon } from "lucide-react";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export function Cart() {
    return (
        <Button
            as={Link}
            href="/cart"
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
