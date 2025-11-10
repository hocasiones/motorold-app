import { CheckoutContext } from "@/context/context"
import { Button, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import CheckoutWrapper from "./CheckoutWrapper"
import Lalamove from "./Lalamove"

const ShippingOptions = () => {
	const {
		steps: { prevStep, nextStep },
		form,
	} = useContext(CheckoutContext)

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
						variant={form?.shipping?.name === "lalamove" ? "outline" : "filled"}
						onClick={() => {
							form.setFieldValue("shipping.name", "lalamove")
						}}
					>
						LALAMOVE
					</Button>
				</SimpleGrid>
				{form?.getValues()?.shipping?.name === "lalamove" && <Lalamove />}
			</Stack>
			<Group justify="space-between" mt={20}>
				<Button size="md" onClick={prevStep}>
					BACK
				</Button>
				<Button
					size="md"
					disabled={!form.getValues()?.shipping?.quotation}
					onClick={nextStep}
				>
					NEXT
				</Button>
			</Group>
		</CheckoutWrapper>
	)
}

export default ShippingOptions
