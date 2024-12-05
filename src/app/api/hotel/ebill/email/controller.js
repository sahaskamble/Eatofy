import nodemailer from "nodemailer";
import ebillEmailSettingsCrud from "@/app/lib/crud/EbillEmailSettings";
import billsCrud from "@/app/lib/crud/Bills";

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function getFormattedDate() {
    return new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export async function send_ebill_email(data) {
    try {
        const bill_id = data['bill_id'];

        if (!bill_id) {
            return {
                returncode: 400,
                message: "Invalid Input: bill_id is required",
                output: []
            };
        }

        // Get bill information
        const billResponse = await billsCrud.readBill(bill_id);
        if (billResponse.returncode !== 200 || !billResponse.output) {
            return {
                returncode: 400,
                message: "Bill not found",
                output: []
            };
        }

        const bill = billResponse.output;
        const amount = bill.TotalAmount;
        const hotel_id = bill.HotelId;
        const hotel_name = bill.Hotels?.HotelName;
        const customer_email = bill.Customer?.Email;
        const customer_name = bill.Customer?.CustomerName || 'Valued Customer';

        if (!customer_email) {
            return {
                returncode: 400,
                message: "Customer email not available",
                output: []
            };
        }

        // Get email settings
        const settingsResponse = await ebillEmailSettingsCrud.readSettings(hotel_id);
        if (settingsResponse.returncode !== 200 || !settingsResponse.output?.length) {
            return {
                returncode: 400,
                message: "E-bill email settings not configured for this hotel",
                output: []
            };
        }

        const settings = settingsResponse.output[0];
        const {
            Email: sender_email,
            AppPassword: sender_app_password,
            MerchantName: merchant_name,
            UPIID: upi_id
        } = settings;

        // Create Google Pay link
        const googlePayLink = `upi://pay?pa=${upi_id}&pn=${merchant_name}&am=${amount}&cu=INR&tn=E-bill%20From%20${encodeURIComponent(hotel_name)}`;
        const formattedAmount = formatCurrency(amount);
        const formattedDate = getFormattedDate();

        // Configure email transport
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: sender_email,
                pass: sender_app_password,
            },
        });

        // Send email
        const email = await transporter.sendMail({
            from: sender_email,
            to: customer_email,
            subject: `Your E-Bill from ${hotel_name}`,
            text: `E-Bill from ${hotel_name}
                Amount: ${formattedAmount}
                Date: ${formattedDate}
                
                Pay using Google Pay: ${googlePayLink}
                
                Thank you for your business!
                
                Best regards,
                ${hotel_name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f0f0f0;">
                            <h1 style="color: #333; margin: 0; font-size: 24px;">${hotel_name}</h1>
                            <p style="color: #666; margin: 5px 0;">E-Bill Receipt</p>
                        </div>

                        <!-- Customer Info -->
                        <div style="padding: 20px 0;">
                            <p style="margin: 0; color: #666;">Dear ${customer_name},</p>
                            <p style="margin: 10px 0; color: #666;">Thank you for dining with us. Here's your bill details:</p>
                        </div>

                        <!-- Bill Details -->
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <strong style="color: #333;">Bill Number:</strong>
                                <span style="color: #666;">#${bill_id}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <strong style="color: #333;">Date:</strong>
                                <span style="color: #666;">${formattedDate}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <strong style="color: #333;">Amount:</strong>
                                <span style="color: #2e7d32; font-weight: bold;">${formattedAmount}</span>
                            </div>
                        </div>

                        <!-- Payment Button -->
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${googlePayLink}" style="display: inline-block; padding: 12px 24px; background-color: #2e7d32; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
                                Pay with Google Pay
                            </a>
                            <p style="margin: 10px 0; color: #666; font-size: 12px;">
                                Click the button above or scan the QR code to pay
                            </p>
                        </div>

                        <!-- Footer -->
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
                            <p style="margin: 0; color: #666; font-size: 14px;">Thank you for your business!</p>
                            <p style="margin: 5px 0; color: #999; font-size: 12px;">
                                This is an automated email. Please do not reply.
                            </p>
                            <div style="margin-top: 20px;">
                                <p style="margin: 0; color: #666; font-size: 12px;">
                                    ${hotel_name}
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        return {
            returncode: 200,
            message: "Email sent successfully",
            output: {
                messageId: email.messageId,
                response: email.response
            }
        };

    } catch (error) {
        console.error('Error sending email:', error);
        return {
            returncode: 500,
            message: error.message || "Failed to send email",
            output: []
        };
    }
}
