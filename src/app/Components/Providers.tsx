"use client"

import { SiteContext } from "@/context/context"
import { Box, Container, createTheme, MantineProvider } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Notifications } from "@mantine/notifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { Suspense, useMemo } from "react"
import { Footer } from "./Footer"
import Header from "./Header"
import MobileMenu from "./MobileMenu"
import { LoadingProgress } from "./LoadingProgress"

const theme = createTheme({
	/* Put your mantine theme override here */
	fontFamily: "Roboto, sans-serif",
})

// Create a client
const queryClient = new QueryClient()

const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const [cartDrawerOpened, { open: openCartDrawer, close: closeCartDrawer }] =
		useDisclosure(false)

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
		<MantineProvider theme={theme}>
			<Notifications position="top-center" limit={5} zIndex={99999} />
			<QueryClientProvider client={queryClient}>
				<SiteContext.Provider value={ctx}>
					<LoadingProgress />
					<Header />
					<Box py={20}>
						<Container size="xl">{children}</Container>
					</Box>
					<Footer />
					<MobileMenu />
				</SiteContext.Provider>
			</QueryClientProvider>
		</MantineProvider>
	)
}

export default Providers
