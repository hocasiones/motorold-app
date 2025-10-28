"use client"

import { HomeContext } from "@/context/context"
import { ProductsType } from "@/types/types"
import { SimpleGrid } from "@mantine/core"
import { useContext } from "react"
import ProductCard from "../[slug]/Components/ProductCard"

const ProductGrid = () => {
	const { products } = useContext(HomeContext)
	return (
		<SimpleGrid
			cols={{ base: 2, xs: 3, sm: 4, md: 5, lg: 6, xl: 6 }}
			spacing="lg"
		>
			{products?.map((product: ProductsType) => (
				<ProductCard product={product} key={product?.id} />
			))}
		</SimpleGrid>
	)
}

export default ProductGrid
