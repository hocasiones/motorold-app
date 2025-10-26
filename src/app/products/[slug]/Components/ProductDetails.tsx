import useStore from "@/store/store"
import { ProductsType } from "@/types/types"
import {
	ActionIcon,
	Avatar,
	Badge,
	Button,
	Group,
	NumberFormatter,
	Paper,
	Rating,
	Stack,
	Text,
	Title,
} from "@mantine/core"
import { useCounter } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import {
	IconChevronDown,
	IconChevronUp,
	IconShoppingCart,
} from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

const ProductDetails = () => {
	const store: any = useStore()
	const product = useStore((state: any) => state.singleProduct)
	const [quantity, { increment, decrement }] = useCounter(0, { min: 0 })
	const [selectedVariant, setSelectedVariant] = useState<any>({})

	return (
		<Stack>
			<Rating value={4.5} fractions={2} readOnly />
			<Group>
				{product?.categories?.map((category: any) => (
					<Badge
						color="cyan"
						key={category?.product_categories_id?.id}
						component={Link}
						href={`/products/category/${category?.product_categories_id?.id}`}
						style={{ cursor: "pointer" }}
					>
						{category?.product_categories_id?.category_name}
					</Badge>
				))}
			</Group>
			<Title order={1} size={30}>
				{product?.product_name}
			</Title>
			<Text fz={36} fw={600} c="red">
				{product?.prices && (
					<NumberFormatter
						prefix="₱"
						value={product?.prices?.store_price}
						thousandSeparator
					/>
				)}
			</Text>
			<Paper shadow="xs" p="md" radius={5}>
				<Stack>
					{selectedVariant?.variation_name && (
						<Text fz="md">
							Variant: <strong>{selectedVariant?.variation_name}</strong>
						</Text>
					)}
					{product?.has_variations && (
						<Group wrap="wrap" gap={10}>
							{product?.variations?.map((variant: any) => (
								<ActionIcon
									key={variant?.product_variations_id?.id}
									size={50}
									color={
										selectedVariant?.id === variant?.product_variations_id?.id
											? "red"
											: "transparent"
									}
									variant="filled"
									onClick={() => {
										setSelectedVariant(variant?.product_variations_id)
									}}
								>
									<Avatar
										src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${variant?.product_variations_id?.image?.id}`}
										radius="sm"
										size={47}
									/>
								</ActionIcon>
							))}
						</Group>
					)}
					<ActionIcon.Group>
						<ActionIcon
							variant="default"
							size="xl"
							radius="md"
							onClick={decrement}
						>
							<IconChevronDown color="var(--mantine-color-red-text)" />
						</ActionIcon>
						<ActionIcon.GroupSection
							variant="default"
							size="xl"
							bg="var(--mantine-color-body)"
							miw={80}
						>
							{quantity}
						</ActionIcon.GroupSection>
						<ActionIcon
							variant="default"
							size="xl"
							radius="md"
							onClick={increment}
						>
							<IconChevronUp color="var(--mantine-color-teal-text)" />
						</ActionIcon>
					</ActionIcon.Group>
					<Button
						color="red"
						radius={0}
						leftSection={<IconShoppingCart size={24} />}
						disabled={
							quantity <= 0 || (!product?.has_variations && !selectedVariant)
						}
						onClick={() => {
							if (!product?.has_variations) {
								const targetIndex = store?.cartList?.findIndex(
									(item: ProductsType) => item.id === product.id
								)
								if (targetIndex > -1) {
									// If the product is already in the cart, update the quantity
									store?.setCartListItem(targetIndex, {
										...store?.cartList[targetIndex],
										quantity: store?.cartList[targetIndex].quantity + quantity,
										selectedVariant: selectedVariant,
									})
								} else {
									// If the product is not in the cart, add it with the current quantity
									store?.setAppendCartList({
										...product,
										quantity: quantity,
										selectedVariant: selectedVariant,
									})
								}
							} else {
								// If the product has variations, add the selected variant to the cart
								const targetIndex = store?.cartList?.findIndex(
									(item: ProductsType) =>
										item.id === product.id &&
										item.selectedVariant?.id === selectedVariant?.id
								)
								if (targetIndex > -1) {
									// If the variant is already in the cart, update the quantity
									store?.setCartListItem(targetIndex, {
										...store?.cartList[targetIndex],
										quantity: store?.cartList[targetIndex].quantity + quantity,
									})
								} else {
									// If the variant is not in the cart, add it with the current quantity
									store?.setAppendCartList({
										...product,
										selectedVariant: selectedVariant,
										quantity: quantity,
									})
								}
							}
							notifications.show({
								title: "Product Added to Cart",
								message: `${product.product_name} has been added to your cart.`,
								color: "green",
								icon: <IconShoppingCart size={16} />,
							})
						}}
					>
						ADD TO CART
					</Button>
				</Stack>
			</Paper>
		</Stack>
	)
}

export default ProductDetails
