import { CheckoutContext } from "@/context/context"
import {
	Button,
	Divider,
	Group,
	NumberInput,
	Paper,
	Space,
	Stack,
	Text,
	Textarea,
	TextInput,
} from "@mantine/core"
import { IconDeviceMobile, IconMail } from "@tabler/icons-react"
import { useContext, useState } from "react"
import CheckoutWrapper from "./CheckoutWrapper"

import useStore from "@/store/store"
import {
	AdvancedMarker,
	APIProvider,
	ControlPosition,
	Map,
} from "@vis.gl/react-google-maps"
import MapControl from "./map/MapControl"
import MapResult from "./map/MapResult"
import { type } from "../../../store/store"

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string

export type AutocompleteMode = { id: string; label: string }

const CustomerDetails = () => {
	const store: any = useStore()
	const {
		steps: { nextStep },
		form,
		address: { addressMapZoom },
	} = useContext(CheckoutContext)
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.Place | null>(null)

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
						maxLength={11}
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
					<Divider />
					<Textarea
						label="Address"
						description="Enter your complete address"
						required
						{...form.getInputProps("address")}
					/>
					<Divider
						label="Click to pin your exact location on map for accuracy"
						labelPosition="left"
					/>
					<APIProvider apiKey={API_KEY}>
						<Map
							mapId={"49ae42fed52588c3"}
							style={{ width: "100%", height: 450 }}
							defaultCenter={{
								lat: form.getValues().latitude || 0,
								lng: form.getValues().longitude || 0,
							}}
							defaultZoom={addressMapZoom}
							gestureHandling={"greedy"}
							disableDefaultUI={true}
							onClick={(e: any) => {
								console.log("Detail", e)
								form.setFieldValue("longitude", e?.detail?.latLng.lng)
								form.setFieldValue("latitude", e?.detail?.latLng.lat)
							}}
						>
							<MapControl
								controlPosition={ControlPosition.TOP_LEFT}
								onPlaceSelect={setSelectedPlace}
							/>
							<MapResult place={selectedPlace} />
							<AdvancedMarker
								position={{
									lat:
										form.getValues().latitude ||
										store?.checkoutData?.form.latitude ||
										0,
									lng:
										form.getValues().longitude ||
										store?.checkoutData?.form.longitude ||
										0,
								}}
							/>
						</Map>
					</APIProvider>
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
						form.getValues().address.length === 0 ||
						form.getValues().longitude === 0 ||
						form.getValues().latitude === 0
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
