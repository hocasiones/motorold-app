import useStore from "@/store/store"
import { Carousel } from "@mantine/carousel"
import { Image, Paper } from "@mantine/core"

const ProductCarousel = () => {
	const product = useStore((state: any) => state.singleProduct)

	return (
		<Paper shadow="md" p="md">
			<Carousel withControls={false}>
				<Carousel.Slide>
					<Image
						src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${product?.featured_image?.id}?width=600&height=600&fit=cover`}
						alt={product?.product_name}
					/>
				</Carousel.Slide>
			</Carousel>
		</Paper>
	)
}

export default ProductCarousel
