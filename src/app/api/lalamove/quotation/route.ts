import SDKClient from "@lalamove/lalamove-js"
import LalamoveSDK from "@/lalamove/lalamoveSDK"

export const dynamic = "force-static"

export async function POST(request: Request) {
	const body: any = await request.json()

	const pickup = {
		coordinates: {
			lat: `${process.env.NEXT_PUBLIC_MOTOROLD_LATITUDE}`,
			lng: `${process.env.NEXT_PUBLIC_MOTOROLD_LONGITUDE}`,
		},
		address:
			"4681 DMC Bldg., Old Santolan Rd, Gen. T. de Leon, Valenzuela, 1442 Metro Manila",
	}

	const dropoff = {
		coordinates: {
			lat: `${body?.coordinatesTo.lat}`,
			lng: `${body?.coordinatesTo.lng}`,
		},
		address: body?.address,
	}

	const quotationPayload = SDKClient.QuotationPayloadBuilder.quotationPayload()
		.withLanguage(`${process.env.LALAMOVE_LANGUAGE}`)
		.withServiceType(body?.serviceType)
		.withStops([pickup, dropoff])
		.build()

	const result = await LalamoveSDK.Quotation.create(
		`${process.env.LALAMOVE_MARKET}`,
		quotationPayload
	)
	return Response.json(result)
}
