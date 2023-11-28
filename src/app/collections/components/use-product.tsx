"use client";

import { create } from "zustand";

export type SwatchStore = {
    selectedIndex: number | string;
    setIndex: (i: number | string) => void;
};

export const useSwatch = create<SwatchStore>()((set) => ({
    selectedIndex: 0,
    setIndex: (i) => set({ selectedIndex: i }),
}));
