import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Providers from "@/app/Components/Providers"
import Page from "@/app/page"

/**
 * *This test is just for demonstration purpose only since this in an ongoing project
 * Tests below is to test if temporary text for logo renders correctly
 */

// Mock useRouter:
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			prefetch: () => null,
		}
	},
}))

describe("Page", () => {
	it("renders a title", () => {
		render(
			<Providers>
				<Page />
			</Providers>
		)

		const title = screen.getByText("MOTOROLD")

		expect(title).toBeInTheDocument()
	})
})
