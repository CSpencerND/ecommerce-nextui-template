"use client";

import { Button } from "@nextui-org/button";
import { Radio, RadioGroup, RadioGroupProps, RadioProps, useRadio } from "@nextui-org/radio";
import { VisuallyHidden, cn } from "@nextui-org/react";
import { focusVisibleClasses, radio } from "@nextui-org/theme";

export function ColorSwatchGroup(props: RadioGroupProps) {
    return (
        <RadioGroup
            as="menu"
            aria-label="Select A Color"
            orientation="horizontal"
            size="lg"
            classNames={{
                wrapper: [
                    "flex-nowrap justify-between overflow-x-scroll",
                    "rounded-large bg-content2 scrollbar-hide",
                    "p-1.5 gap-1.5",
                    ...focusVisibleClasses.concat("focus-visible:outline-none"),
                ],
            }}
            {...props}
        />
        //     {colors.map((color, i) => (
        //         <Radio
        //             key={i}
        //             value={i.toString()}
        //             defaultValue={i.toString()}
        //             defaultChecked
        //             color="default"
        //             classNames={{
        //                 wrapper: "hover:bg-opacity-80 h-7 w-7 sm:h-8 sm:w-8",
        //                 base: "grid place-items-center",
        //                 control: "bg-transparent",
        //             }}
        //         />
        //     ))}
        // </RadioGroup>
    );
}

type ColorSwatchProps = Omit<RadioProps, "color"> & {
    color: string;
};

export function ColorSwatch({ color, ...props }: ColorSwatchProps) {
    const {
        Component,
        isSelected,
        getBaseProps,
        getWrapperProps,
        getInputProps,
        getControlProps,
    } = useRadio(props);

    return (
        <Component {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span
                {...getWrapperProps({
                    className: "aspect-square h-7 w-7 sm:h-8 sm:w-8 rounded-lg",
                    style: { backgroundColor: color },
                })}
            >
                <span {...getControlProps()} />
            </span>
        </Component>
    );
}
