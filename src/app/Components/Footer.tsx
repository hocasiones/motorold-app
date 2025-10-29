import logo from "@/../public/Logo.png"
import {
	Anchor,
	Box,
	Container,
	Group,
	Image,
	SimpleGrid,
	Text,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import Link from "next/link"
import CartDrawer from "./CartDrawer"

const date = new Date()

const links = [
	{ link: "#", label: "Privacy Policy" },
	{ link: "#", label: "Terms & Conditions" },
	{ link: "#", label: "Contact Us" },
]

export function Footer() {
	const isMobile = useMediaQuery("(max-width: 767px)")

	const items = links.map((link) => (
		<Anchor<"a">
			c="dimmed"
			key={link.label}
			href={link.link}
			onClick={(event) => event.preventDefault()}
			size="sm"
		>
			{link.label}
		</Anchor>
	))

	return (
		<Box pb={isMobile ? 36 : 0}>
			<Container size="xl">
				<SimpleGrid cols={{ base: 1, sm: 3 }} py="md" w={`100%`} spacing={5}>
					<Link
						href="/"
						style={{
							textDecoration: "none",
							color: "inherit",
							margin: isMobile ? "0 auto" : 0,
						}}
					>
						<Image src={logo.src} w={150} h={`100%`} alt="MOTOROLD" />
					</Link>
					<Group justify="center">{items}</Group>
					<Group justify={isMobile ? "center" : "end"}>
						<Text fz={12} c="dimmed">
							© Copyright {date.getFullYear()}, All Rights Reserved
						</Text>
					</Group>
				</SimpleGrid>
			</Container>
			<CartDrawer />
		</Box>
	)
}
