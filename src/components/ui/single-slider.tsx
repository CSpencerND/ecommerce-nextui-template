import { Button } from "@nextui-org/button";
import { ChevronUpIcon } from "lucide-react";

import { cn } from "@nextui-org/system";
import { useState } from "react";

export function SingleSlider({ children }: React.PropsWithChildren) {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div
            className="group flex flex-col gap-3"
            data-show={show}
        >
            <Button
                size="sm"
                variant="light"
                disableRipple
                onPress={() => setShow((prev) => !prev)}
            >
                <ChevronUpIcon
                    size={22}
                    className="stroke-foreground-500 stroke-[4] group-data-[show=true]:rotate-180"
                />
            </Button>
            <div
                className={cn(
                    "grid transition-[grid-template-rows]",
                    "group-data-[show=false]:grid-rows-[0fr]",
                    "group-data-[show=true]:grid-rows-[1fr]",
                )}
            >
                <div className="overflow-clip">
                    <div className="space-y-3 pb-6 pt-3">{children}</div>
                </div>
            </div>
        </div>
    );
}
