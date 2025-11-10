import SDKClient from "@lalamove/lalamove-js"

const env = process.env.NODE_ENV

const LalamoveSDK = new SDKClient.ClientModule(
	new SDKClient.Config(
		`${process.env.LALAMOVE_API_KEY}`,
		`${process.env.LALAMOVE_API_SECRET}`,
		env == "production" ? "production" : "sandbox"
	)
)

export default LalamoveSDK
