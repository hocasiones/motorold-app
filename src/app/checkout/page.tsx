"use client"

import { CheckoutContext } from "@/Context/context"
import { Stepper } from "@mantine/core"
import { useMemo, useState } from "react"
import PaymentOptions from "./Components/PaymentOptions"
import ShippingOptions from "./Components/ShippingOptions"
import CustomerDetails from "./Components/CustomerDetails"
import { useForm } from "@mantine/form"
import z from "zod"
import { zodResolver } from "mantine-form-zod-resolver"

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	mobileNumber: z.coerce
		.number({
			invalid_type_error: "Must only be a number",
		})
		.refine((val) => `${val}`.length === 11, "Must be 11 digit number"),
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
		},
		validate: zodResolver(schema),
		validateInputOnChange: true,
	})

	const ctx = useMemo(() => {
		return {
			step,
			setStep,
			nextStep,
			prevStep,
			form,
		}
	}, [step, setStep, form])

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
