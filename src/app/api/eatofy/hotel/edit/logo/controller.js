import hotelsCrud from "@/app/lib/crud/Hotels";

export async function edit_hotel_logo(data, tokenData) {

    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = data.get('hotel_id') || null;
        const hotel_name = data.get('hotel_name') || null;
        const logo = data.get('logo') || null;

        if (hotel_id === null || logo === null || hotel_name === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const hotel_exists = await hotelsCrud.doesHotelExists(hotel_name);

        if (hotel_exists.returncode !== 200) {
            return {
                returncode: 409,
                message: "Hotel with this name doesn't exists",
                output: []
            };
        }

        // Handle logo file
        let logoBuffer = null;
        if (logo) {
            try {
                if (logo instanceof File || logo instanceof Blob) {
                    const arrayBuffer = await logo.arrayBuffer();
                    logoBuffer = Buffer.from(arrayBuffer);
                } else if (typeof logo === 'string') {
                    // Handle base64 string
                    const base64Data = logo.replace(/^data:image\/\w+;base64,/, '');
                    logoBuffer = Buffer.from(base64Data, 'base64');
                } else if (Buffer.isBuffer(logo)) {
                    logoBuffer = logo;
                }
            } catch (error) {
                console.error('Error processing logo:', error);
            }
        }

        const result = await hotelsCrud.updateHotelLogo(hotel_id, logoBuffer);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        }
    }
}
