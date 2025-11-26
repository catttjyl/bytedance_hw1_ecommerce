import { create } from "zustand";
import { getCart, addCart, deleteItem, updateCart } from "../utils/services";
import { persist } from 'zustand/middleware';
import { getColorCategory } from "../utils/utils";

export const useCartStore = create(persist(
	(set, get) => ({
		cart: [],
		cartOpen: false,
		fetchCart: () => {
			getCart().then(res => {
					set({ cart: res.data })
			})
		},
		toggleOpen: () => {
			set((state) => ({ cartOpen: !state.cartOpen }));
		},
		addToCart: (item, size, varIdx, quantity = 1) => {
			const variant = item.variant[varIdx];
			const color = getColorCategory(variant.color)
			const skuId = `${item.id}-${color}-${variant.size}`;
			const newItem = {
				id: skuId,
				name: item.name,
				img: variant.img.cover,
				color: color,
				size:size,
				originPrice:variant.originPrice,
				sales:variant.sales,
				isSaled:variant.isSaled,
				actualPrice:variant.actualPrice,
				quantity: quantity
			}
			addCart(newItem).then(res => {
				get().fetchCart();
				get().toggleOpen();
			})
		},
		increaseItem: (cartItemId) => {

		},
		decreaseItem: (item) => {

		},
		deleteFromCart: (id) => {
			deleteItem(id).then(res => {
				get().fetchCart();
			})
		},
		updateCartItem: (id, value) => {
			updateCart(id, value).then(res => {
				get().fetchCart();
			})
		}
	}),
	{
    name: "cart-storage",
  }
));
