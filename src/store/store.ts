import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface StoreType {
	session: object | null
	setSession: (session: object) => void
	user: { id: string; store: number } | null
	setUser: (user: object) => void
	isRemembered: boolean
	setIsRemembered: (isRemembered: boolean) => void
	fetchMaxCount: number
	setFetchMaxCount: (fetchMaxCount: number) => void
	cartList: object[]
	setCartList: (cartList: object[]) => void
	compareList: object[]
	setCompareList: (compareList: object[]) => void
	wishList: object[]
	setWishList: (wishList: object[]) => void
	singleProduct: object | null
	setSingleProduct: (singleProduct: object) => void
	clear: () => void
}
export type { StoreType }

const useStore = create(
	devtools(
		persist(
			(set) =>
				({
					session: null,
					setSession: (session) => set({ session }),
					user: null,
					setUser: (user) => set({ user }),
					isRemembered: false,
					setIsRemembered: (isRemembered) => set({ isRemembered }),
					fetchMaxCount: 8,
					setFetchMaxCount: (fetchMaxCount) => set({ fetchMaxCount }),
					cartList: [],
					setCartList: (cartList) => set({ cartList }),
					compareList: [],
					setCompareList: (compareList) => set({ compareList }),
					wishList: [],
					setWishList: (wishList) => set({ wishList }),
					singleProduct: null,
					setSingleProduct: (singleProduct) => set({ singleProduct }),
					clear: () =>
						set({
							session: null,
							user: null,
							isRemembered: false,
							fetchMaxCount: 8,
							cartList: [],
							compareList: [],
							wishList: [],
							setSingleProduct: null,
						}),
				} as StoreType),
			{
				name: "Store",
			}
		)
	)
)

export default useStore
