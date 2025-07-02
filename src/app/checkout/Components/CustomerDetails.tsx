import {
	Divider,
	Grid,
	Group,
	Paper,
	Stack,
	Text,
	TextInput,
} from "@mantine/core"
import { IconDeviceMobile, IconMail, IconSearch } from "@tabler/icons-react"
import OrderSummary from "./OrderSummary"

const CustomerDetails = () => {
	return (
		<Grid gutter="lg" mt={20}>
			<Grid.Col span={8}>
				<Paper shadow="md" p="lg" radius={5}>
					<Stack>
						<Text fz={20} fw={700}>
							Customer Details
						</Text>
						<Divider />
						<Group grow>
							<TextInput label="First Name" size="md" required />
							<TextInput label="Last Name" size="md" required />
						</Group>
						<TextInput
							label="Mobile Number"
							placeholder="eg. 09461234567"
							size="md"
							required
							leftSection={<IconDeviceMobile />}
						/>
						<TextInput
							label="Email"
							placeholder="example@gmail.com"
							size="md"
							leftSection={<IconMail />}
						/>
						<TextInput
							label="Address"
							placeholder="Search"
							size="md"
							leftSection={<IconSearch />}
						/>
					</Stack>
				</Paper>
			</Grid.Col>
			<Grid.Col span={4}>
				<OrderSummary />
			</Grid.Col>
		</Grid>
	)
}

export default CustomerDetails
