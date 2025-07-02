import { Button, Center, Paper, SimpleGrid, Stack } from "@mantine/core"

const ShippingOptions = () => {
	return (
		<Center>
			<Stack>
				<SimpleGrid cols={2} spacing="lg">
					<Button
						size="xl"
						color="orange"
						h={150}
						radius="lg"
						variant="outline"
					>
						LALAMOVE
					</Button>
				</SimpleGrid>
				<Paper shadow="md" p="lg" w={800} radius={10}></Paper>
			</Stack>
		</Center>
	)
}

export default ShippingOptions
