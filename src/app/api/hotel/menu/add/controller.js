import menusCrud from "@/app/lib/crud/Menus";
import dishesCrud from "@/app/lib/crud/Dishes";
import menuCategoriesCrud from "@/app/lib/crud/MenuCategory";
import sectionsCrud from "@/app/lib/crud/Sections";

export async function add_whole_menu(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Extract data from FormData or direct JSON
        const hotel_id = tokenData.hotelId || null;

        // Category Params
        const category_name = data['category_name'] || null;

        // Dish Params
        const dish_name = data['dish_name'] || null;
        const code = data['code'] || null;
        const type = data['type'] || null;
        const description = data['description'] || null;

        // Menu Params
        const price = data['price'] || null;

        // Default Invalid Checker
        if (hotel_id === null || dish_name === null || code === null || type === null || category_name === null || price === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // If the category exists taking its id else Creating new one
        let category_id = "";
        const category_exists = await menuCategoriesCrud.doesMenuCategoryExists(hotel_id, category_name);
        if (category_exists.returncode !== 200 || (category_exists.output.length === 0 || category_exists.output === null)) {
            const categoryData = {
                category_name,
                hotel_id
            };
            const category_result = await menuCategoriesCrud.createMenuCategory(categoryData);
            category_id = category_result.output._id;
        }
        else {
            category_id = category_exists.output[0]._id;
        }

        // If the dish exists taking its id else Creating new one
        let dish_id;
        const dish_exists = await dishesCrud.doesDishExists(hotel_id, dish_name, code);
        if (dish_exists.returncode !== 200 || (dish_exists.output.length === 0 || dish_exists.output === null)) {
            const dishData = {
                hotel_id,
                dish_name,
                code,
                type,
                description,
                category_id
            };

            const dish_result = await dishesCrud.createDish(dishData);
            dish_id = dish_result.output._id;
        }
        else {
            dish_id = dish_exists.output[0]._id;
        }

        // Finally Adding Menu
        const existing_sections = await sectionsCrud.readAllSections(hotel_id);
        if (existing_sections.returncode === 200 && existing_sections.output.length > 0) {

            let error_flag = false;
            existing_sections.output.forEach(async (section) => {
                const section_id = section._id;
                const menu_exists = await menusCrud.doesMenuExists(section_id, dish_id);
                if (menu_exists.returncode !== 200 || menu_exists.output.length === 0 || menu_exists.output === null) {
                    const menuData = {
                        dish_id,
                        section_id,
                        price,
                        hotel_id
                    };
                    const menu_result = await menusCrud.createMenu(menuData);
                    console.log(menu_result);
                    if (menu_result.returncode !== 200 || menu_result.output.length === 0) {
                        error_flag = true;
                    }
                }
            });

            if (!error_flag) {
                return {
                    returncode: 200,
                    message: "Menu Added in all sections",
                    output: [{ success: true }]
                }
            } else {
                return {
                    returncode: 500,
                    message: "Error adding Menus in some sections",
                    output: []
                }
            }
        }
        else {
            return {
                returncode: 400,
                message: "Add Sections before adding menu.",
                output: []
            }
        }

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
