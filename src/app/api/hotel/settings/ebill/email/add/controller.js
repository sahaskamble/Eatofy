import ebillEmailSettingsCrud from "@/app/lib/crud/EbillEmailSettings";

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
        const email = data['email'] || null;
        const app_password = data['app_password'] || null;
        const upi_id = data['upi_id'] || null;
        const merchant_name = data['merchant_name'] || null;

        if (hotel_id === null || email === null || app_password === null || upi_id === null || merchant_name === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const existing_settings = await ebillEmailSettingsCrud.readSettings(hotel_id);
        if (existing_settings.returncode === 200 || existing_settings.output.length > 0) {
            const result = await ebillEmailSettingsCrud.updateSettings({
                hotel_id, visibility, email, app_password, upi_id, merchant_name
            });
            return result;
        }

        // Create Ebill Email Settings
        const result = await ebillEmailSettingsCrud.addSettings({
            hotel_id, visibility, email, app_password, upi_id, merchant_name
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
