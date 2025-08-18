import { render } from "@testing-library/react"
import Providers from "@/app/Components/Providers"
import Page from "@/app/page"

/**
 * *This test is just for demonstration purpose only since this in an ongoing project
 * Tests below is to make sure different pages renders correctly
 */

// Mock useRouter:
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			prefetch: () => null,
		}
	},
}))

describe("Snapshots", () => {
	it("renders homepage unchanged", () => {
		const { container } = render(
			<Providers>
				<Page />
			</Providers>
		)
		expect(container).toMatchSnapshot()
	})
})
