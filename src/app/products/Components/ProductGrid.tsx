"use client"

import { HomeContext } from "@/context/context"
import useStore from "@/store/store"
import { ProductsType } from "@/types/types"
import {
	Box,
	Button,
	Card,
	Group,
	Image,
	NumberFormatter,
	Rating,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core"
import { IconEye, IconShoppingCart } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const ProductGrid = () => {
	const store: any = useStore()
	const { products } = useContext(HomeContext)
	const router = useRouter()

	// useEffect(() => {
	// 	setDisplayedProducts([...(products || []), ...(loadMoreProducts || [])])
	// }, [products, loadMoreProducts])

	return (
		<SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing="lg">
			{products?.map((product: ProductsType) => (
				<Card key={product.id} withBorder shadow="sm">
					<Card.Section
						style={(theme) => ({
							backgroundColor: theme.colors.blue,
							cursor: "pointer",
						})}
					>
						<Image
							src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${product?.featured_image?.id}?width=300&height=300&fit=cover`}
							h={`100%`}
							alt={product.product_name}
							onClick={() => {
								store?.setSingleProduct(product)
								router.push(`/products/${product.id}`)
							}}
						/>
					</Card.Section>
					<Stack gap={5} mt="lg" justify="space-between" h={`100%`}>
						<Box>
							<Title order={4} size={16}>
								{product.product_name}
							</Title>
							<Rating value={4.5} fractions={2} readOnly />
							<Text size="xl" fz={20} fw={600} c="red">
								{product?.prices && (
									<NumberFormatter
										prefix="₱"
										value={product?.prices?.store_price}
										thousandSeparator
									/>
								)}
							</Text>
						</Box>

						<Group
							mt="md"
							gap={10}
							grow
							preventGrowOverflow={false}
							wrap="wrap"
						>
							<Button
								color="blue"
								leftSection={<IconEye size={22} />}
								onClick={() => {
									store?.setSingleProduct(product)
									router.push(`/products/${product.id}`)
								}}
							>
								{product?.has_variations ? "VIEW VARIANTS" : "VIEW"}
							</Button>
							{!product?.has_variations && (
								<Button
									color="red"
									leftSection={<IconShoppingCart size={20} />}
								>
									ADD TO CART
								</Button>
							)}
						</Group>
					</Stack>
				</Card>
			))}
		</SimpleGrid>
	)
}

export default ProductGrid
