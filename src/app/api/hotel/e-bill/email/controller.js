import nodemailer from "nodemailer";
import { read_ebill_email_settings } from "@/db/crud/settings/ebill/management/read";
import { read_bill_info } from "@/db/crud/bills/management/read";

export async function send_ebill_sms(data) {
	try {

		const bill_id = data['bill_id'] || null;

		if (bill_id === "") {

			return {
				returncode: 400,
				message: "Invalid Input",
				output: []
			}
		}

		// Getting Bill Variables
		const bill_info = await read_bill_info({ bill_id });
		const amount = bill_info.output[0].Amount;
		const hotel_id = bill_info.output[0].HotelId;
		const hotel_name = bill_info.output[0].Hotels.HotelName;
		const customer_email = bill_info.output[0].Customer.Email || null;

		// Getting Ebill Settings
		const existingSettings = await read_ebill_email_settings({ hotel_id });
		if (existingSettings.returncode === 200 && existingSettings.output.length != 0 && customer_email != null) {
			const sender_email = existingSettings.output[0].Email;
			const sender_app_password = existingSettings.output[0].AppPassword;
			const merchant_name = existingSettings.output[0].MerchantName;
			const upi_id = existingSettings.output[0].UPIID;
			const googlePayLink = `upi://pay?pa=${upi_id}&pn=${merchant_name}&am=${amount}&cu=INR&tn=E-bill%20From%20${hotel_name}`;
			const newline = "\n\xA0"

			// Email Carrier
			const transporter = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: sender_email,
					pass: sender_app_password,
				},
			});

			const email = await transporter.sendMail({
				from: sender_app_password,
				to: customer_email,
				subject: `${hotel_name}`,
				text: `E-Bill from ${hotel_name} for Rs. ${amount}. 
						${newline} 
						${newline} 
					${googlePayLink}`,
			});

			return {
				returncode: 200,
				message: "Email Sent",
				output: email
			}
		}
		else {

			return {
				returncode: 400,
				message: "Ebill is not Supported for this hotel",
				output: email
			}
		}

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		}
	}

}
