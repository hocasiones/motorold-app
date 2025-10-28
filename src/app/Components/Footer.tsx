import { Anchor, Box, Container, Group } from "@mantine/core"
import { MantineLogo } from "@mantinex/mantine-logo"
import CartDrawer from "./CartDrawer"
import { useMediaQuery } from "@mantine/hooks"

const links = [
	{ link: "#", label: "Contact" },
	{ link: "#", label: "Privacy" },
	{ link: "#", label: "Blog" },
	{ link: "#", label: "Careers" },
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
				<Group justify="space-between" align="center" py="md">
					<MantineLogo size={28} />
					<Group>{items}</Group>
				</Group>
			</Container>
			<CartDrawer />
		</Box>
	)
}
