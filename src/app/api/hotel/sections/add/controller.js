import sectionsCrud from "@/app/lib/crud/Sections";

export async function add_section(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Extract data from FormData or direct JSON
        const hotel_id = tokenData.hotelId;
        const type = data['type'] || null;
        const section_name = data['section_name'] || null;

        if (hotel_id === null || type === null || section_name === null) {
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

        console.log(section_name);
        const section_exists = await sectionsCrud.doesSectionExists(section_name, hotel_id);
        console.log(section_exists);
        if (section_exists.returncode === 200 && section_exists.output.length > 0) {
            return {
                returncode: 409,
                message: "Section with this name already exists",
                output: []
            };
        }

        const Data = {
            section_name,
            type,
            hotel_id
        };

        const result = await sectionsCrud.createSections(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
