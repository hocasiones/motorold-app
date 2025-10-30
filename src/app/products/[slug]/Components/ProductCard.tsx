import { SiteContext } from "@/context/context"
import useStore from "@/store/store"
import { ProductsType } from "@/types/types"
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
	useMantineTheme,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconEye, IconShoppingCart } from "@tabler/icons-react"
import _ from "lodash"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const initialMinValue = 99999999999

const ProductCard = ({ product }: any) => {
	const theme = useMantineTheme()
	const store: any = useStore()
	const { hovered, ref } = useHover()
	const router = useRouter()
	const [minVariantPrice, setMinVariantPrice] = useState<number>(0)
	const [maxVariantPrice, setMaxVariantPrice] = useState<number>(0)
	const { openCartDrawer } = useContext(SiteContext).cartDrawer

	// console.log(minVariantPrice, maxVariantPrice)
	// console.log(product)

	useEffect(() => {
		if (product?.has_variations) {
			const min = product?.variations?.reduce((acc: any, curr: any) => {
				const currStorePrice = curr?.product_variations_id?.prices?.store_price
				return currStorePrice < acc ? currStorePrice : acc
			}, initialMinValue)
			setMinVariantPrice(min || 0)
			const max = product?.variations?.reduce((acc: any, curr: any) => {
				const currStorePrice = curr?.product_variations_id?.prices?.store_price
				return currStorePrice > acc ? currStorePrice : acc
			}, 0)
			setMaxVariantPrice(max || 0)
		}
	}, [product?.has_variations, product?.variations])

	const Price = () => {
		if (product?.has_variations && minVariantPrice !== maxVariantPrice) {
			return (
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
			)
		} else if (product?.has_variations && minVariantPrice === maxVariantPrice) {
			return (
				<NumberFormatter prefix="₱" value={minVariantPrice} thousandSeparator />
			)
		} else {
			return (
				<NumberFormatter
					prefix="₱"
					value={product?.prices?.store_price}
					thousandSeparator
				/>
			)
		}
	}

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
										onClick={() => {
											const targetIndex = store?.cartList?.findIndex(
												(item: ProductsType) => item.id === product.id
											)
											if (targetIndex > -1) {
												// If the product is already in the cart, update the quantity
												store?.setCartListItem(targetIndex, {
													...store?.cartList[targetIndex],
													quantity: store?.cartList[targetIndex].quantity + 1,
													selectedVariant: product,
												})
											} else {
												// If the product is not in the cart, add it with the current quantity
												store?.setAppendCartList({
													...product,
													quantity: 1,
													selectedVariant: product,
												})
											}
											notifications.show({
												title: "Product Added to Cart",
												message: `${product.product_name} has been added to your cart.`,
												color: "green",
												icon: <IconShoppingCart size={16} />,
											})
											openCartDrawer()
										}}
									>
										ADD TO CART
									</Button>
								)}
							</Stack>
						</Overlay>
					)}
					<Stack justify="space-between" h={`100%`}>
						<Stack gap={3}>
							<Rating value={4.5} fractions={2} readOnly size={12} mb={3} />
							<Title order={4} size={14} style={{ fontWeight: 400 }}>
								{_.truncate(product.product_name, { length: 50 })}
							</Title>
							<Text size="xs" c={theme.colors.gray[6]}>
								{
									product?.product_categories[0]?.product_categories_id
										?.category_name
								}
							</Text>
						</Stack>
						<Group justify="end" align="end">
							<Text
								size="xl"
								fz={18}
								fw={500}
								c="red"
								style={{ lineHeight: 1 }}
							>
								<Price />
							</Text>
						</Group>
					</Stack>
				</Stack>
			</Card.Section>
		</Card>
	)
}

export default ProductCard
