"use client"

import { SingleProuctContext } from "@/context/context"
import directus from "@/directus/directus"
import Fragments from "@/graphql/fragments"
import { Grid } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { use, useMemo } from "react"
import ProductCarousel from "./Components/ProductCarousel"
import ProductDetails from "./Components/ProductDetails"
import ProductTabs from "./Components/ProductTabs"

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = use(params)

	const query = useQuery({
		queryKey: ["product"],
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
		// enabled: !product,
	})

	const ctx = useMemo(() => {
		return {
			product: query,
		}
	}, [query])

	return (
		<SingleProuctContext.Provider value={ctx}>
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
		</SingleProuctContext.Provider>
	)
}

export default Page
