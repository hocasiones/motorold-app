"use client"

import directus from "@/directus/directus"
import Fragments from "@/graphql/fragments"
import useStore from "@/store/store"
import { Grid } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { use, useEffect } from "react"
import ProductCarousel from "./Components/ProductCarousel"
import ProductDetails from "./Components/ProductDetails"
import ProductTabs from "./Components/ProductTabs"

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = use(params)
	const product = useStore((state: any) => state.singleProduct)
	const setSingleProduct = useStore((state: any) => state.setSingleProduct)

	const query = useQuery({
		queryKey: ["product", product?.id],
		queryFn: async () => {
			const { products_by_id } = await directus.query(`
					${Fragments}
					query {
						products_by_id (id: "${slug}") {
							...ProductFragment
						}
					}
				`)
			return products_by_id
		},
		enabled: !product,
	})

	useEffect(() => {
		if (query.isFetched && query.data) {
			setSingleProduct({ ...query.data })
		}
	}, [query.isFetched, query.data, setSingleProduct])

	return (
		<Grid gutter="xl">
			<Grid.Col span={{ base: 12, md: 6 }}>
				<ProductCarousel />
			</Grid.Col>
			<Grid.Col span={{ base: 12, md: 6 }}>
				<ProductDetails />
			</Grid.Col>
			<Grid.Col span={12}>
				<ProductTabs />
			</Grid.Col>
		</Grid>
	)
}

export default Page
