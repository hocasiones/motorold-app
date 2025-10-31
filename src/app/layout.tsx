import type { Metadata } from "next"
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css"
// ‼️ import nprogress styles after core package styles
import "@mantine/nprogress/styles.css"
// ‼️ import carousel styles after core package styles
import "@mantine/carousel/styles.css"
// ‼️ import notifications styles after core package styles
import "@mantine/notifications/styles.css"
import "./globals.css"
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core"
import Providers from "@/app/Components/Providers"

export const metadata: Metadata = {
	title: "MOTOROLD",
	description: "Motorcycle Part & Accessories",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
