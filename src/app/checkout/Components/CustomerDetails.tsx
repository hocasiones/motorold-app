import { CheckoutContext } from "@/Context/context"
import {
	Button,
	Divider,
	Group,
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

import {
	AdvancedMarker,
	APIProvider,
	ControlPosition,
	Map,
} from "@vis.gl/react-google-maps"
import MapControl from "./map/MapControl"
import MapResult from "./map/MapResult"

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string

export type AutocompleteMode = { id: string; label: string }

const CustomerDetails = () => {
	const {
		steps: { nextStep },
		form,
		hasClickedAddressMap,
		setHasClickedAddressMap,
		address: {
			addressLong,
			addressLat,
			setAddressLat,
			setAddressLong,
			addressMapZoom,
		},
		geo: { isGeolocationEnabled },
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
							defaultCenter={{ lat: addressLat, lng: addressLong }}
							defaultZoom={addressMapZoom}
							gestureHandling={"greedy"}
							disableDefaultUI={true}
							onClick={(e: any) => {
								console.log("Detail", e)
								setAddressLong(e?.detail?.latLng.lng)
								setAddressLat(e?.detail?.latLng.lat)
								setHasClickedAddressMap(true)
							}}
						>
							<MapControl
								controlPosition={ControlPosition.TOP_LEFT}
								onPlaceSelect={setSelectedPlace}
							/>
							<MapResult place={selectedPlace} />
							{(isGeolocationEnabled || hasClickedAddressMap) && (
								<AdvancedMarker
									position={{ lat: addressLat, lng: addressLong }}
								/>
							)}
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
						addressLong === 0 ||
						addressLat === 0
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
