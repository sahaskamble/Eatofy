import eatocoinsSettingsCrud from "@/app/lib/crud/EatocoinsSettings";

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
        const credit_limit_amt = data['credit_limit_amt'] || null;
        const credit_limit_percent = data['credit_limit_percent'] || null;
        const rate = data['rate'] || 0;
        const redeem_limit_amt = data['redeem_limit_amt'] || null;
        const redeem_limit_percent = data['redeem_limit_percent'] || null;

        if (hotel_id == null || credit_limit_amt === null || credit_limit_percent === null || redeem_limit_percent === null || redeem_limit_amt === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const existing_settings = await eatocoinsSettingsCrud.readSettings(hotel_id);
        if (existing_settings.returncode === 200 || existing_settings.output.length > 0) {
            const setting_id = existing_settings.output._id;
            const result = await eatocoinsSettingsCrud.updateSettings({
                hotel_id, visibility, credit_limit_amt, credit_limit_percent, rate, redeem_limit_amt, redeem_limit_percent
            });
            return result;
        }

        // Create Eatocoins Settings
        const result = await eatocoinsSettingsCrud.addSettings({
            hotel_id, visibility, credit_limit_percent, credit_limit_amt, redeem_limit_percent, redeem_limit_amt
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
