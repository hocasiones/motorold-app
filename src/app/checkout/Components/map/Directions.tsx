import { useContext, useEffect, useState } from "react"

import { CheckoutContext } from "@/context/context"
import { Stack, Text } from "@mantine/core"
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps"

const Directions = () => {
	const { form } = useContext(CheckoutContext)
	const map = useMap()
	const routesLibrary = useMapsLibrary("routes")
	const [directionsService, setDirectionsService] =
		useState<google.maps.DirectionsService>()
	const [directionsRenderer, setDirectionsRenderer] =
		useState<google.maps.DirectionsRenderer>()
	const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
	const [routeIndex] = useState(0)
	const selected = routes[routeIndex]
	const leg = selected?.legs[0]

	// Initialize directions service and renderer
	useEffect(() => {
		if (!routesLibrary || !map) return
		setDirectionsService(new routesLibrary.DirectionsService())
		setDirectionsRenderer(
			new routesLibrary.DirectionsRenderer({
				draggable: true, // Only necessary for draggable markers
				map,
			})
		)
	}, [routesLibrary, map])

	// Add the following useEffect to make markers draggable
	useEffect(() => {
		if (!directionsRenderer) return

		// Add the listener to update routes when directions change
		const listener = directionsRenderer.addListener(
			"directions_changed",
			() => {
				const result = directionsRenderer.getDirections()
				if (result) {
					setRoutes(result.routes)
				}
			}
		)

		return () => google.maps.event.removeListener(listener)
	}, [directionsRenderer])

	// Use directions service
	useEffect(() => {
		if (!directionsService || !directionsRenderer) return

		directionsService
			.route({
				origin: `${process.env.NEXT_PUBLIC_MOTOROLD_LATITUDE},${process.env.NEXT_PUBLIC_MOTOROLD_LONGITUDE}`,
				destination: `${form.getValues().latitude},${
					form.getValues().longitude
				}`,
				travelMode: google.maps.TravelMode.DRIVING,
				provideRouteAlternatives: true,
			})
			.then((response) => {
				directionsRenderer.setDirections(response)
				setRoutes(response.routes)
			})

		return () => directionsRenderer.setMap(null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [directionsService, directionsRenderer])

	// Update direction route
	useEffect(() => {
		if (!directionsRenderer) return
		directionsRenderer.setRouteIndex(routeIndex)
	}, [routeIndex, directionsRenderer])

	if (!leg) return null

	return (
		<Stack gap={5} mt={20} px={10}>
			<Text>
				<strong>Route:</strong> {selected.summary}
			</Text>
			<Text>
				<strong>Pickup:</strong> {leg.start_address}
			</Text>
			<Text>
				<strong>Destination:</strong> {leg.end_address}
			</Text>
			<Text>
				<strong>Distance:</strong> {leg.distance?.text}
			</Text>
			<Text>
				<strong>Estimated Duration:</strong> {leg.duration?.text}
			</Text>

			{/* <Stack gap={5} my={5}>
				<Title order={4}>Other Routes</Title>
				{routes.map((route, index) => (
					<Box key={route.summary}>
						<Button
							onClick={(e) => {
								e.preventDefault()
								setRouteIndex(index)
							}}
						>
							{route.summary}
						</Button>
					</Box>
				))}
			</Stack> */}
		</Stack>
	)
}

export default Directions
