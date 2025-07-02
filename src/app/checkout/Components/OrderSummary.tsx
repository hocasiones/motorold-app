import { Divider, Paper, Stack, Text } from "@mantine/core"
import React from "react"

const OrderSummary = () => {
	return (
		<Paper shadow="md" p="md" radius={5}>
			<Stack>
				<Text fw={600} fz={16}>
					Order Summary
				</Text>
				<Divider />
			</Stack>
		</Paper>
	)
}

export default OrderSummary
