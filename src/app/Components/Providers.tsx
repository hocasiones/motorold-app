"use client"

import { Box, Container, MantineProvider } from "@mantine/core"
import React, { useEffect, useMemo } from "react"
import Header from "./Header"
import { Footer } from "./Footer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import { SiteContext } from "@/Context/context"

// Create a client
const queryClient = new QueryClient()

const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const ref = React.useRef<HTMLDivElement>(null)
	const [headerHeight, setHeaderHeight] = React.useState<number>(0)
	const [cartDrawerOpened, { open: openCartDrawer, close: closeCartDrawer }] =
		useDisclosure(false)

	// This effect is used to set the header height after the component mounts
	useEffect(() => {
		setTimeout(() => {
			if (!ref.current) return
			setHeaderHeight(ref.current?.clientHeight)
		}, 0)
	}, [ref])

	const ctx = useMemo(() => {
		return {
			cartDrawer: {
				cartDrawerOpened,
				openCartDrawer,
				closeCartDrawer,
			},
		}
	}, [cartDrawerOpened, openCartDrawer, closeCartDrawer])

	return (
		<MantineProvider>
			<Notifications position="top-center" limit={5} zIndex={2000} />
			<QueryClientProvider client={queryClient}>
				<SiteContext.Provider value={ctx}>
					<Header ref={ref} />
					<Box
						py={20}
						style={{
							marginTop: headerHeight,
						}}
					>
						<Container size="xl">{children}</Container>
					</Box>
					<Footer />
				</SiteContext.Provider>
			</QueryClientProvider>
		</MantineProvider>
	)
}

export default Providers
