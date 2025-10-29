"use client"

import directus from "@/directus/directus"
import Fragments from "@/graphql/fragments"
import useStore from "@/store/store"
import { ProductsType } from "@/types/types"
import {
	ActionIcon,
	Loader,
	Paper,
	SimpleGrid,
	Skeleton,
	Space,
	Stack,
	TextInput,
	Tooltip,
} from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { IconSearch, IconX, IconXboxX } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import ProductCard from "../products/[slug]/Components/ProductCard"

const Loading = ({ store }: any) => {
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

const Page = () => {
	const store: any = useStore()
	const [debounced] = useDebouncedValue(store?.searchValue, 500)
	const inputRef = useRef<HTMLInputElement>(null)

	// console.log("Products", products)
	// console.log("Search", search)
	// console.log("debounced", debounced)

	const querySearch = useQuery({
		queryKey: ["search"],
		queryFn: async () => {
			const searchArr = store?.searchValue.trim().split(" ")

			let productQueryFilter = ""
			searchArr.forEach((value: string) => {
				productQueryFilter += `{
					product_name: {
						_contains: "${value}"
					}
					status: {
						_eq: "published"
					}
				}`
			})

			const { products } = await directus.query(`
				${Fragments}
				query {
					products (filter: {
					_and: [${productQueryFilter}]
					}) {
						...ProductFragment
					}
				}
			`)

			// console.log(products)

			return products
		},
		enabled: false,
		refetchOnMount: false,
	})

	useEffect(() => {
		if (debounced && store?.searchValue.length >= 3) {
			querySearch.refetch()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounced, store?.searchValue.length])

	return (
		<Stack>
			<TextInput
				ref={inputRef}
				label="Search Product:"
				labelProps={{ style: { fontSize: 14, marginBottom: 5 } }}
				size="lg"
				radius={10}
				pointer
				placeholder="Search"
				leftSection={<IconSearch size={20} />}
				rightSection={
					querySearch.isFetching ? (
						<Loader color="blue" size="sm" />
					) : store?.searchValue ? (
						<Tooltip label="Clear Search">
							<ActionIcon
								variant="light"
								color="red"
								radius="xl"
								aria-label="Settings"
								onClick={() => {
									store?.setSearchValue("")
									inputRef.current?.focus()
								}}
							>
								<IconXboxX size={24} />
							</ActionIcon>
						</Tooltip>
					) : (
						<></>
					)
				}
				autoFocus
				value={store?.searchValue}
				onChange={(e) => {
					store?.setSearchValue(e.target.value)
				}}
			/>
			<Stack>
				{querySearch.isLoading ? (
					<Loading store={store} />
				) : (
					<SimpleGrid
						cols={{ base: 2, xs: 3, sm: 4, md: 5, lg: 6, xl: 6 }}
						spacing="lg"
					>
						{querySearch?.data?.map((product: ProductsType) => (
							<ProductCard product={product} key={product?.id} />
						))}
					</SimpleGrid>
				)}
			</Stack>
		</Stack>
	)
}

export default Page
