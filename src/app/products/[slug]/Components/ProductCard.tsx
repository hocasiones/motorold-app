import useStore from "@/store/store"
import {
	Button,
	Card,
	Group,
	Image,
	NumberFormatter,
	Overlay,
	Rating,
	Stack,
	Text,
	Title,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { IconEye, IconShoppingCart } from "@tabler/icons-react"
import _ from "lodash"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ProductCard = ({ product }: any) => {
	const store: any = useStore()
	const { hovered, ref } = useHover()
	const router = useRouter()
	const [minVariantPrice, setMinVariantPrice] = useState<number>(0)
	const [maxVariantPrice, setMaxVariantPrice] = useState<number>(0)

	// console.log(minVariantPrice, maxVariantPrice)
	// console.log(product)

	useEffect(() => {
		if (product?.has_variations) {
			const min = product?.variations?.reduce((acc: any, curr: any) => {
				const currStorePrice = curr?.product_variations_id?.prices?.store_price
				const accStorePrice = acc?.product_variations_id?.prices?.store_price
				return currStorePrice < accStorePrice ? currStorePrice : accStorePrice
			})
			setMinVariantPrice(min || 0)
			const max = product?.variations?.reduce((acc: any, curr: any) => {
				const currStorePrice = curr?.product_variations_id?.prices?.store_price
				const accStorePrice = acc?.product_variations_id?.prices?.store_price
				return currStorePrice > accStorePrice ? currStorePrice : accStorePrice
			})
			setMaxVariantPrice(max || 0)
		}
	}, [product?.has_variations, product?.variations])

	return (
		<Card withBorder shadow="sm" ref={ref}>
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
			<Card.Section h={`100%`}>
				<Stack
					gap={10}
					justify="space-between"
					h={`100%`}
					p={10}
					style={{ position: "relative" }}
				>
					{hovered && (
						<Overlay color="#000" backgroundOpacity={0.3} p={10}>
							<Stack justify="center" gap={5} h={`100%`}>
								<Button
									color="blue"
									size="xs"
									leftSection={<IconEye size={20} fontWeight={400} />}
									style={{ fontWeight: 500 }}
									onClick={() => {
										store?.setSingleProduct(product)
										router.push(`/products/${product.id}`)
									}}
								>
									{product?.has_variations ? "VIEW VARIANTS" : "VIEW PRODUCT"}
								</Button>
								{!product?.has_variations && (
									<Button
										size="xs"
										color="red"
										style={{ fontWeight: 500 }}
										leftSection={
											<IconShoppingCart size={20} fontWeight={400} />
										}
									>
										ADD TO CART
									</Button>
								)}
							</Stack>
						</Overlay>
					)}
					<Stack justify="space-between" h={`100%`}>
						<Title order={4} size={14} style={{ fontWeight: 400 }}>
							{_.truncate(product.product_name, { length: 50 })}
						</Title>
						<Group justify="space-between" align="end">
							<Rating value={4.5} fractions={2} readOnly size={14} />
							<Text
								size="xl"
								fz={18}
								fw={500}
								c="red"
								style={{ lineHeight: 1 }}
							>
								{product?.has_variations ? (
									<>
										<NumberFormatter
											prefix="₱"
											value={minVariantPrice}
											thousandSeparator
										/>{" "}
										-{" "}
										<NumberFormatter
											prefix="₱"
											value={maxVariantPrice}
											thousandSeparator
										/>
									</>
								) : (
									<NumberFormatter
										prefix="₱"
										value={product?.prices?.store_price}
										thousandSeparator
									/>
								)}
							</Text>
						</Group>
					</Stack>
				</Stack>
			</Card.Section>
		</Card>
	)
}

export default ProductCard
