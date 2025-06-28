import {
	ActionIcon,
	Affix,
	Group,
	Input,
	Paper,
	Title,
	Tooltip,
} from "@mantine/core"
import {
	IconSearch,
	IconShoppingBagHeart,
	IconShoppingCart,
	IconSun,
	IconVs,
} from "@tabler/icons-react"
import React from "react"

const Header = ({ ref }: Readonly<{ ref: React.Ref<HTMLDivElement> }>) => {
	return (
		<Affix position={{ top: 0, left: 0, right: 0 }} zIndex={1000}>
			<Paper py={10} px={15} shadow="md" ref={ref}>
				<Group justify="space-between" align="center">
					<Title order={3}>MOTOROLD</Title>
					<Group gap={10} align="center">
						<Input
							pointer
							placeholder="Search"
							leftSection={<IconSearch size={20} />}
							w={150}
							readOnly
						/>
						<Tooltip label="Cart" zIndex={1000}>
							<ActionIcon variant="subtle" color="blue" radius="sm">
								<IconShoppingCart />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="Compare" zIndex={1000}>
							<ActionIcon variant="subtle" color="blue" radius="sm">
								<IconVs />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="Wishlist" zIndex={1000}>
							<ActionIcon variant="subtle" color="blue" radius="sm">
								<IconShoppingBagHeart />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="Lighting" zIndex={1000}>
							<ActionIcon variant="subtle" color="blue" radius="sm">
								<IconSun />
							</ActionIcon>
						</Tooltip>
					</Group>
				</Group>
			</Paper>
		</Affix>
	)
}

export default Header
