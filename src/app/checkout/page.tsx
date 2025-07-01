"use client"

import { CheckoutContext } from "@/Context/context"
import PaymentOptions from "./Components/PaymentOptions"
import { useMemo, useState } from "react"
import { Stepper } from "@mantine/core"
import ShippingOptions from "./Components/ShippingOptions"

const Page = () => {
	const [step, setStep] = useState(0)
	const nextStep = () =>
		setStep((current) => (current < 3 ? current + 1 : current))
	const prevStep = () =>
		setStep((current) => (current > 0 ? current - 1 : current))

	const ctx = useMemo(() => {
		return {
			step,
			setStep,
			nextStep,
			prevStep,
		}
	}, [step, setStep])

	return (
		<CheckoutContext.Provider value={ctx}>
			<Stepper
				active={step}
				onStepClick={setStep}
				allowNextStepsSelect={false}
				iconSize={50}
				mt={30}
				color="green"
				styles={{ separator: { borderTop: "1px solid #CCC" } }}
			>
				<Stepper.Step label="Shipping" description="Choose Shipping method">
					<ShippingOptions />
				</Stepper.Step>
				<Stepper.Step label="Payment" description="Choose payment method">
					<PaymentOptions />
				</Stepper.Step>
				<Stepper.Step label="Customer Info" description="Enter your details">
					Step 3 content: Get full access
				</Stepper.Step>
				<Stepper.Completed>
					Completed, click back button to get to previous step
				</Stepper.Completed>
			</Stepper>
		</CheckoutContext.Provider>
	)
}

export default Page
