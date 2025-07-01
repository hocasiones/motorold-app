import { SiteContext } from "@/Context/context"
import useStore from "@/store/store"
import {
	ActionIcon,
	Box,
	Button,
	Divider,
	Drawer,
	Group,
	Image,
	NumberFormatter,
	Stack,
	Text,
} from "@mantine/core"
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { memo, useContext } from "react"

const CartDrawer = () => {
	const { cartDrawerOpened, closeCartDrawer } =
		useContext(SiteContext).cartDrawer
	const store: any = useStore()
	const router = useRouter()

	return (
		<Drawer
			opened={cartDrawerOpened}
			onClose={closeCartDrawer}
			position="right"
			zIndex={3000}
			styles={{ body: { paddingBottom: 0 }, title: { fontWeight: "bold" } }}
			title="Shopping Cart"
		>
			<Box>
				<Stack gap={10} mb={10}>
					{store?.cartList?.map((item: any, index: number) => (
						<Stack
							key={item?.id + "-" + index}
							style={{ position: "relative" }}
						>
							<Group wrap="nowrap" align="start">
								<Image
									src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${item?.featured_image?.id}`}
									alt={item?.product_name}
									h={100}
									w={100}
								/>
								<Stack align="flex-start" justify="center" gap={5}>
									<Text size="sm" fw={600}>
										{item?.has_variations
											? `(${item?.selectedVariant?.variation_name}) - ${item?.product_name}`
											: item?.product_name}
									</Text>
									<Text size="lg" fw={700} c="red">
										<NumberFormatter
											prefix="₱"
											value={
												item?.has_variations
													? item?.selectedVariant?.prices?.store_price *
													  item?.quantity
													: item?.prices?.store_price * item?.quantity
											}
											thousandSeparator
										/>
									</Text>
									<ActionIcon.Group>
										<ActionIcon
											variant="default"
											size="md"
											radius="md"
											onClick={() => {
												const updatedQuantity =
													item?.quantity > 1 ? item?.quantity - 1 : 1
												store?.setCartListItem(index, {
													...item,
													quantity: updatedQuantity,
												})
											}}
										>
											<IconChevronDown color="var(--mantine-color-red-text)" />
										</ActionIcon>
										<ActionIcon.GroupSection
											variant="default"
											size="md"
											bg="var(--mantine-color-body)"
											miw={60}
										>
											{item?.quantity}
										</ActionIcon.GroupSection>
										<ActionIcon
											variant="default"
											size="md"
											radius="md"
											onClick={() => {
												const updatedQuantity = item?.quantity + 1
												store?.setCartListItem(index, {
													...item,
													quantity: updatedQuantity,
												})
											}}
										>
											<IconChevronUp color="var(--mantine-color-teal-text)" />
										</ActionIcon>
									</ActionIcon.Group>
								</Stack>
							</Group>
							<ActionIcon
								style={{
									position: "absolute",
									right: 0,
									bottom: 10,
									// top: "50%",
									// transform: "translateY(-50%)",
								}}
								color="red"
								onClick={() => {
									store?.removeCartListItem(index)
								}}
							>
								<IconTrash size={20} />
							</ActionIcon>
							{index !== store?.cartList.length - 1 && <Divider />}
						</Stack>
					))}
				</Stack>
			</Box>
			{/* <Divider /> */}
			<Stack
				bg="white"
				mt={20}
				py={10}
				gap={5}
				style={{
					position: "sticky",
					bottom: 0,
					left: 0,
					right: 0,
					borderTop: "1px solid var(--mantine-color-gray-3)",
				}}
			>
				<Group justify="space-between" align="center">
					<Text size="lg">
						Order Items:{" "}
						<Text fw={700} span>
							{store?.cartList?.length ?? 0}
						</Text>
					</Text>
					<Text size="xl">
						Total:{" "}
						<Text c="red" fw={700} span>
							<NumberFormatter
								value={store?.getCartListTotal()}
								prefix="₱"
								thousandSeparator
							/>
						</Text>
					</Text>
				</Group>
				<Button
					radius={0}
					fullWidth
					onClick={() => {
						closeCartDrawer()
						router.push("/checkout")
					}}
				>
					PROCEED TO CHECKOUT
				</Button>
			</Stack>
		</Drawer>
	)
}

export default memo(CartDrawer)
