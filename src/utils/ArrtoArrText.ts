/**
 *
 * @param data string[]
 * @returns string | null
 */
const ArrtoArrText = (data: string[]) => {
	if (data.length === 0) {
		return `[]`
	}
	return `[${data.map((entry) => JSON.stringify(entry)).join(",")}]`
}

export default ArrtoArrText
