import { Paper, Select, Stack } from "@mantine/core"
import {
	AdvancedMarker,
	APIProvider,
	ControlPosition,
	Map,
} from "@vis.gl/react-google-maps"
import { memo, useContext, useState } from "react"

import MapControl from "./map/MapControl"
import MapResult from "./map/MapResult"
import { useMediaQuery } from "@mantine/hooks"
import { useMutation, useQuery } from "@tanstack/react-query"
import ky from "ky"
import { IconCar } from "@tabler/icons-react"
import { CheckoutContext } from "@/context/context"
import Directions from "./map/Directions"

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string

export type AutocompleteMode = { id: string; label: string }

const Lalamove = () => {
	const isMobile = useMediaQuery("(max-width: 767px)")
	const { form } = useContext(CheckoutContext)
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.Place | null>(null)
	const [hasClicked, setHasClicked] = useState(false)
	const [long, setLong] = useState(0)
	const [lat, setLat] = useState(0)

	const queryCity: any = useQuery({
		queryKey: ["city"],
		queryFn: async () => {
			const result = await ky(`/api/lalamove/city`).json()
			return result
		},
	})

	const mutationQuotation = useMutation({
		mutationFn: async () => {
			const result = await ky
				.post(`/api/lalamove/quotation`, {
					json: {
						address: form.getValues().address,
						coordinatesTo: {
							lat: form.getValues().latitude,
							lng: form.getValues().longitude,
						},
						serviceType: form.getValues()?.shipping?.vehicle.key,
					},
				})
				.json()
			console.log(result)
			return result
		},
		onSuccess: async (data: any) => {
			console.log(data)
			form.setFieldValue("shipping.quotation", data)
		},
		onError: async (error: any) => {
			console.log(error)
		},
	})

	// console.log(mutationQuotation?.data)
	// console.log("Form", form.getValues())
	// console.log(
	// 	"test",
	// 	queryCity?.data?.services?.map((item) => item.key)
	// )
	return (
		<Stack>
			<Paper shadow="md" p={isMobile ? "xs" : "md"} radius={10}>
				<APIProvider apiKey={API_KEY}>
					<Map
						mapId={"49ae42fed52588c3"}
						style={{ width: "100%", height: 450 }}
						defaultCenter={{ lat: 22.54992, lng: 0 }}
						defaultZoom={3}
						gestureHandling={"greedy"}
						disableDefaultUI={true}
						onClick={(e: any) => {
							setLong(e?.detail?.latLng.lng)
							setLat(e?.detail?.latLng.lat)
							setHasClicked(true)
						}}
					></Map>
					<Directions />
				</APIProvider>
			</Paper>
			<Paper shadow="md" p={isMobile ? "xs" : "md"} radius={10}>
				<Select
					data={queryCity?.data?.services?.map((item: any) => item.key) || []}
					defaultValue={form.getValues()?.shipping?.vehicle?.key}
					value={form.getValues()?.shipping?.vehicle?.key || null}
					onChange={(_value, option) => {
						// console.log(option, "option")
						if (option) {
							const selectedVehicle = queryCity?.data?.services?.find(
								(item: any) => item.key === option.value
							)
							form.setFieldValue("shipping.vehicle", selectedVehicle)
							setTimeout(() => {
								mutationQuotation.mutate()
							}, 100)
						}
					}}
					description={form.getValues()?.shipping?.vehicle?.description}
					size="md"
					leftSectionPointerEvents="none"
					leftSection={<IconCar size={20} />}
					label="Select Vehicle Type"
					disabled={!queryCity?.data}
				/>
			</Paper>
		</Stack>
	)
}

export default memo(Lalamove)
