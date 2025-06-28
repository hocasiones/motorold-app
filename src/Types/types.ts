export interface ProductsType {
	id: string
	product_name: string
	prices: {
		store_price: number
	}
	featured_image: {
		id: string
	}
}

export interface Schema {
	products: ProductsType[]
}
