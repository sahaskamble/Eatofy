import billsCrud from "@/app/lib/crud/Bills";
import { NextResponse } from "next/server";

export async function remove_bills(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const bill_id = data['bill_id'] || null;

        if (bill_id === null) {
            return {
                returncode: 400,
                message: "Dish ID is required",
                output: []
            };
        }

        const result = await billsCrud.deleteBillById(bill_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
