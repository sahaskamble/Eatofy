import hotelsCrud from "@/app/lib/crud/Hotels";

export async function remove_hotel(data, tokenData) {
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

        if (!hotel_id) {
            return NextResponse.json({
                returncode: 400,
                message: "Hotel ID is required",
                output: []
            });
        }

        // Delete the hotel
        const result = await hotelsCrud.deleteHotel({ hotel_id });
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
