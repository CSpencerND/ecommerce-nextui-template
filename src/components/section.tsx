import { cn } from "@nextui-org/react";

export function Section(props: React.ComponentProps<"section">) {
    return (
        <section
            className={cn(
                "relative flex flex-col items-center justify-center gap-4 py-8 md:py-10",
                props.className,
            )}
            {...props}
        />
    );
}
