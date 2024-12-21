module.exports = {

"[externals]/ [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-route.runtime.dev.js");

module.exports = mod;
}}),
"[externals]/ [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("@opentelemetry/api");

module.exports = mod;
}}),
"[externals]/ [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-page.runtime.dev.js");

module.exports = mod;
}}),
"[externals]/ [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/server/app-render/work-unit-async-storage.external.js");

module.exports = mod;
}}),
"[externals]/ [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/server/app-render/work-async-storage.external.js");

module.exports = mod;
}}),
"[project]/src/app/lib/crud/BaseCrud.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "BaseCrud": (()=>BaseCrud)
});
class BaseCrud {
    constructor(model){
        this.model = model;
    }
    // Create a new document
    async create(data) {
        try {
            const doc = new this.model(data);
            await doc.save();
            return {
                returncode: 200,
                message: "Data Created Successfully",
                output: doc
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    // Read all documents with optional filters
    async readMany(filters = {}, options = {}) {
        try {
            const { sort = {}, populate = [], select = '', skip = 0, limit = 0, lean = false } = options;
            let query = this.model.find(filters);
            // Apply population
            if (populate.length > 0) {
                query = query.populate(populate);
            }
            // Apply sorting
            if (Object.keys(sort).length > 0) {
                query = query.sort(sort);
            }
            // Apply selection
            if (select) {
                query = query.select(select);
            }
            // Apply pagination
            if (skip > 0) {
                query = query.skip(skip);
            }
            if (limit > 0) {
                query = query.limit(limit);
            }
            // Execute query
            const docs = lean ? await query.lean() : await query.exec();
            return {
                returncode: 200,
                message: "Data Fetched Successfully",
                output: docs
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    // Read a single document
    async readOne(filters = {}, options = {}) {
        try {
            const { populate = [], select = '', lean = false } = options;
            let query = this.model.findOne(filters);
            // Apply population
            if (populate.length > 0) {
                query = query.populate(populate);
            }
            // Apply selection
            if (select) {
                query = query.select(select);
            }
            // Execute query
            const doc = lean ? await query.lean() : await query.exec();
            if (!doc) {
                return {
                    returncode: 404,
                    message: "Document Not Found",
                    output: []
                };
            }
            return {
                returncode: 200,
                message: "Data Fetched Successfully",
                output: doc
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    // Update a document
    async update(filters = {}, data = {}, options = {
        new: true
    }) {
        try {
            const doc = await this.model.findOneAndUpdate(filters, data, options);
            if (!doc) {
                return {
                    returncode: 404,
                    message: "Document Not Found",
                    output: []
                };
            }
            return {
                returncode: 200,
                message: "Data Updated Successfully",
                output: doc
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    // Delete a document
    async delete(filters = {}) {
        try {
            console.log('BaseCrud.delete called with:', {
                model: this.model.modelName,
                filters
            });
            const doc = await this.model.deleteMany(filters);
            console.log('BaseCrud.delete result:', doc);
            if (!doc || doc.deletedCount === 0) {
                console.log('BaseCrud.delete - No documents found');
                return {
                    returncode: 404,
                    message: "Document Not Found",
                    output: []
                };
            }
            return {
                returncode: 200,
                message: "Data Deleted Successfully",
                output: doc
            };
        } catch (error) {
            console.error('Error in BaseCrud.delete:', error);
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    // Check if document exists
    async exists(filters = {}) {
        try {
            const exists = await this.model.exists(filters);
            return {
                returncode: 200,
                message: exists ? "Document Exists" : "Document Not Found",
                output: !!exists
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: false
            };
        }
    }
    // Count documents
    async count(filters = {}) {
        try {
            const count = await this.model.countDocuments(filters);
            return {
                returncode: 200,
                message: "Count Retrieved Successfully",
                output: count
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: 0
            };
        }
    }
}
}}),
"[externals]/ [external] (mongoose, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("mongoose");

module.exports = mod;
}}),
"[project]/src/app/lib/utils/StringValidator.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>StringValidators)
});
function StringValidators(value) {
    // Ensure the input is a string
    if (typeof value !== "string") {
        return false;
    }
    if (value === null) {
        return true;
    }
    // List of forbidden characters
    const charList = [
        '/',
        '\\',
        '"',
        ';',
        "'",
        '+',
        '`',
        '^'
    ];
    let validationFlag = true;
    // Iterate over each character in the list
    for (let char of charList){
        // Check if the forbidden character is present in the string
        if (value.includes(char)) {
            validationFlag = false;
            break; // Stop checking further once an invalid character is found
        }
    }
    return validationFlag;
}
}}),
"[project]/src/app/lib/models/Reservation.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "ReservationSchema": (()=>ReservationSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (mongoose, cjs)");
;
const ReservationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    Note: {
        type: String,
        default: null
    },
    NoOfPersons: {
        type: Number,
        default: 0
    },
    CustomerId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Customers",
        required: true
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Reservations;
}}),
"[project]/src/app/lib/models/Customers.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "customerSchema": (()=>customerSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Reservation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Reservation.js [app-route] (ecmascript)");
;
;
;
const customerSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    CustomerName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Customer Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Contact: {
        type: String,
        required: false
    },
    Email: {
        type: String,
        required: false
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    EatocoinsWallet: {
        type: Number,
        default: 0
    },
    StreetAddress: {
        type: String,
        required: false
    },
    Apartment: {
        type: String,
        required: false
    },
    City: {
        type: String,
        required: false
    },
    State: {
        type: String,
        required: false
    },
    Landmark: {
        type: String,
        required: false
    },
    ZipCode: {
        type: String,
        required: false
    },
    Birthday: {
        type: String,
        required: false
    },
    Anniversary: {
        type: String,
        required: false
    },
    // Child Relationship
    Bills: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
            ref: "Bills"
        }
    ],
    Reservation: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
            ref: "Reservations"
        }
    ]
}, {
    timestamps: true
});
// Add pre-remove middleware
customerSchema.pre('remove', async function(next) {
    try {
        // Check for active bills
        const Bills = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Bills');
        const activeBills = await Bills.find({
            CustomerId: this._id,
            Status: 'Open'
        });
        if (activeBills.length > 0) {
            throw new Error('Cannot delete customer with active bills');
        }
        // Update completed bills to remove customer reference
        await Bills.deleteMany({
            CustomerId: this._id
        });
        // Delete any reservations
        const Reservation = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Reservations');
        await Reservation.deleteMany({
            CustomerId: this._id
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
customerSchema.pre('deleteMany', async function(next) {
    try {
        // Get customers to be deleted
        const Customers = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Customers');
        const customers = await Customers.find(this.getFilter());
        const customerIds = customers.map((customer)=>customer._id);
        if (customerIds.length > 0) {
            // Check for active bills
            const Bills = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Bills');
            const activeBills = await Bills.find({
                CustomerId: {
                    $in: customerIds
                },
                Status: 'Open'
            });
            if (activeBills.length > 0) {
                throw new Error('Cannot delete customers with active bills');
            }
            // Update completed bills and delete reservations in parallel
            await Promise.all([
                Bills.deleteMany({
                    CustomerId: {
                        $in: customerIds
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Reservation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].deleteMany({
                    CustomerId: {
                        $in: customerIds
                    }
                })
            ]);
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Customers || __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Customers", customerSchema);
}}),
"[project]/src/app/lib/crud/Customers.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/BaseCrud.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Customers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Customers.js [app-route] (ecmascript)");
;
;
class CustomersCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseCrud"] {
    constructor(){
        super(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Customers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
    }
    async createCustomerBackup({ customer_id = null, customer_name, email, contact, hotel_id, street_address, apartment, city, state, landmark, zip_code, birthday, anniversary }) {
        try {
            const normalizedData = {
                CustomerName: customer_name,
                Email: email || null,
                Contact: contact,
                HotelId: hotel_id,
                // Detailed address fields
                StreetAddress: street_address || null,
                Apartment: apartment || null,
                City: city || null,
                State: state || null,
                Landmark: landmark || null,
                ZipCode: zip_code || null,
                Birthday: birthday || null,
                Anniversary: anniversary || null
            };
            const exists = await this.readOne({
                CustomerName: customer_name,
                Contact: contact,
                HotelId: hotel_id
            });
            customer_id = exists.output._id;
            if (exists.output.length > 0) {
                const updateData = {
                    CustomerName: customer_name,
                    Email: email || null,
                    Contact: contact,
                    StreetAddress: street_address || null,
                    Apartment: apartment || null,
                    City: city || null,
                    State: state || null,
                    Landmark: landmark || null,
                    ZipCode: zip_code || null,
                    Birthday: birthday || null,
                    Anniversary: anniversary || null
                };
                return await this.update(updateData);
            }
            return await this.create(normalizedData);
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async createCustomer(data) {
        try {
            const normalizedData = {
                CustomerName: data.customer_name,
                Email: data.email,
                Contact: data.contact,
                HotelId: data.hotel_id,
                // Detailed address fields
                StreetAddress: data.street_address || null,
                Apartment: data.apartment || null,
                City: data.city || null,
                State: data.state || null,
                Landmark: data.landmark || null,
                ZipCode: data.zip_code || null,
                Birthday: data.birthday || null,
                Anniversary: data.anniversary || null
            };
            const result = await this.create(normalizedData);
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async readCustomers(hotel_id) {
        try {
            const result = await this.readMany({
                HotelId: hotel_id
            });
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async readCustomerDetails(customer_id) {
        try {
            const result = await this.readOne({
                _id: customer_id
            });
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async checkCustomer(customer_name, contact, hotel_id) {
        try {
            const result = await this.readOne({
                CustomerName: customer_name,
                Contact: contact,
                HotelId: hotel_id
            });
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async updateCustomerInfo(data) {
        try {
            const updateData = {
                CustomerName: data.name,
                Email: data.email,
                Contact: data.contact,
                StreetAddress: data.street_address,
                Apartment: data.apartment,
                City: data.city,
                State: data.state,
                Landmark: data.landmark,
                ZipCode: data.zip_code,
                Birthday: data.birthday,
                Anniversary: data.anniversary
            };
            const result = await this.update({
                _id: data.customer_id
            }, updateData, {
                new: true
            });
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async updateWallet(data) {
        try {
            const customer = await this.readOne({
                _id: data.customer_id
            });
            if (customer.returncode !== 200) {
                return customer;
            }
            const updateData = {
                EatocoinsWallet: data.wallet
            };
            const result = await this.update({
                _id: data.customer_id
            }, updateData, {
                new: true
            });
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async deleteCustomers(filter) {
        try {
            // Check if any customers have open bills
            const customers = await this.readMany(filter);
            if (customers.returncode === 200) {
                // If no open bills, proceed with deletion
                const result = await this.delete(filter);
                return result;
            }
            return {
                returncode: 200,
                message: "No Customers Found.",
                output: []
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async doesCustomerExist(hotel_id, email) {
        try {
            const result = await this.readOne({
                HotelId: hotel_id,
                Email: email
            });
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
}
const customersCrud = new CustomersCrud();
const __TURBOPACK__default__export__ = customersCrud;
}}),
"[project]/src/app/api/sync/Customers/pull/controller.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "fetch_customers": (()=>fetch_customers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$Customers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/Customers.js [app-route] (ecmascript)");
;
async function fetch_customers(tokenData) {
    try {
        const hotel_id = await tokenData.hotelId;
        const existing_customers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$Customers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].readCustomers(hotel_id);
        if (existing_customers.returncode === 200 && existing_customers.output.length === 0) {
            return {
                returncode: 409,
                message: "No Tables to be displayed",
                output: []
            };
        }
        return existing_customers;
    } catch (error) {
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
}}),
"[externals]/ [external] (buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("buffer");

module.exports = mod;
}}),
"[externals]/ [external] (stream, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("stream");

module.exports = mod;
}}),
"[externals]/ [external] (util, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("util");

module.exports = mod;
}}),
"[externals]/ [external] (crypto, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("crypto");

module.exports = mod;
}}),
"[project]/src/app/lib/utils/jwt.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "createToken": (()=>createToken),
    "decodeToken": (()=>decodeToken),
    "updateToken": (()=>updateToken),
    "verifyToken": (()=>verifyToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, always use environment variable
const JWT_EXPIRES_IN = '24h';
const createToken = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
};
const verifyToken = (token)=>{
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
const updateToken = (token, newData)=>{
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
        const updatedPayload = {
            ...decoded,
            ...newData
        };
        // Remove the exp claim to generate a fresh expiration
        delete updatedPayload.exp;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(updatedPayload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });
    } catch (error) {
        return null;
    }
};
const decodeToken = (token)=>{
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].decode(token);
    } catch (error) {
        return null;
    }
};
}}),
"[project]/src/app/api/sync/Customers/pull/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$sync$2f$Customers$2f$pull$2f$controller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/sync/Customers/pull/controller.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/jwt.js [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        // Get token from cookie
        const token = request.cookies.get('hotel_auth_token')?.value;
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                returncode: 401,
                message: "No token provided",
                output: []
            }, {
                status: 401,
                statusText: "No token provided"
            });
        }
        // Verify the token
        const userData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!userData) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                returncode: 401,
                message: "Invalid or expired token",
                output: []
            }, {
                status: 401,
                statusText: "Invalid or expired token"
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$sync$2f$Customers$2f$pull$2f$controller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetch_customers"])(userData);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            returncode: result.returncode,
            message: result.message,
            output: result.output
        }, {
            status: result.returncode
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            returncode: 500,
            message: error.message,
            output: []
        }, {
            status: 500
        });
    }
}
}}),
"[project]/ (server-utils)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__5f26c8._.js.map