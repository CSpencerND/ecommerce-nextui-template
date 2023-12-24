"use client";

import { createContext, useContext, useState } from "react";

type ActiveImageContext = {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ActiveImageContext = createContext<ActiveImageContext | null>(null);

export function ActiveImageProvider({ children }: React.PropsWithChildren) {
    const [activeIndex, setActiveIndex] = useState(0);

    const context = { activeIndex, setActiveIndex };

    return (
        <ActiveImageContext.Provider value={context}>{children}</ActiveImageContext.Provider>
    );
}

export function useActiveImage() {
    const context = useContext(ActiveImageContext);

    if (!context) {
        throw new Error(
            "useActiveImage: `context` is undefined. Seems you forgot to wrap the component with <ActiveImageProvider />",
        );
    }

    return context;
}
