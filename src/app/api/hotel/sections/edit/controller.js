import sectionsCrud from "@/app/lib/crud/Sections";

export async function edit_section_info(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = tokenData.hotelId;
        const section_id = data['section_id'] || null;
        const type = data['type'] || null;
        const section_name = data['section_name'] || null;

        if (section_id === null || type === null || section_name === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        if (!["Takeaway", "Delivery", "Dine-In", "Swiggy", "Zomato", "QR-Orders"].includes(type)) {
            return {
                returncode: 400,
                message: 'Type must be one of:- "Takeaway", "Delivery", "Dine-In", "Swiggy", "Zomato", "QR-Orders".',
                output: []
            };
        }

        const section_exists = await sectionsCrud.doesSectionExists(section_name, hotel_id);
        if (section_exists.returncode !== 200) {
            return {
                returncode: 409,
                message: "Section with this name doesn't exists.",
                output: []
            };
        }

        const Data = {
            section_name,
            type,
            section_id
        };

        const result = await sectionsCrud.updateSections(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
