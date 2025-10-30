import { SingleProuctContext } from "@/context/context"
import { Carousel } from "@mantine/carousel"
import { Image, Paper } from "@mantine/core"
import { useContext } from "react"

const ProductCarousel = () => {
	const product = useContext(SingleProuctContext)?.product

	console.log(product)

	return (
		<Paper shadow="md" p="md">
			<Carousel
				withIndicators
				controlSize={36}
				withControls={product?.images?.length > 0}
			>
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
