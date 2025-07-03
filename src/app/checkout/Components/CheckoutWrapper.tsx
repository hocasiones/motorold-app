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
			<Grid.Col span={8}>{children}</Grid.Col>
			<Grid.Col span={4}>
				<OrderSummary />
			</Grid.Col>
		</Grid>
	)
}

export default CheckoutWrapper
