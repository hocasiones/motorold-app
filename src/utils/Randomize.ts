/**
 *
 * @param arrData
 * @returns IDs string[]
 */
const Randomize = (arrData: any[]): string[] => {
	const data = arrData.map((item: { id: string }) => item.id)
	const IDs = data.sort(() => 0.5 - Math.random())
	return IDs
}

export default Randomize
