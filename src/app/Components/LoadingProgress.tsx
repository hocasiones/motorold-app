"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { nprogress, NavigationProgress } from "@mantine/nprogress"

export function LoadingProgress() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		nprogress.start()
		setTimeout(() => {
			nprogress.complete()
		}, 1000)
	}, [pathname, searchParams])

	return <NavigationProgress color="red" />
}
