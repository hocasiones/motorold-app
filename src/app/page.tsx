"use client"

import ProductGrid from "@/app/products/Components/ProductGrid"
import { HomeContext } from "@/Context/context"
import directus from "@/directus/directus"
import Fragments from "@/graphql/fragments"
import useStore from "@/store/store"
import { Paper, SimpleGrid, Skeleton, Space, Stack, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export default function Page() {
	const store: any = useStore()

	const products = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const { products } = await directus.query(`
			${Fragments}
			query {
				products (limit: ${store.fetchMaxCount}) {
					...ProductFragment
				}
			}
			`)
			return products
		},
	})

	// console.log("Products:", products.data)

	const ctx = useMemo(() => {
		return {
			products,
		}
	}, [products])

	const Loading = () => {
		return (
			<SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing="xl">
				{Array.from({ length: store.fetchMaxCount }).map((_, index) => (
					<Paper key={`key-${index + 1}`} p="md" shadow="sm">
						<Skeleton height={160} />
						<Stack gap={5} mt="lg">
							<Skeleton height={10} width="60%" />
							<Skeleton height={10} width="100%" />
							<Skeleton height={10} width="100%" />
							<Space h="md" />
							<Skeleton height={20} width="100%" />
						</Stack>
					</Paper>
				))}
			</SimpleGrid>
		)
	}

	return (
		<HomeContext.Provider value={ctx}>
			<Stack>
				<Text>Test</Text>
				{products.isLoading ? <Loading /> : <ProductGrid />}
			</Stack>
		</HomeContext.Provider>
	)
}
