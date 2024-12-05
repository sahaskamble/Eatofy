import hotelsCrud from "@/app/lib/crud/Hotels";

export async function edit_hotel_info(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = data['hotel_id'] || null;
        const hotel_name = data['hotel_name'] || null;
        const email = data['email'] || null;
        const address = data['address'] || null;
        const speciality = data['speciality'] || null;
        const contacts = data['contacts'] || null;
        const website = data['website'] || null;
        const fssai_code = data['fssai_code'] || null;
        const gstin = data['gstin'] || null;

        if (hotel_name === null || email === null || address === null || fssai_code === null || gstin === null) {
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

        // Create hotel with additional metadata
        const hotelData = {
            hotel_name,
            email,
            address,
            speciality,
            contacts,
            website,
            fssai_code,
            gstin,
            hotel_id
        };

        const result = await hotelsCrud.updateHotelInfo(hotelData);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
