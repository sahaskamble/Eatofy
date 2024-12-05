import { NextResponse } from "next/server";
import { remove_notifications } from "./controller";

export async function DELETE() {
    try {

        const result = await remove_notifications();
        return NextResponse.json({
            returncode: result.returncode,
            message: result.message,
            output: result.output
        }, {
            status: result.returncode
        });

    } catch (error) {
        return NextResponse.json({
            returncode: 500,
            message: error.message,
            output: []
        });
    }
}
