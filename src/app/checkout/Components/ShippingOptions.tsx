import { CheckoutContext } from "@/Context/context"
import { Button, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import CheckoutWrapper from "./CheckoutWrapper"
import Lalamove from "./lalamove/Lalamove"

const ShippingOptions = () => {
	const { prevStep, nextStep, selectedShipping, setSelectedShipping } =
		useContext(CheckoutContext)
	console.log(selectedShipping)
	return (
		<CheckoutWrapper>
			<Stack gap={20}>
				<Text fz={20} fw={700}>
					Choose Shipping Method
				</Text>
				<Divider mb={5} />
				<SimpleGrid cols={2} spacing="lg">
					<Button
						size="xl"
						color="orange"
						h={150}
						radius="lg"
						variant={!selectedShipping.lalamove ? "outline" : "filled"}
						onClick={() => {
							setSelectedShipping({ lalamove: true })
						}}
					>
						LALAMOVE
					</Button>
				</SimpleGrid>
				{selectedShipping.lalamove && <Lalamove />}
			</Stack>
			<Group justify="space-between" mt={20}>
				<Button variant="light" onClick={prevStep}>
					PREV
				</Button>
				<Button disabled onClick={nextStep}>
					NEXT
				</Button>
			</Group>
		</CheckoutWrapper>
	)
}

export default ShippingOptions
