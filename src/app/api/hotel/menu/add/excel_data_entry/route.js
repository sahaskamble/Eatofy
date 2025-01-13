import { add_menu_dish_excel } from "./controller";

export async function POST(request) {
    try {
        const data = await request.json();
        const result = await add_menu_dish_excel(data);
        return Response.json(
            {
                returncode: result.returncode,
                message: result.message,
                output: result.output
            },
            {
                status: result.returncode
            }
        );
    }
    catch (error) {
        return Response.json(
            {
                returncode: 500,
                message: `Error Adding Menu: ${error.message}`,
                output: []
            },
            {
                status: 500
            }
        );
    }
}
