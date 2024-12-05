import kotSettingsCrud from "@/app/lib/crud/KotPrinterSettings";
import { ThermalPrinter, PrinterTypes, CharacterSet } from "node-thermal-printer";

function formatDate(date) {
    return new Date(date).toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export async function print_kot(data) {
    try {
        const { hotel_id, type, table_name, cart, date } = data;

        if (!hotel_id || !type || !cart || !date) {
            return {
                returncode: 400,
                message: "Missing required fields",
                output: []
            };
        }

        // Get printer settings
        // const settingsResponse = await kotSettingsCrud.readSettings(hotel_id);
        // if (settingsResponse.returncode !== 200 || !settingsResponse.output?.length) {
        //     return {
        //         returncode: 400,
        //         message: "Printer settings not found",
        //         output: []
        //     };
        // }

        // const settings = settingsResponse.output[0];
        let printer;

        try {
            printer = new ThermalPrinter({
                type: PrinterTypes.EPSON,
                interface: '/dev/usb/lp0',
                // settings.ConnectionType === 'USB' ? (settings.USBPath || '/dev/usb/lp0') : `tcp://${settings.NetworkIP}`,
                options: {
                    timeout: 3000,
                },
                width: 32, // 58mm printer
                characterSet: CharacterSet.PC437_USA,
            });

            console.log(printer);

            const isConnected = await printer.isPrinterConnected();
            if (!isConnected) {
                throw new Error('Printer not connected');
            }

            // Print header
            printer.alignCenter();
            printer.bold(true);
            printer.println("** KOT **");
            printer.bold(false);
            printer.println(`Type: ${type}`);
            printer.println(`Date: ${formatDate(date)}`);
            printer.drawLine();

            // Print table name
            printer.bold(true);
            printer.println(table_name);
            printer.bold(false);
            printer.drawLine();

            // Print items header
            printer.leftRight("Item", "Qty");
            printer.drawLine();

            // Print items
            cart.forEach(item => {
                printer.leftRight(
                    item.name.substring(0, 20), // Limit name length
                    item.quantity.toString()
                );
                if (item.note) {
                    printer.println(`Note: ${item.note}`);
                }
            });

            printer.drawLine();
            printer.cut();
            
            await printer.execute();
            
            return {
                returncode: 200,
                message: "KOT printed successfully",
                output: []
            };

        } catch (error) {
            console.error('Printer error:', error);
            return {
                returncode: 500,
                message: `Printer error: ${error.message}`,
                output: []
            };
        }

    } catch (error) {
        console.error('KOT printing error:', error);
        return {
            returncode: 500,
            message: error.message || "Failed to print KOT",
            output: []
        };
    }
}
