import { SiteContext } from "@/Context/context"
import useStore from "@/store/store"
import {
	ActionIcon,
	Divider,
	Drawer,
	Group,
	Image,
	NumberFormatter,
	Stack,
	Text,
} from "@mantine/core"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { memo, useContext } from "react"

const CartDrawer = () => {
	const { cartDrawerOpened, closeCartDrawer } =
		useContext(SiteContext).cartDrawer
	const cartList = useStore((state: any) => state.cartList)

	return (
		<Drawer
			opened={cartDrawerOpened}
			onClose={closeCartDrawer}
			position="right"
			zIndex={1001}
		>
			<Stack>
				{cartList?.map((item: any, index: number) => (
					<Stack key={item?.id + "-" + index}>
						<Group wrap="nowrap" align="start">
							<Image
								src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${item?.featured_image?.id}`}
								alt={item?.product_name}
								h={100}
								w={100}
							/>
							<Stack align="flex-start" justify="center" gap={5}>
								<Text size="sm" fw={600}>
									{item?.product_name}
								</Text>
								<Text size="xl" fw={700} c="red">
									<NumberFormatter
										prefix="₱"
										value={item?.prices?.store_price}
										thousandSeparator
									/>
								</Text>
								<ActionIcon.Group>
									<ActionIcon
										variant="default"
										size="md"
										radius="md"
										// onClick={decrement}
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
										// onClick={increment}
									>
										<IconChevronUp color="var(--mantine-color-teal-text)" />
									</ActionIcon>
								</ActionIcon.Group>
							</Stack>
						</Group>
						{index !== cartList.length - 1 && <Divider />}
					</Stack>
				))}
				<Divider />
				<Group justify="end">
					<Text size="xl" fw={700}>
						Total:{" "}
						<Text c="red" fw={700} span>
							<NumberFormatter value={1000} prefix="₱" thousandSeparator />
						</Text>
					</Text>
				</Group>
			</Stack>
		</Drawer>
	)
}

export default memo(CartDrawer)
