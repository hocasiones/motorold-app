import { CheckoutContext } from "@/Context/context"
import {
	Button,
	Divider,
	Group,
	Paper,
	Space,
	Stack,
	Text,
	TextInput,
} from "@mantine/core"
import { IconDeviceMobile, IconMail } from "@tabler/icons-react"
import { useContext } from "react"
import CheckoutWrapper from "./CheckoutWrapper"

const CustomerDetails = () => {
	const { nextStep, form } = useContext(CheckoutContext)

	return (
		<CheckoutWrapper>
			<Paper shadow="md" p="lg" radius={5}>
				<Stack>
					<Text fz={20} fw={700}>
						Customer Details
					</Text>
					<Divider />
					<Group grow>
						<TextInput
							label="First Name"
							size="md"
							required
							{...form.getInputProps("firstName")}
						/>
						<TextInput
							label="Last Name"
							size="md"
							required
							{...form.getInputProps("lastName")}
						/>
					</Group>
					<TextInput
						label="Mobile Number"
						placeholder="eg. 09461234567"
						size="md"
						required
						leftSection={<IconDeviceMobile size={16} />}
						{...form.getInputProps("mobileNumber")}
					/>
					<TextInput
						label="Email"
						placeholder="example@gmail.com"
						size="md"
						leftSection={<IconMail size={16} />}
						{...form.getInputProps("email")}
					/>
				</Stack>
			</Paper>
			<Group justify="space-between" mt={20}>
				<Space />
				<Button
					disabled={
						!form.isDirty() ||
						Object.keys(form.errors).length > 0 ||
						form.getValues().firstName.length === 0 ||
						form.getValues().lastName.length === 0 ||
						form.getValues().mobileNumber.length === 0 ||
						form.getValues().email.length === 0
					}
					onClick={nextStep}
				>
					NEXT
				</Button>
			</Group>
		</CheckoutWrapper>
	)
}

export default CustomerDetails
