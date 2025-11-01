import logo from "@/../public/Logo.png"
import { SiteContext } from "@/context/context"
import useStore from "@/store/store"
import {
	ActionIcon,
	Button,
	Group,
	Image,
	Indicator,
	Paper,
	Tooltip,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import {
	IconMoon,
	IconSearch,
	IconShoppingBagHeart,
	IconShoppingCart,
	IconSun,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"

const Header = () => {
	const store: any = useStore()
	const router = useRouter()
	const pathName = usePathname()
	const { colorScheme, setColorScheme } = useMantineColorScheme()
	const computedColorScheme = useComputedColorScheme("light", {
		getInitialValueInEffect: true,
	})
	const {
		cartDrawer: { openCartDrawer },
	} = useContext(SiteContext)
	const isMobile = useMediaQuery("(max-width: 767px)")

	return (
		<Paper py={10} px={15} shadow="md">
			<Group justify={"space-between"} align="center">
				<Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
					<Image src={logo.src} w={200} h={`100%`} alt="MOTOROLD" />
				</Link>
				{pathName !== "/search" && (
					<Button
						variant="outline"
						leftSection={<IconSearch size={20} />}
						w={isMobile ? "auto" : 200}
						radius={5}
						onClick={() => {
							router.push("/search")
						}}
					>
						SEARCH
					</Button>
				)}
				<Group gap={10} align="center" display={isMobile ? "none" : "flex"}>
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
				</Group>
			</Group>
		</Paper>
	)
}

export default Header
