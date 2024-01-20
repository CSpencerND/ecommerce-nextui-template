import { create } from "zustand";

import type { Maybe, Product } from "@/types";

type ProductDrawerStore = {
    data: Maybe<Product>;
    setData: (data: Product) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onOpen: (data: Product) => void;
    onClose: () => void;
};

export const useProductDrawer = create<ProductDrawerStore>()((set) => ({
    data: null,
    setData: (data) => set({ data }),
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen: isOpen }),
    onOpen: (data) => set({ data: data, isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
