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
"[project]/src/app/lib/utils/SpecialStringsValidator.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "AttendanceValidator": (()=>AttendanceValidator),
    "ExpenseCategoryValidator": (()=>ExpenseCategoryValidator),
    "OrderTypeValidator": (()=>OrderTypeValidator),
    "PaymentModeValidator": (()=>PaymentModeValidator),
    "PaymentStatusValidator": (()=>PaymentStatusValidator),
    "StockStatusValidator": (()=>StockStatusValidator),
    "SubscriptionStatusValidator": (()=>SubscriptionStatusValidator),
    "TableStatusValidator": (()=>TableStatusValidator)
});
function SubscriptionStatusValidator(value) {
    let validation_flag = false;
    var list = [
        "Waiting",
        "On Going",
        "Expired",
        "About to Expire"
    ];
    list.map((item)=>{
        if (value === item) {
            validation_flag = true;
        }
    });
    return validation_flag;
}
function PaymentStatusValidator(value) {
    let validation_flag = false;
    var list = [
        "Paid",
        "Unpaid",
        "Part-Paid"
    ];
    list.map((item)=>{
        if (value === item) {
            validation_flag = true;
        }
    });
    return validation_flag;
}
function PaymentModeValidator(value) {
    let validation_flag = false;
    var list = [
        "Cash",
        "UPI",
        "Credit-Card",
        "Due",
        "Part"
    ];
    list.map((item)=>{
        if (value === item) {
            validation_flag = true;
        }
    });
    return validation_flag;
}
function OrderTypeValidator(value) {
    let validation_flag = false;
    var list = [
        "Takeaway",
        "Delivery",
        "Dine-In",
        "Swiggy",
        "Zomato",
        "QR-Orders"
    ];
    list.map((item)=>{
        if (value === item) {
            validation_flag = true;
        }
    });
    return validation_flag;
}
function TableStatusValidator(value) {
    let validation_flag = false;
    var list = [
        "Booked",
        "Bill Pending",
        "Open"
    ];
    list.map((item)=>{
        if (value === item) {
            validation_flag = true;
        }
    });
    return validation_flag;
}
function StockStatusValidator(value) {
    let validation_flag = false;
    var list = [
        "Available",
        "Low Stock",
        "Unavailable"
    ];
    list.map((item)=>{
        if (value === item) {
            validation_flag = true;
        }
    });
    return validation_flag;
}
function AttendanceValidator(value) {
    let validation_flag = false;
    var list = [
        "Absent",
        "Present",
        "Half-Day"
    ];
    list.map((item)=>{
        if (value === item) {
            validation_flag = true;
        }
    });
    return validation_flag;
}
function ExpenseCategoryValidator(value) {
    let validation_flag = false;
    var list = [
        "Salary",
        "Purchases",
        "Miscellaneous"
    ];
    list.map((item)=>{
        if (value === item) {
            validation_flag = true;
        }
    });
    return validation_flag;
}
}}),
"[project]/src/app/lib/models/Tables.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "tableSchema": (()=>tableSchema)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [app-route] (ecmascript)");
;
;
;
const tableSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    TableName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Table Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    SectionId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Sections",
        required: true
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    PersonsOccupiable: {
        type: Number,
        default: 4
    },
    Status: {
        type: String,
        default: "Open",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TableStatusValidator"])(value)
        },
        message: "Table Status must be one of:- 'Booked', 'Bill Pending', 'Open'."
    },
    // Child Relationship
    Bills: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
            ref: "Bills"
        }
    ]
}, {
    timestamps: true
});
// Add pre-remove middleware
tableSchema.pre('remove', async function(next) {
    try {
        // Check if table has any active bills
        const Bills = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Bills');
        const activeBills = await Bills.find({
            TableId: this._id,
            Status: 'Open'
        });
        if (activeBills.length > 0) {
            throw new Error('Cannot delete table with active bills');
        }
        // Update completed bills to remove table reference
        await Bills.deleteMany({
            TableId: this._id,
            Status: 'Closed'
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
tableSchema.pre('deleteMany', async function(next) {
    try {
        // Get the tables that will be deleted
        const Tables = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Tables');
        const tables = await Tables.find(this.getFilter());
        const tableIds = tables.map((table)=>table._id);
        // Check for active bills on any table
        const Bills = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Bills');
        const activeBills = await Bills.find({
            TableId: {
                $in: tableIds
            },
            Status: 'Open'
        });
        if (activeBills.length > 0) {
            throw new Error('Cannot delete tables with active bills');
        }
        // Update completed bills to remove table references
        await Bills.deleteMany({
            TableId: {
                $in: tableIds
            }
        });
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Tables || __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Tables", tableSchema);
}}),
"[project]/src/app/lib/models/Bills.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "billsSchema": (()=>billsSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [app-route] (ecmascript)");
;
;
const billsSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    Type: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderTypeValidator"])(value)
        },
        message: "Bill Type must be one of:- 'Takeaway', 'Delivery', 'Dine-In', 'Swiggy', 'Zomato', 'QR-Orders'."
    },
    TableId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Tables"
    },
    WaiterId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Staffs"
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    CustomerId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Customers"
    },
    VatRate: {
        type: String,
        default: "0 %"
    },
    VatAmount: {
        type: Number,
        default: 0.0
    },
    TotalAmount: {
        type: Number,
        default: 0.0
    },
    CGSTRate: {
        type: String,
        default: "0 %"
    },
    SGSTRate: {
        type: String,
        default: "0 %"
    },
    SGSTAmount: {
        type: Number,
        default: 0.0
    },
    CGSTAmount: {
        type: Number,
        default: 0.0
    },
    EatocoinsRate: {
        type: String,
        default: "0 %"
    },
    EatocoinsAmount: {
        type: Number,
        default: 0.0
    },
    MenuTotal: {
        type: Number,
        default: 0.0
    },
    Amount: {
        type: Number,
        default: 0.0
    },
    BalanceAmount: {
        type: Number,
        default: 0.0
    },
    DeliveryChargesRate: {
        type: String,
        default: "0 %"
    },
    DeliveryChargesAmount: {
        type: Number,
        default: 0.0
    },
    DiscountRate: {
        type: String,
        default: "0 %"
    },
    DiscountPrice: {
        type: Number,
        default: 0.0
    },
    PaymentMode: {
        type: String,
        default: "Cash",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PaymentModeValidator"])(value)
        },
        message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
    },
    PaymentStatus: {
        type: String,
        default: "Paid",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PaymentStatusValidator"])(value)
        },
        message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },
    Status: {
        type: String,
        default: "Open",
        validate: {
            validator: (value)=>{
                [
                    "Open",
                    "Closed"
                ].includes(value);
            }
        },
        message: "Bil Status must be either 'Open' or 'Closed'."
    },
    Orders: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
            ref: "Orders"
        }
    ]
}, {
    timestamps: true
});
// Pre-remove middleware for single document
billsSchema.pre('deleteOne', {
    document: true
}, async function(next) {
    try {
        const Orders = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Orders');
        // Delete all related orders
        await Orders.deleteMany({
            BillId: this._id
        });
        // Update table status if exists
        if (this.TableId) {
            const Tables = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Tables');
            await Tables.findByIdAndUpdate(this.TableId, {
                Status: "Available"
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
// Pre-deleteMany middleware for multiple documents
billsSchema.pre('deleteMany', async function(next) {
    try {
        const Bills = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Bills');
        const bills = await Bills.find(this.getFilter());
        if (bills.length > 0) {
            const billIds = bills.map((bill)=>bill._id);
            const tableIds = bills.filter((bill)=>bill.TableId).map((bill)=>bill.TableId);
            // Delete all related orders
            const Orders = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Orders');
            await Orders.deleteMany({
                BillId: {
                    $in: billIds
                }
            });
            // Update table statuses
            if (tableIds.length > 0) {
                const Tables = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Tables');
                await Tables.updateMany({
                    _id: {
                        $in: tableIds
                    }
                }, {
                    Status: "Available"
                });
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Bills || __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Bills", billsSchema);
}}),
"[project]/src/app/lib/crud/Tables.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/BaseCrud.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Tables$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Tables.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Bills$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Bills.js [app-route] (ecmascript)");
;
;
;
class TablesCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseCrud"] {
    constructor(){
        super(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Tables$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
    }
    async createTable(data) {
        try {
            const normalizedData = {
                TableName: data.table_name,
                PersonsOccupiable: data.persons_occupiable,
                Status: "Open",
                HotelId: data.hotel_id,
                SectionId: data.section_id
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
    async readTables(hotel_id) {
        try {
            const result = await this.readMany({
                HotelId: hotel_id
            }, {
                populate: [
                    {
                        path: 'SectionId',
                        select: 'SectionName Type'
                    }
                ]
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
    async readTable(table_id) {
        try {
            const result = await this.readOne({
                _id: table_id
            }, {
                populate: [
                    {
                        path: 'SectionId',
                        select: 'SectionName Type'
                    }
                ]
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
    async readTablesBySection(section_id) {
        try {
            const result = await this.readMany({
                SectionId: section_id
            }, {
                populate: [
                    {
                        path: 'SectionId',
                        select: 'SectionName Type Floor'
                    }
                ]
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
    async updateTableInfo(data) {
        try {
            const updateData = {
                TableName: data.table_name,
                Capacity: data.capacity
            };
            const result = await this.update({
                _id: data.table_id
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
    async updateTableStatus(data) {
        try {
            // If setting to occupied, check if there are any open bills
            if (data.status === "Occupied") {
                const openBills = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Bills$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                    TableId: data.table_id,
                    Status: "Open"
                });
                if (!openBills) {
                    return {
                        returncode: 400,
                        message: "Cannot occupy table without an open bill",
                        output: []
                    };
                }
            }
            const updateData = {
                Status: data.status
            };
            const result = await this.update({
                _id: data.table_id
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
    async updateTableSection(data) {
        try {
            // Check if table has any open bills before moving to new section
            const openBills = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Bills$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                TableId: data.table_id,
                Status: "Open"
            });
            if (openBills) {
                return {
                    returncode: 400,
                    message: "Cannot move table with open bills to a new section",
                    output: []
                };
            }
            const updateData = {
                SectionId: data.section_id
            };
            const result = await this.update({
                _id: data.table_id
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
    async moveTablesBetweenSections(from_section_id, to_section_id) {
        try {
            // Check if any tables in the section have open bills
            const tablesWithBills = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Bills$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                Status: "Open",
                TableId: {
                    $in: (await this.readMany({
                        SectionId: from_section_id
                    })).output.map((t)=>t._id)
                }
            });
            if (tablesWithBills) {
                return {
                    returncode: 400,
                    message: "Cannot move tables with open bills to a new section",
                    output: []
                };
            }
            const result = await this.update({
                SectionId: from_section_id
            }, {
                SectionId: to_section_id
            }, {
                new: true,
                multi: true
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
    async deleteTables(filter) {
        try {
            // Check if any tables are currently in use
            const tables = await this.readMany(filter);
            if (tables.returncode === 200) {
                for (const table of tables.output){
                    const openBills = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Bills$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                        TableId: table._id,
                        Status: "Open"
                    });
                    if (openBills) {
                        return {
                            returncode: 400,
                            message: `Table ${table.TableName} has open bills and cannot be deleted`,
                            output: []
                        };
                    }
                }
                // If no open bills, proceed with deletion
                const result = await this.delete(filter);
                return result;
            }
            return tables;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async doesTableExists(hotel_id, table_name) {
        try {
            const result = await this.readOne({
                HotelId: hotel_id,
                TableName: table_name
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
const tablesCrud = new TablesCrud();
const __TURBOPACK__default__export__ = tablesCrud;
}}),
"[project]/src/app/api/sync/Tables/pull/controller.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "fetch_tables": (()=>fetch_tables)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$Tables$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/Tables.js [app-route] (ecmascript)");
;
async function fetch_tables(tokenData) {
    try {
        const hotel_id = await tokenData.hotelId;
        const existing_tables = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$Tables$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].readTables(hotel_id);
        if (existing_tables.returncode === 200 && existing_tables.output.length === 0) {
            return {
                returncode: 409,
                message: "No Tables to be displayed",
                output: []
            };
        }
        return existing_tables;
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
"[project]/src/app/api/sync/Tables/pull/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$sync$2f$Tables$2f$pull$2f$controller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/sync/Tables/pull/controller.js [app-route] (ecmascript)");
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
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$sync$2f$Tables$2f$pull$2f$controller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetch_tables"])(userData);
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

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__ec42c3._.js.map