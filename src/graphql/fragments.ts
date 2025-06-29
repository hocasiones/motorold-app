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
	categories {
		product_categories_id {
			id
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
			shelf
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
					shelf
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

export default Fragments
