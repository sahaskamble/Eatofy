import vatSettingsCrud from "@/app/lib/crud/VATSettings";

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
        const vat_percent = data['vat_percent'] || null;

        if (hotel_id == null || vat_percent == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const existing_settings = await vatSettingsCrud.readSettings(hotel_id);
        if (existing_settings.returncode === 200 || existing_settings.output.length > 0) {
            const result = await vatSettingsCrud.updateSettings({
                hotel_id, visibility, vat_percent
            });
            return result;
        }

        // Create VAT Settings
        const result = await vatSettingsCrud.addSettings({
            hotel_id, visibility, vat_percent
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
