import { OfflineBaseCrud } from "./BaseCrud";

class SectionsCrud extends OfflineBaseCrud {
	constructor() {
		super('Sections');
	}

	async readAllSections(hotel_id) {
		try {

			const sections = await this.read('HotelId', hotel_id);
			return sections;

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			}
		}
	}

}

const sectionsCrud = new SectionsCrud();
export default sectionsCrud; 
