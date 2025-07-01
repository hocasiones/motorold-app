import { Button, Center, Paper, SimpleGrid, Stack } from "@mantine/core"
import React from "react"

const ShippingOptions = () => {
	return (
		<Center>
			<Paper shadow="md" p="lg" w={600} radius={10}>
				<SimpleGrid cols={2} spacing="lg">
					<Button size="xl" color="orange" h={150} radius="lg" variant="filled">
						LALAMOVE
					</Button>
				</SimpleGrid>
			</Paper>
		</Center>
	)
}

export default ShippingOptions
