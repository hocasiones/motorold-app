import { Schema } from "@/types/types"
import { createDirectus, graphql } from "@directus/sdk"

const directus = createDirectus<Schema>(
	`${process.env.NEXT_PUBLIC_SERVER_URL}`
).with(graphql())

export default directus
