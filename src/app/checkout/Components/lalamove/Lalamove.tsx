import { Paper, Stack } from "@mantine/core"
import {
	AdvancedMarker,
	APIProvider,
	ControlPosition,
	Map,
} from "@vis.gl/react-google-maps"
import { useState } from "react"

import LMapControl from "./LMapControl"
import LMapResult from "./LMapResult"

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string

export type AutocompleteMode = { id: string; label: string }

const Lalamove = () => {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.Place | null>(null)

	const [hasClicked, setHasClicked] = useState(false)
	const [long, setLong] = useState(0)
	const [lat, setLat] = useState(0)

	return (
		<Paper shadow="md" p="lg" radius={10}>
			<Stack>
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
					>
						<LMapControl
							controlPosition={ControlPosition.TOP_LEFT}
							onPlaceSelect={setSelectedPlace}
						/>
						<LMapResult place={selectedPlace} />
						{hasClicked && (
							<AdvancedMarker position={{ lat: lat, lng: long }} />
						)}
					</Map>
				</APIProvider>
			</Stack>
		</Paper>
	)
}

export default Lalamove
