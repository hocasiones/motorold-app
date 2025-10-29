"use client"

import { HomeContext } from "@/context/context"
import directus from "@/directus/directus"
import Fragments, { ProductIDsFragments } from "@/graphql/fragments"
import useStore from "@/store/store"
import { ProductsType } from "@/types/types"
import ArrtoArrText from "@/utils/ArrtoArrText"
import Randomize from "@/utils/Randomize"
import {
	Button,
	Group,
	Paper,
	SimpleGrid,
	Skeleton,
	Space,
	Stack,
} from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import ProductCard from "./products/[slug]/Components/ProductCard"

export default function Page() {
	const store: any = useStore()
	const [productIDs, setProductIDs] = useState<string[]>([])
	const [products, setProducts] = useState<any[]>([])

	const queryProducts = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const { products: prodIDs } = await directus.query(`
			${ProductIDsFragments}
			query {
				products (limit: -1, filter: {
					status:{
						_eq: "published"
					}
				}) {
					...ProductIDsFragment
				}
			}
			`)

			const randomIDs = Randomize(prodIDs).slice(0, store.fetchMaxCount)
			setProductIDs(randomIDs)

			const { products } = await directus.query(`
			${Fragments}
			query {
				products (filter: {
					id: {
						_in: ${ArrtoArrText(randomIDs)}
					},
				}) {
					...ProductFragment
				}
			}
			`)

			return products
		},
		refetchOnWindowFocus: false,
	})

	const mutationProducts = useMutation({
		mutationFn: async () => {
			const { products: prodIDs } = await directus.query(`
			${ProductIDsFragments}
			query {
				products (limit: -1, filter: {
					id: {
						_nin: ${ArrtoArrText(productIDs)}
					},
					status:{
						_eq: "published"
					}
				}) {
					...ProductIDsFragment
				}
			}
			`)

			const randomIDs = Randomize(prodIDs).slice(0, store.fetchMaxCount)

			setProductIDs((prev) => [...prev, ...randomIDs])

			const { products } = await directus.query(`
			${Fragments}
			query {
				products (filter: {
					id: {
						_in: ${ArrtoArrText(randomIDs)}
					},
				}) {
					...ProductFragment
				}
			}
			`)

			return products
		},
		onSuccess: (data: any[]) => {
			setProducts((prev) => [...prev, ...data])
		},
	})

	useEffect(() => {
		setProducts(queryProducts?.data)
	}, [queryProducts?.data])

	const ctx = useMemo(() => {
		return {
			products,
		}
	}, [products])

	const Loading = () => {
		return (
			<SimpleGrid
				cols={{ base: 2, xs: 3, sm: 4, md: 5, lg: 6, xl: 6 }}
				spacing="xl"
			>
				{Array.from({ length: store?.fetchMaxCount }).map((_, index) => (
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
				{queryProducts.isLoading ? (
					<Loading />
				) : (
					<SimpleGrid
						cols={{ base: 2, xs: 3, sm: 4, md: 5, lg: 6, xl: 6 }}
						spacing="lg"
					>
						{products?.map((product: ProductsType) => (
							<ProductCard product={product} key={product?.id} />
						))}
					</SimpleGrid>
				)}
				{queryProducts.isSuccess && (
					<Group justify="center" mt={20} grow>
						<Button
							variant="outline"
							color="violet"
							size="sm"
							loading={queryProducts.isLoading || mutationProducts.isPending}
							onClick={() => {
								mutationProducts.mutate()
							}}
						>
							LOAD MORE PRODUCTS
						</Button>
					</Group>
				)}
			</Stack>
		</HomeContext.Provider>
	)
}
