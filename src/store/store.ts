import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface StoreType {
	session: object | null
	setSession: (session: object) => void
	user: { id: string; store: number } | null
	setUser: (user: object) => void
	isRemembered: boolean
	setIsRemembered: (isRemembered: boolean) => void
	darkMode: boolean
	setDarkMode: (darkMode: boolean) => void
	fetchMaxCount: number
	setFetchMaxCount: (fetchMaxCount: number) => void
	cartList: object[]
	setCartList: (cartList: object[]) => void
	setCartListItem: (index: number, item: object) => void
	setAppendCartList: (item: object) => void
	getCartListSubTotal: () => number
	removeCartListItem: (index: number) => void
	compareList: object[]
	setCompareList: (compareList: object[]) => void
	wishList: object[]
	setWishList: (wishList: object[]) => void
	singleProduct: object | null
	setSingleProduct: (singleProduct: object) => void
	searchValue: string
	setSearchValue: (searchValue: string) => void
	clear: () => void
}
export type { StoreType }

const useStore = create(
	devtools(
		persist(
			(set, get: any) =>
				({
					session: null,
					setSession: (session) => set({ session }),
					user: null,
					setUser: (user) => set({ user }),
					isRemembered: false,
					setIsRemembered: (isRemembered) => set({ isRemembered }),
					darkMode: false,
					setDarkMode: (darkMode) => set({ darkMode }),
					fetchMaxCount: 18,
					setFetchMaxCount: (fetchMaxCount) => set({ fetchMaxCount }),
					cartList: [],
					setCartList: (items) => set({ items }),
					setCartListItem: (index, item) => {
						const cartList = get().cartList
						cartList[index] = item
						set({ cartList })
					},
					setAppendCartList: (item) => {
						const cartList = get().cartList
						cartList.push(item)
						set({ cartList })
					},
					getCartListSubTotal: () => {
						return get().cartList.reduce((acc: number, curr: any) => {
							if (!curr?.has_variations) {
								return acc + curr?.prices?.store_price * curr?.quantity
							}
							return (
								acc +
								curr?.selectedVariant?.prices?.store_price * curr?.quantity
							)
						}, 0)
					},
					removeCartListItem: (index) => {
						const cartList = get().cartList
						cartList.splice(index, 1)
						set({ cartList })
					},
					compareList: [],
					setCompareList: (compareList) => set({ compareList }),
					wishList: [],
					setWishList: (wishList) => set({ wishList }),
					singleProduct: null,
					setSingleProduct: (singleProduct) => set({ singleProduct }),
					searchValue: "",
					setSearchValue: (searchValue) => set({ searchValue }),
					clear: () =>
						set({
							session: null,
							user: null,
							isRemembered: false,
							fetchMaxCount: 8,
							cartList: [],
							compareList: [],
							wishList: [],
							singleProduct: null,
						}),
				} as StoreType),
			{
				name: "Store",
			}
		)
	)
)

export default useStore
