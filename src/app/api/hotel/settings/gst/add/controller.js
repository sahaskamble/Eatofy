import gstSettingsCrud from "@/app/lib/crud/GSTSettings";

export async function add_settings(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Extract data from FormData or direct JSON
        const hotel_id = tokenData.hotelId || null;
        const visibility = data['visibility'] || false;
        const gst_percent = data['gst_percent'] || null;

        if (hotel_id == null || gst_percent == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const existing_gst_settings = await gstSettingsCrud.readSettings(hotel_id);
        if (existing_gst_settings.returncode === 200 || existing_gst_settings.output.length > 0) {
            const result = await gstSettingsCrud.updateSettings({
                hotel_id, visibility, gst_percent
            });
            return result;
        }

        // Create GST Settings
        const result = await gstSettingsCrud.addSettings({
            hotel_id, visibility, gst_percent
        });
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
