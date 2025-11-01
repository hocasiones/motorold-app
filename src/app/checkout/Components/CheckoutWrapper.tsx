import { Grid } from "@mantine/core"
import React from "react"
import OrderSummary from "./OrderSummary"

const CheckoutWrapper = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<Grid gutter="lg" mt={20}>
			<Grid.Col span={{ base: 12, md: 8 }} order={{ base: 2, md: 1 }}>
				{children}
			</Grid.Col>
			<Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
				<OrderSummary />
			</Grid.Col>
		</Grid>
	)
}

export default CheckoutWrapper
