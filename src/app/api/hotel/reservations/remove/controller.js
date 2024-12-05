import reservationsCrud from "@/app/lib/crud/Reservation";

export async function remove_reservation(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const reservation_id = data['reservation_id'] || null;

        if (reservation_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Reservation ID is required",
                output: []
            });
        }

        const result = await reservationsCrud.deleteReservations(reservation_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
