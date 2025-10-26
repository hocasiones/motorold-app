import useStore from "@/store/store"
import { Carousel } from "@mantine/carousel"
import { Paper, Image } from "@mantine/core"

const ProductCarousel = () => {
	const product = useStore((state: any) => state.singleProduct)

	return (
		<Paper shadow="md" p="md">
			<Carousel withControls={true} withIndicators>
				<Carousel.Slide>
					{product?.featured_image && (
						<Image
							src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${product?.featured_image?.id}?width=600&height=600&fit=cover`}
							width={600}
							height={600}
							alt={product?.product_name}
						/>
					)}
				</Carousel.Slide>
				{product?.images?.map((image: any) => (
					<Carousel.Slide key={image?.directus_files_id?.id}>
						<Image
							src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${image?.directus_files_id?.id}?width=600&height=600&fit=cover`}
							alt={product?.product_name}
							width={600}
							height={600}
						/>
					</Carousel.Slide>
				))}
			</Carousel>
		</Paper>
	)
}

export default ProductCarousel
