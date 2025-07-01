import {
	ActionIcon,
	Center,
	Indicator,
	Paper,
	SimpleGrid,
	Text,
} from "@mantine/core"
import {
	IconBrandPaypal,
	IconCreditCard,
	IconDeviceMobile,
} from "@tabler/icons-react"

const PaymentOptions = () => {
	return (
		<Center>
			<Paper shadow="md" p="lg" w={600} radius={10}>
				<SimpleGrid cols={2} spacing="lg">
					<Indicator
						position="bottom-center"
						size={20}
						color="red"
						label={
							<Text size="md" fw={600} p={10}>
								Credit Cart
							</Text>
						}
					>
						<ActionIcon size={`100%`} radius="lg" variant="outline" color="red">
							<IconCreditCard size={`80%`} />
						</ActionIcon>
					</Indicator>
					<Indicator
						position="bottom-center"
						size={20}
						color="cyan"
						label={
							<Text size="md" fw={600} p={10}>
								GCash
							</Text>
						}
					>
						<ActionIcon
							size={`100%`}
							radius="lg"
							variant="outline"
							color="cyan"
						>
							<IconDeviceMobile size={`80%`} />
						</ActionIcon>
					</Indicator>
					<Indicator
						position="bottom-center"
						size={20}
						label={
							<Text size="md" fw={600} p={10}>
								PayPal
							</Text>
						}
					>
						<ActionIcon size={`100%`} radius="lg" variant="outline">
							<IconBrandPaypal size={`80%`} />
						</ActionIcon>
					</Indicator>
				</SimpleGrid>
			</Paper>
		</Center>
	)
}

export default PaymentOptions
