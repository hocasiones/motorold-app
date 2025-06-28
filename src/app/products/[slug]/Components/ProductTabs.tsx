import useStore from "@/store/store"
import { Paper, Tabs, Text } from "@mantine/core"
import {
	IconFileDescription,
	IconList,
	IconPencilStar,
} from "@tabler/icons-react"
import parse from "html-react-parser"

const ProductTabs = () => {
	const product = useStore((state: any) => state.singleProduct)
	const description = parse(
		product?.description || "<p>No description available.</p>"
	)

	return (
		<Paper shadow="xs" p="md" radius={5}>
			<Tabs variant="outline" defaultValue="description">
				<Tabs.List grow>
					<Tabs.Tab
						value="description"
						leftSection={<IconFileDescription size={24} />}
					>
						<Text fz={18} fw={700}>
							Description
						</Text>
					</Tabs.Tab>
					<Tabs.Tab value="specifications" leftSection={<IconList size={24} />}>
						<Text fz={18} fw={700}>
							Specifications
						</Text>
					</Tabs.Tab>
					<Tabs.Tab value="reviews" leftSection={<IconPencilStar size={24} />}>
						<Text fz={18} fw={700}>
							Reviews
						</Text>
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="description" p="md">
					{description}
				</Tabs.Panel>

				<Tabs.Panel value="specifications" p="md">
					Specifications tab content
				</Tabs.Panel>

				<Tabs.Panel value="reviews" p="md">
					Settings tab content
				</Tabs.Panel>
			</Tabs>
		</Paper>
	)
}

export default ProductTabs
