import invoiceSettingsCrud from "@/app/lib/crud/InvoicePrinterSettings";

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
        const network_ip = data['network_ip'] || null;
        const encoding = data['encoding'] || null;
        const bluetooth_mac = data['bluetooth_mac'] || null;

        if (hotel_id === null || network_ip === null || encoding === null || bluetooth_mac === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const existing_settings = await invoiceSettingsCrud.readSettings(hotel_id);
        if (existing_settings.returncode === 200 || existing_settings.output.length > 0) {
            const result = await invoiceSettingsCrud.updateSettings({
                hotel_id, visibility, network_ip, encoding, bluetooth_mac
            });
            return result;
        }

        // Create Invoice Printer Settings
        const result = await invoiceSettingsCrud.addSettings({
            hotel_id, visibility, network_ip, encoding, bluetooth_mac
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
