import { Anchor, Box, Container, Group } from "@mantine/core"
import { MantineLogo } from "@mantinex/mantine-logo"

const links = [
	{ link: "#", label: "Contact" },
	{ link: "#", label: "Privacy" },
	{ link: "#", label: "Blog" },
	{ link: "#", label: "Careers" },
]

export function Footer() {
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
		<Box>
			<Container size="xl">
				<Group justify="space-between" align="center" py="md">
					<MantineLogo size={28} />
					<Group>{items}</Group>
				</Group>
			</Container>
		</Box>
	)
}
