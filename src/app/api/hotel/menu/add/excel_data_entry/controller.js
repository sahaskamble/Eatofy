import menuCategoriesCrud from "@/app/lib/crud/MenuCategory";
import menusCrud from "@/app/lib/crud/Menus";

export async function add_menu_dish_excel(data) {

    try {

        // Dish Category
        const hotel_id = data['hotel_id'] || null;
        const category_name = data['category_name'] || null;

        // Dish
        const dish_name = data['dish_name'] || null;
        const dish_code = data['dish_code'] || null;
        const dish_type = data['dish_type'] || null;

        // Menu
        const prices = data['prices'] || null;

        // Default Invalid Checker
        if (prices === null || hotel_id === null || category_name === null || dish_name === null || dish_code === null || dish_type === null) {
            return {
                returncode: 400,
                message: 'Invalid Input',
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

        // Inserting the Menu for each section
        let error_flag = false;
        prices.forEach(async (price) => {
            const section_id = price.section_id;
            const amount = price.amount;
            const menu_exists = await menusCrud.doesMenuExists(section_id, dish_id);
            if (menu_exists.returncode !== 200 || menu_exists.output.length === 0 || menu_exists.output === null) {
                const menuData = {
                    dish_id,
                    section_id,
                    price: amount,
                    hotel_id
                };
                const menu_result = await menusCrud.createMenu(menuData);
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

    } catch (error) {
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
