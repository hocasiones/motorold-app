"use client"

import { CheckoutContext } from "@/Context/context"
import { Stepper } from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import PaymentOptions from "./Components/PaymentOptions"
import ShippingOptions from "./Components/ShippingOptions"
import CustomerDetails from "./Components/CustomerDetails"
import { useForm } from "@mantine/form"
import z from "zod"
import { zodResolver } from "mantine-form-zod-resolver"
import { useGeolocated } from "react-geolocated"

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	mobileNumber: z.coerce
		.number({
			invalid_type_error: "Must only be a number",
		})
		.refine((val) => `${val}`.length === 10, "Must be 11 digit number"),
	email: z.string().email(),
})

const Page = () => {
	const [step, setStep] = useState(0)
	const nextStep = () =>
		setStep((current) => (current < 3 ? current + 1 : current))
	const prevStep = () =>
		setStep((current) => (current > 0 ? current - 1 : current))

	const form = useForm({
		initialValues: {
			firstName: "",
			lastName: "",
			mobileNumber: "",
			email: "",
			address: "",
		},
		validate: zodResolver(schema),
		validateInputOnChange: true,
	})

	const [selectedShipping, setSelectedShipping] = useState({ lalamove: false })

	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGeolocated({
			positionOptions: {
				enableHighAccuracy: false,
			},
			userDecisionTimeout: 5000,
		})

	const [addressMapZoom, setAddressMapZoom] = useState(17)
	const [hasClickedAddressMap, setHasClickedAddressMap] = useState(false)
	const [addressLong, setAddressLong] = useState(0)
	const [addressLat, setAddressLat] = useState(0)

	console.log("Coordinates", coords)
	console.log("Address", addressLat, addressLong)

	useEffect(() => {
		if (
			isGeolocationAvailable &&
			isGeolocationEnabled &&
			!hasClickedAddressMap
		) {
			setAddressLat(coords?.latitude ?? 0)
			setAddressLong(coords?.longitude ?? 0)
		}
	}, [
		setAddressLat,
		setAddressLong,
		isGeolocationAvailable,
		isGeolocationEnabled,
		hasClickedAddressMap,
		coords,
	])

	const ctx = useMemo(() => {
		return {
			steps: { step, setStep, nextStep, prevStep },
			form,
			hasClickedAddressMap,
			setHasClickedAddressMap,
			selectedShipping,
			setSelectedShipping,
			address: {
				addressLong,
				addressLat,
				setAddressLat,
				setAddressLong,
				addressMapZoom,
				setAddressMapZoom,
			},
			geo: {
				coords,
				isGeolocationAvailable,
				isGeolocationEnabled,
			},
		}
	}, [
		step,
		setStep,
		form,
		hasClickedAddressMap,
		setHasClickedAddressMap,
		selectedShipping,
		setSelectedShipping,
		addressLong,
		addressLat,
		setAddressLat,
		setAddressLong,
		coords,
		isGeolocationAvailable,
		isGeolocationEnabled,
	])

	return (
		<CheckoutContext.Provider value={ctx}>
			<form>
				<Stepper
					active={step}
					onStepClick={setStep}
					allowNextStepsSelect={false}
					iconSize={50}
					mt={30}
					color="green"
					styles={{ separator: { borderTop: "1px solid #CCC" } }}
				>
					<Stepper.Step label="Shipping" description="Choose shipping method">
						<CustomerDetails />
					</Stepper.Step>
					<Stepper.Step label="Customer Info" description="Enter your details">
						<ShippingOptions />
					</Stepper.Step>
					<Stepper.Step label="Payment" description="Choose payment method">
						<PaymentOptions />
					</Stepper.Step>
					<Stepper.Completed>
						Completed, click back button to get to previous step
					</Stepper.Completed>
				</Stepper>
			</form>
		</CheckoutContext.Provider>
	)
}

export default Page
