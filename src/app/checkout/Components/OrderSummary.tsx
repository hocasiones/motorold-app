import { CheckoutContext } from "@/context/context"
import useStore from "@/store/store"
import {
	Image,
	Divider,
	Group,
	NumberFormatter,
	Paper,
	Stack,
	Text,
	Space,
} from "@mantine/core"
import { useContext, useEffect, useState } from "react"
import _ from "lodash"

const OrderSummary = () => {
	const store: any = useStore()
	const { form } = useContext(CheckoutContext)
	const [total, setTotal] = useState(0)

	const values = form?.getValues()
	const shippingPrices = values?.shipping?.quotation?.priceBreakdown

	useEffect(() => {
		setTotal(store?.getCartListSubTotal())
	}, [store])

	return (
		<Paper
			shadow="md"
			p="md"
			radius={5}
			style={{ position: "sticky", top: 20 }}
		>
			<Stack>
				<Text fw={600} fz={18}>
					Order Summary
				</Text>
				<Divider mt={-10} />
				<Stack gap={10}>
					{store?.cartList?.map((item: any, index: number) => (
						<Stack
							key={item?.id + "-" + index}
							style={{ position: "relative" }}
							gap={10}
						>
							<Group wrap="nowrap" align="start">
								<Image
									src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${item?.featured_image?.id}?width=160&height=160`}
									alt={item?.product_name}
									h={60}
									w={60}
								/>
								<Stack align="flex-start" justify="center" gap={5}>
									<Text size="sm" fw={600}>
										{item?.has_variations
											? `(${item?.selectedVariant?.variation_name}) - ${item?.product_name}`
											: item?.product_name}
									</Text>
									<Text size="md" fw={700} c="red">
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
								</Stack>
							</Group>
							{index !== store?.cartList.length - 1 && <Divider />}
						</Stack>
					))}
				</Stack>
				<Divider />
				<Group justify="space-between" align="center">
					<Text size="sm">
						Order Items:{" "}
						<Text fw={700} fz={14} span>
							{store?.cartList?.length ?? 0}
						</Text>
					</Text>
					<Text size="md">
						Sub Total:{" "}
						<Text c="red" fw={700} span>
							<NumberFormatter value={total} prefix="₱" thousandSeparator />
						</Text>
					</Text>
				</Group>
				{values?.shipping?.quotation && (
					<>
						<Space />
						<Text fw={600} fz={18}>
							Shipping Details
						</Text>
						<Divider mt={-10} />
						<Text>
							<strong>Courier:</strong> {_.upperFirst(values?.shipping?.name)}
						</Text>
						<Stack gap={2}>
							<Group justify="space-between" align="center">
								<Text size="sm">Base Fee</Text>
								<Text size="md">
									<Text span>
										<NumberFormatter
											value={shippingPrices?.base}
											prefix="₱"
											thousandSeparator
										/>
									</Text>
								</Text>
							</Group>
							<Group justify="space-between" align="center">
								<Text size="sm">Admin Fee</Text>
								<Text size="md">
									<Text span>
										<NumberFormatter
											value={shippingPrices?.adminFee}
											prefix="₱"
											thousandSeparator
										/>
									</Text>
								</Text>
							</Group>
							<Group justify="space-between" align="center">
								<Text size="sm">Extra Mileage</Text>
								<Text size="md">
									<Text span>
										<NumberFormatter
											value={shippingPrices?.extraMileage}
											prefix="₱"
											thousandSeparator
										/>
									</Text>
								</Text>
							</Group>
						</Stack>
						<Divider my={-10} />
						<Group justify="space-between" align="center">
							<Text size="sm">Total Shipping Fee</Text>
							<Text size="md">
								<Text span>
									<NumberFormatter
										value={shippingPrices?.total}
										prefix="₱"
										thousandSeparator
									/>
								</Text>
							</Text>
						</Group>
					</>
				)}
			</Stack>
		</Paper>
	)
}

export default OrderSummary
