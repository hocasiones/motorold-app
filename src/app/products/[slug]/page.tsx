"use client"

import { Grid } from "@mantine/core"
import ProductCarousel from "./Components/ProductCarousel"
import ProductDetails from "./Components/ProductDetails"
import ProductTabs from "./Components/ProductTabs"

const Page = () => {
	return (
		<Grid gutter="xl">
			<Grid.Col span={{ base: 12, md: 6 }}>
				<ProductCarousel />
			</Grid.Col>
			<Grid.Col span={{ base: 12, md: 6 }}>
				<ProductDetails />
			</Grid.Col>
			<Grid.Col span={12}>
				<ProductTabs />
			</Grid.Col>
		</Grid>
	)
}

export default Page
