import invoiceSettingsCrud from "@/app/lib/crud/InvoicePrinterSettings";
import ebillEmailSettingsCrud from "@/app/lib/crud/EbillEmailSettings";
import ThermalPrinter from "node-thermal-printer";
import { ThermalPrinter as Printer, PrinterTypes } from "node-thermal-printer";
import QRCode from "qrcode";

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

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(amount).replace(/^₹/, '');
}

export async function print_invoice(data) {
    try {
        const {
            hotel_id,
            hotel_name,
            gst_no,
            bill_id,
            table_name,
            cart,
            date,
            sub_total,
            total_qty,
            cgst,
            sgst,
            vat,
            discount,
            balance,
            grand_total
        } = data;

        if (!hotel_id || !bill_id || !cart) {
            return {
                returncode: 400,
                message: "Missing required fields",
                output: []
            };
        }

        // Get printer settings
        const settingsResponse = await invoiceSettingsCrud.readSettings(hotel_id);
        if (settingsResponse.returncode !== 200 || !settingsResponse.output?.length) {
            return {
                returncode: 400,
                message: "Printer settings not found",
                output: []
            };
        }

        // Get e-bill settings for QR code
        const ebillSettings = await ebillEmailSettingsCrud.readSettings(hotel_id);
        let qrCodeBuffer = null;

        if (ebillSettings.returncode === 200 && ebillSettings.output?.length) {
            const settings = ebillSettings.output[0];
            const paymentLink = `upi://pay?pa=${settings.UPIID}&pn=${settings.MerchantName}&am=${grand_total}&cu=INR&tn=Bill%20From%20${encodeURIComponent(hotel_name)}`;
            qrCodeBuffer = await QRCode.toBuffer(paymentLink, {
                errorCorrectionLevel: 'M',
                type: 'png',
                width: 200,
                margin: 1
            });
        }

        const settings = settingsResponse.output[0];
        const printer = new Printer({
            type: PrinterTypes.EPSON,
            interface: `tcp://${settings.NetworkIP}`,
            options: {
                timeout: 1000
            },
            width: 42,
            characterSet: settings.Encoding || 'PC437_USA'
        });

        printer.clear();

        // Header
        printer.alignCenter();
        printer.bold(true);
        printer.setTextSize(1, 1);
        printer.println(hotel_name);
        printer.setTextSize(0, 0);
        printer.bold(false);
        printer.println(`Bill No: ${bill_id.slice(0, 12)}`);
        if (gst_no) printer.println(`GST No: ${gst_no}`);
        printer.println(`Date: ${formatDate(date)}`);
        printer.drawLine();

        // Table Name
        printer.bold(true);
        printer.println(table_name);
        printer.bold(false);
        printer.drawLine();

        // Items Header
        printer.tableCustom([
            { text: "Item", width: 20, align: "LEFT" },
            { text: "Qty", width: 6, align: "CENTER" },
            { text: "Price", width: 8, align: "CENTER" },
            { text: "Amt", width: 8, align: "RIGHT" }
        ]);
        printer.drawLine();

        // Items
        cart.filter(item => item.Status !== 'Cancelled')
            .forEach(item => {
                printer.tableCustom([
                    { text: item.Menu.Dish.DishName, width: 20, align: "LEFT" },
                    { text: item.Quantity.toString(), width: 6, align: "CENTER" },
                    { text: formatCurrency(item.Menu.Price), width: 8, align: "CENTER" },
                    { text: formatCurrency(item.Menu.Price * item.Quantity), width: 8, align: "RIGHT" }
                ]);
            });

        printer.drawLine();

        // Totals
        printer.leftRight("Sub-Total:", formatCurrency(sub_total));
        printer.leftRight("Quantity:", total_qty.toString());
        printer.drawLine();

        // Taxes and Discounts
        if (cgst) printer.leftRight(`CGST (${cgst}%):`, formatCurrency(sub_total * cgst / 100));
        if (sgst) printer.leftRight(`SGST (${sgst}%):`, formatCurrency(sub_total * sgst / 100));
        if (vat) printer.leftRight(`VAT (${vat}%):`, formatCurrency(sub_total * vat / 100));
        if (discount) printer.leftRight(`Discount (${discount}%):`, `( - ${formatCurrency(sub_total * discount / 100)})`);
        if (balance > 0) printer.leftRight("Balance Amount:", formatCurrency(balance));

        printer.drawLine();
        printer.bold(true);
        printer.leftRight("Grand Total:", formatCurrency(grand_total));
        printer.bold(false);
        printer.drawLine();

        // QR Code if available
        if (qrCodeBuffer) {
            printer.alignCenter();
            printer.println("Scan to pay");
            await printer.printImage(qrCodeBuffer);
        }

        // Footer
        printer.alignCenter();
        printer.println("!!! Thank You visit us again !!!");
        printer.cut();

        try {
            await printer.execute();
            return {
                returncode: 200,
                message: "Invoice printed successfully",
                output: []
            };
        } catch (error) {
            throw new Error(`Printer error: ${error.message}`);
        }

    } catch (error) {
        console.error('Invoice printing error:', error);
        return {
            returncode: 500,
            message: error.message || "Failed to print invoice",
            output: []
        };
    }
}
