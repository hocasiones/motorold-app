import { Schema } from "@/Types/types"
import { createDirectus, graphql } from "@directus/sdk"

const directus = createDirectus<Schema>(
	`${process.env.NEXT_PUBLIC_API_URL}`
).with(graphql())

export default directus
