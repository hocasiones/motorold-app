import useStore from "@/store/store"
import {
	ActionIcon,
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
import {
	IconChevronDown,
	IconChevronUp,
	IconShoppingBag,
	IconShoppingCart,
} from "@tabler/icons-react"
import Link from "next/link"

const ProductDetails = () => {
	const product = useStore((state: any) => state.singleProduct)
	const [quantity, { increment, decrement }] = useCounter(0, { min: 0 })

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
					<Group grow>
						<Button
							color="orange"
							radius={0}
							leftSection={<IconShoppingBag size={24} />}
						>
							Buy Now
						</Button>
						<Button
							component={Link}
							href={`/products/${product?.id}/cart`}
							color="red"
							radius={0}
							leftSection={<IconShoppingCart size={24} />}
						>
							ADD TO CART
						</Button>
					</Group>
				</Stack>
			</Paper>
		</Stack>
	)
}

export default ProductDetails
