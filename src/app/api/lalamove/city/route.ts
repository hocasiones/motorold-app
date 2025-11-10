import LalamoveSDK from "@/lalamove/lalamoveSDK"

export const dynamic = "force-static"

export async function GET() {
	const result = await LalamoveSDK.City.retrieve(
		`${process.env.LALAMOVE_MARKET}`,
		"PH MNL"
	)
	return Response.json(result)
}
