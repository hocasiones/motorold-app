const Fragments = `
fragment ProductFragment on products {
	id
	sku
	featured_image {
		id
	}
	images {
		directus_files_id {
			id
		}
	}
	status
	product_name
	description
	has_variations
	product_categories {
		product_categories_id {
			category_name
		}
	}
	prices {
		store_price
	}
	stocks {
		product_stocks_id {
			id
			stock
			store {
				id
				store_name
			}
		}
	}
	variations {
		product_variations_id {
			id
			sku
			image {
				id
			}
			variation_name
			type
			prices {
				store_price
			}
			status
			stocks {
				product_stocks_id {
					id
					stock
					store {
						id
						store_name
					}
				}
			}
		}
	}
}
`

const ProductIDsFragments = `
fragment ProductIDsFragment on products {
	id
}
`

export { ProductIDsFragments }
export default Fragments
