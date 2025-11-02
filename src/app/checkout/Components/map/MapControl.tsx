import { ControlPosition, MapControl } from "@vis.gl/react-google-maps"

import { useAutocompleteSuggestions } from "@/hooks/use-map-autocomplete-suggestion"
import { Box, useMantineTheme } from "@mantine/core"
import { useCallback, useMemo, useState } from "react"
import Combobox from "react-widgets/Combobox"
import "react-widgets/styles.css"

type CustomAutocompleteControlProps = {
	controlPosition: ControlPosition
	onPlaceSelect: (place: google.maps.places.Place | null) => void
}

const LMapControl = ({
	controlPosition,
	onPlaceSelect,
}: CustomAutocompleteControlProps) => {
	const theme = useMantineTheme()
	const [inputValue, setInputValue] = useState<string>("")

	const { suggestions, resetSession, isLoading } =
		useAutocompleteSuggestions(inputValue)

	const handleInputChange = useCallback(
		(value: google.maps.places.PlacePrediction | string) => {
			if (typeof value === "string") {
				setInputValue(value)
			}
		},
		[]
	)

	const handleSelect = useCallback(
		(prediction: google.maps.places.PlacePrediction | string) => {
			if (typeof prediction === "string") return

			const place = prediction.toPlace()
			place
				.fetchFields({
					fields: [
						"viewport",
						"location",
						"svgIconMaskURI",
						"iconBackgroundColor",
					],
				})
				.then(() => {
					resetSession()
					onPlaceSelect(place)
					setInputValue("")
				})
		},
		[onPlaceSelect, resetSession]
	)

	const predictions: any = useMemo(
		() =>
			suggestions
				.filter((suggestion) => suggestion.placePrediction)
				.map(({ placePrediction }) => placePrediction!),
		[suggestions]
	)

	return (
		<MapControl position={controlPosition}>
			<Box mt={5} ml={5}>
				<Combobox
					placeholder="Search Location"
					data={predictions}
					dataKey="placeId"
					textField="text"
					value={inputValue}
					onChange={handleInputChange}
					onSelect={handleSelect}
					busy={isLoading}
					// Since the Autocomplete Service API already returns filtered results
					// always want to display them all.
					filter={() => true}
					focusFirstItem={true}
					hideEmptyPopup
					hideCaret
					style={{
						width: 300,
						fontSize: 16,
						border: `1px solid ${theme.colors.blue}`,
					}}
				/>
			</Box>
		</MapControl>
	)
}

export default LMapControl
