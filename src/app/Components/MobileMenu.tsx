"use client"

import { SiteContext } from "@/context/context"
import useStore from "@/store/store"
import { Box, Button, Group, Indicator } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import {
	IconBuildingStore,
	IconSearch,
	IconShoppingCart,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"

const MobileMenu = () => {
	const router = useRouter()
	const isMobile = useMediaQuery("(max-width: 767px)")
	const { openCartDrawer } = useContext(SiteContext).cartDrawer
	const store: any = useStore()

	return (
		<Box
			display={isMobile ? "block" : "none"}
			style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2000 }}
		>
			<Group grow gap={0}>
				<Button
					variant="filled"
					size="sm"
					color="blue"
					radius={0}
					leftSection={<IconBuildingStore size={22} />}
					onClick={() => {
						router.push("/")
					}}
				>
					SHOP
				</Button>
				<Button
					variant="filled"
					size="sm"
					color="blue"
					radius={0}
					leftSection={<IconSearch size={22} />}
				>
					Search
				</Button>

				<Button
					variant="filled"
					size="sm"
					color="blue"
					radius={0}
					leftSection={
						<Indicator
							label={store.cartList?.length ?? 0}
							size={16}
							color="red"
							mb={-6}
						>
							<IconShoppingCart size={22} />
						</Indicator>
					}
					onClick={() => {
						openCartDrawer()
					}}
				>
					Cart
				</Button>
			</Group>
		</Box>
	)
}

export default MobileMenu
