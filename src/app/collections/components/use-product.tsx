"use client";

import { create } from "zustand";

// TODO: Utilize store splitting ... or whatever it's called ... to make a color swatch store

export type ProductStore = {
    selectedIndex: number | string;
    setIndex: (i: number | string) => void;
};

export const useProduct = create<ProductStore>()((set) => ({
    selectedIndex: 0,
    setIndex: (i) => set({ selectedIndex: i }),
}));
