import hotelsCrud from "@/app/lib/crud/Hotels";
import staffCrud from "@/app/lib/crud/Staffs";

export async function add_hotel(data, tokenData) {
    try {
        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Administration', 'Management'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Hotel Params
        const hotel_name = data.get ? data.get('hotel_name') : data.hotel_name;
        const email = data.get ? data.get('email') : data.email;
        const address = data.get ? data.get('address') : data.address;
        const speciality = data.get ? data.get('speciality') : data.speciality;
        const contacts = data.get ? data.get('contacts') : data.contacts;
        const website = data.get ? data.get('website') : data.website;
        const fssai_code = data.get ? data.get('fssai_code') : data.fssai_code;
        const gstin = data.get ? data.get('gstin') : data.gstin;
        const logo = data.get ? data.get('logo') : data.logo;

        // Staff Params
        const first_name = data.get ? data.get('first_name') : data.first_name || null;
        const last_name = data.get ? data.get('last_name') : data.last_name || null;
        const owner_address = data.get ? data.get('owner_address') : data.owner_address || null;
        const owner_contact = data.get ? data.get('owner_contact') : data.owner_contact || null;
        const password = data.get ? data.get('password') : data.password || null;
        const department_name = data.get ? data.get('department_name') : data.department_name || null;
        const designation = data.get ? data.get('designation') : data.designation || null;
        const role = "Owner";
        const salary = 0;
        const incentives = 0;


        if (hotel_name === null || email === null || address === null || fssai_code === null || gstin === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        if (first_name === null || last_name === null || owner_address === null || owner_contact === null || password === null || department_name === null || designation === null) {
            return {
                returncode: 400,
                message: "Missing owner required parameters",
                output: []
            };
        }


        const hotel_exists = await hotelsCrud.doesHotelExists(hotel_name);

        if (hotel_exists.returncode === 200) {
            return {
                returncode: 409,
                message: "Hotel with this name already exists",
                output: []
            };
        }

        // Handle logo file
        let logoBuffer = null;
        if (logo) {
            try {
                if (logo instanceof File || logo instanceof Blob) {
                    const arrayBuffer = await logo.arrayBuffer();
                    logoBuffer = Buffer.from(arrayBuffer);
                } else if (typeof logo === 'string') {
                    // Handle base64 string
                    const base64Data = logo.replace(/^data:image\/\w+;base64,/, '');
                    logoBuffer = Buffer.from(base64Data, 'base64');
                } else if (Buffer.isBuffer(logo)) {
                    logoBuffer = logo;
                }
            } catch (error) {
                console.error('Error processing logo:', error);
            }
        }

        // Create hotel with additional metadata
        const hotelData = {
            hotel_name,
            email,
            address,
            speciality: speciality ? (typeof speciality === 'string' ? speciality.split(',') : speciality) : [],
            contacts: contacts ? (typeof contacts === 'string' ? contacts.split(',') : contacts) : [],
            website,
            fssai_code,
            gstin,
            logo: logoBuffer,
            created_by: tokenData.userId,
            created_at: new Date()
        };

        let hotel_id
        const hotel_result = await hotelsCrud.createHotel(hotelData);
        if (hotel_result.returncode === 200 && hotel_result.output) {
            hotel_id = hotel_result.output._id;
            const Data = {
                first_name,
                last_name,
                address: owner_address,
                contact: owner_contact,
                email,
                password,
                department_name,
                designation,
                role,
                salary,
                incentives,
                hotel_id
            }

            const result = await staffCrud.createStaff(Data);
            if (result.returncode === 200 && result.output.length !== 0) {
                return {
                    returncode: 200,
                    message: "Owner and Hotel created.",
                    output:
                    {
                        Staff: result.output,
                        Hotel: hotel_result.output
                    }

                };
            }
            else {
                return {
                    returncode: 503,
                    message: "Owner was not added.",
                    output: []
                }
            }
        }
        else {
            return hotel_result;
        }

    } catch (error) {
        console.error('Error in add_hotel:', error);
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
