"use client"

import { HomeContext } from "@/Context/context"
import useStore from "@/store/store"
import { ProductsType } from "@/Types/types"
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
import Link from "next/link"
import { useContext } from "react"

const ProductGrid = () => {
	const store: any = useStore()
	const { products } = useContext(HomeContext)

	return (
		<SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing="xl">
			{products?.data?.map((product: ProductsType) => (
				<Card key={product.id} withBorder shadow="sm" padding="lg">
					<Card.Section
						component={Link}
						href={`/products/${product.id}`}
						style={(theme) => ({
							backgroundColor: theme.colors.blue,
						})}
					>
						<Image
							src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${product?.featured_image?.id}?width=600&height=600&fit=cover`}
							h={`100%`}
							alt={product.product_name}
							onClick={() => store.setSingleProduct(product)}
						/>
					</Card.Section>
					<Stack gap={5} mt="lg" justify="space-between" h={`100%`}>
						<Box>
							<Title order={4}>{product.product_name}</Title>
							<Rating value={4.5} fractions={2} readOnly />
							<Text size="xl" fz={24} fw={600} c="red">
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
							wrap="nowrap"
						>
							<Button
								color="blue"
								leftSection={<IconEye size={22} />}
								component={Link}
								href={`/products/${product.id}`}
								onClick={() => store.setSingleProduct(product)}
							>
								VIEW
							</Button>
							<Button color="red" leftSection={<IconShoppingCart size={20} />}>
								ADD TO CART
							</Button>
						</Group>
					</Stack>
				</Card>
			))}
		</SimpleGrid>
	)
}

export default ProductGrid
