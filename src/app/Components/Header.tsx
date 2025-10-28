import logo from "@/../public/Logo.png"
import { SiteContext } from "@/context/context"
import useStore from "@/store/store"
import {
	ActionIcon,
	Affix,
	Group,
	Image,
	Indicator,
	Input,
	Paper,
	Tooltip,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core"
import {
	IconMoon,
	IconSearch,
	IconShoppingBagHeart,
	IconShoppingCart,
	IconSun,
	IconVs,
} from "@tabler/icons-react"
import Link from "next/link"
import React, { useContext } from "react"

const Header = ({ ref }: Readonly<{ ref: React.Ref<HTMLDivElement> }>) => {
	const store: any = useStore()
	const { colorScheme, setColorScheme } = useMantineColorScheme()
	const computedColorScheme = useComputedColorScheme("light", {
		getInitialValueInEffect: true,
	})
	const { openCartDrawer } = useContext(SiteContext).cartDrawer

	return (
		<Affix position={{ top: 0, left: 0, right: 0 }} zIndex={1000}>
			<Paper py={10} px={15} shadow="md" ref={ref}>
				<Group justify="space-between" align="center">
					<Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
						<Image src={logo.src} w={200} h={`100%`} alt="MOTOROLD" />
					</Link>
					<Group gap={10} align="center">
						<Input
							pointer
							placeholder="Search"
							leftSection={<IconSearch size={20} />}
							w={150}
							readOnly
						/>
						<Tooltip label="Cart" zIndex={1000}>
							<Indicator
								label={store.cartList?.length ?? 0}
								size={16}
								color="red"
								mb={-6}
							>
								<ActionIcon
									variant="subtle"
									color="blue"
									radius="sm"
									onClick={openCartDrawer}
								>
									<IconShoppingCart />
								</ActionIcon>
							</Indicator>
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
							<ActionIcon
								variant="subtle"
								color="blue"
								radius="sm"
								onClick={() =>
									setColorScheme(
										computedColorScheme === "light" ? "dark" : "light"
									)
								}
							>
								{colorScheme === "light" ? (
									<IconSun size={20} />
								) : (
									<IconMoon size={20} stroke={1.5} />
								)}
							</ActionIcon>
						</Tooltip>
						<ActionIcon
							variant="subtle"
							color="blue"
							radius="sm"
							onClick={() => {
								store.clear()
							}}
						>
							<IconShoppingBagHeart />
						</ActionIcon>
					</Group>
				</Group>
			</Paper>
		</Affix>
	)
}

export default Header
