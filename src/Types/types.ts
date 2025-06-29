export interface ProductsType {
	id: string
	product_name: string
	prices: {
		store_price: number
	}
	featured_image: {
		id: string
	}
	has_variations: boolean
	quantity: number
	selectedVariant?: any
}

export interface Schema {
	products: ProductsType[]
}
