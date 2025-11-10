"use client"

import { CheckoutContext } from "@/context/context"
import useStore from "@/store/store"
import { Stepper } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMounted } from "@mantine/hooks"
import { zodResolver } from "mantine-form-zod-resolver"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useGeolocated } from "react-geolocated"
import z from "zod"
import CustomerDetails from "./Components/CustomerDetails"
import PaymentOptions from "./Components/PaymentOptions"
import ShippingOptions from "./Components/ShippingOptions"

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	mobileNumber: z.coerce.number({
		invalid_type_error: "Must only be a number",
	}),
	email: z.string().email(),
	longitude: z.number(),
	latitude: z.number(),
	shipping: z.object({
		name: z.string(),
	}),
})

const Page = () => {
	const store: any = useStore()
	const router = useRouter()
	const mounted = useMounted()
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
			longitude: 0,
			latitude: 0,
			shipping: {
				name: "",
			},
		},
		validate: zodResolver(schema),
		validateInputOnChange: true,
	})

	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGeolocated({
			positionOptions: {
				enableHighAccuracy: false,
			},
			userDecisionTimeout: 5000,
		})

	const [addressMapZoom, setAddressMapZoom] = useState(17)

	console.dir("Form", form?.getValues())
	// console.log(isGeolocationAvailable, isGeolocationEnabled)
	// console.log("Coordinates", coords)
	// console.log("Address", form.getValues().latitude, form.getValues().longitude)

	//redirect if no cart items
	useEffect(() => {
		if (mounted && store?.cartList.length <= 0) {
			router.push("/")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mounted])

	//persist data
	useEffect(() => {
		window.addEventListener("beforeunload", () => {
			store?.setCheckoutData({
				form: form?.getValues(),
				step: step || 0,
			})
		})
	}, [form, step, store])

	//on mount set form values
	useEffect(() => {
		// store?.setCheckoutData(null)
		if (mounted) {
			form.setValues(store?.checkoutData?.form)
			setStep(store?.checkoutData?.step || 0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mounted])

	useEffect(() => {
		if (coords && isGeolocationAvailable && isGeolocationEnabled && mounted) {
			form.setFieldValue("latitude", coords?.latitude || 0)
			form.setFieldValue("longitude", coords?.longitude || 0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGeolocationAvailable, isGeolocationEnabled, coords, mounted])

	const ctx = useMemo(() => {
		return {
			steps: { step, setStep, nextStep, prevStep },
			form,
			address: {
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
		form,
		addressMapZoom,
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
					<Stepper.Step label="Customer Info" description="Enter your details">
						<CustomerDetails />
					</Stepper.Step>
					<Stepper.Step label="Shipping" description="Choose shipping method">
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
