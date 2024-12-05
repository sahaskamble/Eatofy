import sectionsCrud from "@/app/lib/crud/Sections";

export async function remove_section(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const section_id = data['section_id'] || null;

        if (section_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Section ID is required",
                output: []
            });
        }

        const result = await sectionsCrud.deleteSectionsByID(section_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
