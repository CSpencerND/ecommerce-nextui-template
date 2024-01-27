"use client";

import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem } from "@/types";

type CartStore = {
    items: CartItem[];
    addItem: (data: CartItem) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    // increment: (cartIndex: number) => void
    // decrement: (cartIndex: number) => void
    // getTotalPrice: () => number;
};

// type CartStore = {
//     items: Product[]
//     addItem: (data: Product) => void
//     removeAll: () => void
//     removeItem: (id: string) => void
//     increment: (cartIndex: number) => void
//     decrement: (cartIndex: number) => void
//     getTotalPrice: () => number
//     paymentIntentId: string
//     setPaymentIntentId: (id: string) => void
//     stripeClientSecret: string
//     setStripeClientSecret: (clientSecret: string) => void
//     resetCart: () => void
// }

export const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],

            addItem: (newItem) => {
                const isCurrentlyInCart = get().items.find(
                    (item) => item.product.id === newItem.product.id,
                );

                if (isCurrentlyInCart) {
                    return toast("Item already in cart.");
                }

                set((state) => ({ items: [...state.items, newItem] }));
                toast.success("Item added to cart");
            },

            removeItem: (id) => {
                set((s) => ({
                    items: [...s.items.filter((item) => item.product.id !== id)],
                }));
            },

            removeAll: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

// export const useCart = create(
//     persist<CartStore>(
//         (set, get) => ({
//             items: [],
//
//             addItem: (data) => {
//                 const currentItems = get().items
//                 const isCurrentlyInCart = currentItems.find((item) => item.id === data.id)
//
//                 if (isCurrentlyInCart) {
//                     // return toast("Item already in cart. You can add more on the cart page.")
//                 }
//
//                 set({ items: [...currentItems, { product: data, quantity: 1 }] })
//                 // toast.success("Item added to cart")
//             },
//
//             removeAll: () => set({ items: [] }),
//
//             removeItem: (id) => {
//                 set({ items: [...get().items.filter((item) => item.id !== id)] })
//                 // toast.success("Item removed from cart")
//             },
//
//             increment: (cartIndex) => {
//                 let updatedItems: Product[] = []
//                 const currentItems = get().items
//                 updatedItems = [...currentItems]
//
//                 if (cartIndex > -1) {
//                     updatedItems[cartIndex].quantity = ++updatedItems[cartIndex].quantity
//                 }
//
//                 set({ items: updatedItems })
//             },
//
//             decrement: (cartIndex) => {
//                 let updatedItems: TCartItem[] = []
//                 const currentItems = get().items
//                 if (currentItems[cartIndex].quantity === 1) return
//                 updatedItems = [...currentItems]
//
//                 if (cartIndex > -1) {
//                     updatedItems[cartIndex].quantity = --updatedItems[cartIndex].quantity
//                 }
//
//                 set({ items: updatedItems })
//             },
//
//             getTotalPrice: () => {
//                 return get().items.reduce((total, item) => {
//                     return total + Number(item.price) * item.quantity
//                 }, 0)
//             },
//
//             paymentIntentId: "",
//             setPaymentIntentId: (id) => set({ paymentIntentId: id }),
//
//             stripeClientSecret: "",
//             setStripeClientSecret: (clientSecret) => set({ stripeClientSecret: clientSecret }),
//
//             resetCart: () => set({ items: [], paymentIntentId: "", stripeClientSecret: "" }),
//         }),
//         {
//             name: "cart-storage",
//             storage: createJSONStorage(() => localStorage),
//         }
//     )
// )
