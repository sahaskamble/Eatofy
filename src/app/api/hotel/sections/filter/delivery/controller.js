import sectionsCrud from "@/app/lib/crud/Sections";

export async function fetch_sections(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_sections = await sectionsCrud.readDeliverySections(hotel_id);

		if (existing_sections.returncode === 200 && existing_sections.output.length === 0) {
			return {
				returncode: 409,
				message: "No Sections to be displayed",
				output: []
			};
		}

		return existing_sections;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
