(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__b9e20c._.js", {

"[project]/src/app/lib/db.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
;
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27017/admin?authSource=admin';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
}
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    if (cached.conn) {
        console.log("This is Existing connection");
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log('Db connected');
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    console.log("This is New connection");
    return cached.conn;
}
const __TURBOPACK__default__export__ = dbConnect;
}}),
"[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/src/app/lib/models/Bills.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "billsSchema": (()=>billsSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
;
;
const billsSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Type: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["OrderTypeValidator"])(value)
        },
        message: "Bill Type must be one of:- 'Takeaway', 'Delivery', 'Dine-In', 'Swiggy', 'Zomato', 'QR-Orders'."
    },
    TableId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Tables"
    },
    WaiterId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Staffs"
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    CustomerId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
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
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["PaymentModeValidator"])(value)
        },
        message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
    },
    PaymentStatus: {
        type: String,
        default: "Paid",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["PaymentStatusValidator"])(value)
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
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
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
        const Orders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders');
        // Delete all related orders
        await Orders.deleteMany({
            BillId: this._id
        });
        // Update table status if exists
        if (this.TableId) {
            const Tables = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Tables');
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
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
        const bills = await Bills.find(this.getFilter());
        if (bills.length > 0) {
            const billIds = bills.map((bill)=>bill._id);
            const tableIds = bills.filter((bill)=>bill.TableId).map((bill)=>bill.TableId);
            // Delete all related orders
            const Orders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders');
            await Orders.deleteMany({
                BillId: {
                    $in: billIds
                }
            });
            // Update table statuses
            if (tableIds.length > 0) {
                const Tables = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Tables');
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
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Bills || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Bills", billsSchema);
}}),
"[project]/src/app/lib/models/CashDrawer.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "cashDrawerSchema": (()=>cashDrawerSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
;
const cashDrawerSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    OpeningBalance: {
        type: Number,
        default: 0.0
    },
    ClosingBalance: {
        type: Number,
        default: 0.0
    },
    TotalSales: {
        type: Number,
        required: false
    },
    SalesAmount: {
        type: Number,
        default: 0.0
    },
    DroppedCash: {
        type: Number,
        default: 0.0
    },
    CashWithdrawn: {
        type: Number,
        default: 0.0
    },
    Refunds: {
        type: Number,
        default: 0.0
    },
    TotalExpenses: {
        type: Number,
        required: false
    },
    ExpensesAmount: {
        type: Number,
        default: 0.0
    },
    Date: {
        type: String,
        required: false
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.CashDrawer;
}}),
"[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/src/app/lib/models/Reservation.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "ReservationSchema": (()=>ReservationSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
;
const ReservationSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
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
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Customers",
        required: true
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Reservations;
}}),
"[project]/src/app/lib/models/Customers.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "customerSchema": (()=>customerSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Reservation$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Reservation.js [instrumentation] (ecmascript)");
;
;
;
const customerSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    CustomerName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
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
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
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
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "Bills"
        }
    ],
    Reservation: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
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
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
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
        const Reservation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Reservations');
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
        const Customers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Customers');
        const customers = await Customers.find(this.getFilter());
        const customerIds = customers.map((customer)=>customer._id);
        if (customerIds.length > 0) {
            // Check for active bills
            const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
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
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Reservation$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].deleteMany({
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
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Customers || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Customers", customerSchema);
}}),
"[project]/src/app/lib/models/Dishes.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "dishesSchema": (()=>dishesSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
;
;
const dishesSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    DishName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Dish Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Code: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        default: null
    },
    Type: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Dish Type should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    CategoryId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "MenuCategory",
        required: true
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    // Child Relationship
    Menus: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "Menus"
        }
    ]
}, {
    timestamps: true
});
// Unique constraint on HotelId and Code
dishesSchema.index({
    HotelId: 1,
    Code: 1
}, {
    unique: true
});
// Add pre-remove middleware
dishesSchema.pre('remove', async function(next) {
    try {
        const Menus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Menus');
        const Orders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders');
        // Check if dish has any active orders
        const activeOrders = await Orders.find({
            'Items.DishId': this._id,
            Status: {
                $in: [
                    'Pending',
                    'Processing',
                    'Ready'
                ]
            }
        });
        if (activeOrders.length > 0) {
            throw new Error('Cannot delete dish with active orders');
        }
        // Delete all related menus
        await Menus.deleteMany({
            DishId: this._id
        });
        // Update completed orders to mark deleted dishes
        await Orders.updateMany({
            'Items.DishId': this._id,
            Status: 'Completed'
        }, {
            $set: {
                'Items.$[elem].Deleted': true
            }
        }, {
            arrayFilters: [
                {
                    'elem.DishId': this._id
                }
            ]
        });
        // Remove from MenuCategory's Dishes array
        const MenuCategory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('MenuCategory');
        await MenuCategory.updateMany({
            Dishes: this._id
        }, {
            $pull: {
                Dishes: this._id
            }
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
dishesSchema.pre('deleteMany', async function(next) {
    try {
        const Dishes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Dishes');
        const dishes = await Dishes.find(this.getFilter());
        const dishIds = dishes.map((dish)=>dish._id);
        if (dishIds.length > 0) {
            const [Orders, Menus, MenuCategory] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders'),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Menus'),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('MenuCategory')
            ]);
            // Check for active orders
            const activeOrders = await Orders.find({
                'Items.DishId': {
                    $in: dishIds
                },
                Status: {
                    $in: [
                        'Pending',
                        'Processing',
                        'Ready'
                    ]
                }
            });
            if (activeOrders.length > 0) {
                throw new Error('Cannot delete dishes with active orders');
            }
            // Run cleanup operations in parallel
            await Promise.all([
                // Delete related menus
                Menus.deleteMany({
                    DishId: {
                        $in: dishIds
                    }
                }),
                // Update completed orders
                Orders.updateMany({
                    'Items.DishId': {
                        $in: dishIds
                    },
                    Status: 'Completed'
                }, {
                    $unset: {
                        ItemId: 1
                    }
                }),
                // Remove from MenuCategory's Dishes arrays
                MenuCategory.updateMany({
                    Dishes: {
                        $in: dishIds
                    }
                }, {
                    $pull: {
                        Dishes: {
                            $in: dishIds
                        }
                    }
                })
            ]);
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Dishes || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Dishes", dishesSchema);
}}),
"[project]/src/app/lib/utils/BooleanValidator.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>BooleanValidator)
});
function BooleanValidator(value) {
    if (typeof value != "boolean") {
        return false;
    } else {
        return true;
    }
}
}}),
"[project]/src/app/lib/models/EatoCoinsSettings.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "eatocoinsSettingsSchema": (()=>eatocoinsSettingsSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/BooleanValidator.js [instrumentation] (ecmascript)");
;
;
const eatocoinsSettingsSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Visibility: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Visibility should be either true or false"
    },
    CreditLimitAmt: {
        type: Number,
        default: 0
    },
    CreditLimitPercent: {
        type: Number,
        default: 0
    },
    RedeemLimitAmount: {
        type: Number,
        default: 0
    },
    RedeemLimitPercent: {
        type: Number,
        default: 0
    },
    Rate: {
        type: Number,
        default: 0
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.EatocoinsSettings || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("EatocoinsSettings", eatocoinsSettingsSchema);
}}),
"[project]/src/app/lib/models/EbillEmailSettings.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "ebillEmailSettingsSchema": (()=>ebillEmailSettingsSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/BooleanValidator.js [instrumentation] (ecmascript)");
;
;
const ebillEmailSettingsSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Visibility: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Visibility should be either true or false"
    },
    Email: {
        type: String,
        default: null
    },
    AppPassword: {
        type: String,
        default: null
    },
    UPIID: {
        type: String,
        default: null
    },
    MerchantName: {
        type: String,
        default: null
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.EbillEmailSettings;
}}),
"[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>FloatValidator)
});
function FloatValidator(value) {
    // First convert to number if it's a string
    const num = typeof value === 'string' ? Number(value) : value;
    // Check if it's a valid number and greater than 0
    return !isNaN(num) && num > 0;
}
}}),
"[project]/src/app/lib/models/Expenses.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "expensesSchema": (()=>expensesSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)");
;
;
;
;
const expensesSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    ExpenseName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["ExpenseCategoryValidator"])(value)
        },
        message: "Expense Category must be one of:- 'Salary', 'Purchases', 'Miscellaneous'."
    },
    Note: {
        type: String
    },
    Date: {
        type: String,
        required: true
    },
    PayableTo: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Bearer Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    AmountPayable: {
        type: Number,
        default: 0.0
    },
    AmountPaid: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Amount Paid must be a non-negative number."
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    PaymentMode: {
        type: String,
        default: "Cash",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["PaymentModeValidator"])(value)
        },
        message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
    },
    PaymentStatus: {
        type: String,
        default: "Paid",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["PaymentStatusValidator"])(value)
        },
        message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },
    Cash: {
        type: Number,
        default: 0.0
    },
    UPI: {
        type: Number,
        default: 0.0
    },
    CreditCard: {
        type: Number,
        default: 0.0
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Expenses;
}}),
"[project]/src/app/lib/models/GstSettings.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "gstSettingsSchema": (()=>gstSettingsSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/BooleanValidator.js [instrumentation] (ecmascript)");
;
;
const gstSettingsSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Visibility: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Visibility should be either true or false"
    },
    GSTPercent: {
        type: Number,
        default: 0.0
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
// Add pre-remove middleware
gstSettingsSchema.pre('remove', async function(next) {
    try {
        // Update all bills to remove GST references
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
        await Bills.updateMany({
            HotelId: this.HotelId
        }, {
            $set: {
                CGSTRate: '0 %',
                SGSTRate: '0 %',
                CGSTAmount: 0,
                SGSTAmount: 0
            }
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
gstSettingsSchema.pre('deleteMany', async function(next) {
    try {
        // Get the settings that will be deleted
        const GstSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('GstSettings');
        const settings = await GstSettings.find(this.getFilter());
        const hotelIds = settings.map((setting)=>setting.HotelId);
        if (hotelIds.length > 0) {
            // Update all bills to remove GST references
            const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
            await Bills.updateMany({
                HotelId: {
                    $in: hotelIds
                }
            }, {
                $set: {
                    CGSTRate: '0 %',
                    SGSTRate: '0 %',
                    CGSTAmount: 0,
                    SGSTAmount: 0
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.GstSettings || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("GstSettings", gstSettingsSchema);
}}),
"[project]/src/app/lib/models/HotelSubscription.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "HotelSubscriptionSchema": (()=>HotelSubscriptionSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/BooleanValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
;
;
;
const HotelSubscriptionSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    SubscriptionId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Subscriptions",
        required: true
    },
    isValid: {
        type: Boolean,
        default: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "isValid should be either true or false"
    },
    StartDate: {
        type: String,
        required: true
    },
    EndDate: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        default: "On Going",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubscriptionStatusValidator"])(value)
        },
        message: "Status must be one of:- 'Waiting', 'On Going', 'Expired', 'About to Expire'."
    },
    PaymentStatus: {
        type: String,
        default: "Paid",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["PaymentStatusValidator"])(value)
        },
        message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },
    PaymentMode: {
        type: String,
        default: "Cash",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["PaymentModeValidator"])(value)
        },
        message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
    },
    Cash: {
        type: Number,
        default: 0.0
    },
    UPI: {
        type: Number,
        default: 0.0
    },
    CreditCard: {
        type: Number,
        default: 0.0
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.HotelSubscription;
}}),
"[externals]/ [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:buffer");

module.exports = mod;
}}),
"[project]/src/app/lib/models/Hotels.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "HotelSchema": (()=>HotelSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (node:buffer, cjs)");
;
;
const HotelSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    HotelName: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "HotelName should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Email should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Address: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Address should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Logo: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"]
    },
    Speciality: {
        type: [
            String
        ],
        default: []
    },
    Contacts: {
        type: [
            String
        ],
        default: []
    },
    Website: {
        type: String,
        default: "https://example.com"
    },
    FSSAICode: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "FSSAICode should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    GSTIN: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "GSTIN should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    }
}, {
    timestamps: true
});
// Add pre-remove middleware
HotelSchema.pre('remove', async function(next) {
    try {
        // Get all model references
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
        const Sections = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Sections');
        const MenuCategory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('MenuCategory');
        const Suppliers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Suppliers');
        const ItemCategories = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('ItemCategories');
        const Staffs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Staffs');
        const Reservations = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Reservations');
        const CashDrawer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('CashDrawer');
        const GstSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('GstSettings');
        const VatSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('VatSettings');
        const KotPrinterSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('KotPrinterSettings');
        const InvoicePrinterSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('InvoicePrinterSettings');
        const EbillEmailSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('EbillEmailSettings');
        // Delete all related data in parallel
        await Promise.all([
            // Delete Multi-level Operational Data
            Bills.deleteMany({
                HotelId: this._id
            }),
            Sections.deleteMany({
                HotelId: this._id
            }),
            MenuCategory.deleteMany({
                HotelId: this._id
            }),
            Suppliers.deleteMany({
                HotelId: this._id
            }),
            ItemCategories.deleteMany({
                HotelId: this._id
            }),
            Staffs.deleteMany({
                HotelId: this._id
            }),
            // Delete Single-level Operational Data
            Reservations.deleteMany({
                HotelId: this._id
            }),
            CashDrawer.deleteMany({
                HotelId: this._id
            }),
            // Delete settings
            GstSettings.deleteMany({
                HotelId: this._id
            }),
            VatSettings.deleteMany({
                HotelId: this._id
            }),
            KotPrinterSettings.deleteMany({
                HotelId: this._id
            }),
            InvoicePrinterSettings.deleteMany({
                HotelId: this._id
            }),
            EbillEmailSettings.deleteMany({
                HotelId: this._id
            })
        ]);
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
HotelSchema.pre('deleteMany', async function(next) {
    try {
        // Get the hotels that will be deleted
        const Hotels = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Hotels');
        const hotels = await Hotels.find(this.getFilter());
        const hotelIds = hotels.map((hotel)=>hotel._id);
        if (hotelIds.length > 0) {
            // Multi-level
            const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
            const Sections = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Sections');
            const MenuCategory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('MenuCategory');
            const Suppliers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Suppliers');
            const Staffs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Staffs');
            const Customers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Customers');
            // Single-Level
            const Reservations = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Reservations');
            const CashDrawer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('CashDrawer');
            const Expenses = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Expenses');
            // Delete settings
            const GstSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('GstSettings');
            const VatSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('VatSettings');
            const KotPrinterSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('KotPrinterSettings');
            const InvoicePrinterSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('InvoicePrinterSettings');
            const EbillEmailSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('EbillEmailSettings');
            const Notifications = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Notifications');
            // Delete all related data in parallel
            await Promise.all([
                // Multi-level
                Bills.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                Sections.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                MenuCategory.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                Suppliers.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                Staffs.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                Customers.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                // Single-Level
                Reservations.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                CashDrawer.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                Expenses.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                // Delete settings
                GstSettings.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                VatSettings.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                KotPrinterSettings.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                InvoicePrinterSettings.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                EbillEmailSettings.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                }),
                Notifications.deleteMany({
                    HotelId: {
                        $in: hotelIds
                    }
                })
            ]);
        }
        next();
    } catch (error) {
        next(error);
    }
});
const Hotels = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Hotels || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Hotels", HotelSchema);
const __TURBOPACK__default__export__ = Hotels;
}}),
"[project]/src/app/lib/models/InventoryStock.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "inventoryStockSchema": (()=>inventoryStockSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
;
;
;
;
const inventoryStockSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    ItemId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Items",
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Quantity must be a non-negative number."
    },
    Unit: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Unit should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Status: {
        type: String,
        default: "Available",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["StockStatusValidator"])(value)
        },
        message: "Stock Status must be one of:- 'Available', 'Low Stock', 'Unavailable'."
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.InventoryStock;
}}),
"[project]/src/app/lib/models/InvoicePrinterSettings.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "invoicePrinterSettingsSchema": (()=>invoicePrinterSettingsSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/BooleanValidator.js [instrumentation] (ecmascript)");
;
;
const invoicePrinterSettingsSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Visibility: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Visibility should be either true or false"
    },
    NetworkIP: {
        type: String,
        default: null
    },
    Encoding: {
        type: String,
        default: null
    },
    BluetoothMac: {
        type: String,
        default: null
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true,
        unique: true
    },
    Status: {
        type: String,
        default: "Active"
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.InvoicePrinterSettings;
}}),
"[project]/src/app/lib/models/ItemCategories.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "itemCategorySchema": (()=>itemCategorySchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
;
;
const itemCategorySchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    CategoryName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Category Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Unit: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Unit should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    // Child Relationship
    Items: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "Items"
        }
    ]
}, {
    timestamps: true
});
// Unique constraint on HotelId and CategoryName
itemCategorySchema.index({
    HotelId: 1,
    CategoryName: 1
}, {
    unique: true
});
// Add pre-remove middleware
itemCategorySchema.pre('remove', async function(next) {
    try {
        // Delete all items in this category
        const Items = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Items');
        await Items.deleteMany({
            CategoryId: this._id
        });
        // Update inventory stock to remove category reference
        const InventoryStock = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('InventoryStock');
        await InventoryStock.updateMany({
            CategoryId: this._id
        }, {
            $unset: {
                CategoryId: 1
            }
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
itemCategorySchema.pre('deleteMany', async function(next) {
    try {
        // Get categories to be deleted
        const ItemCategories = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('ItemCategories');
        const categories = await ItemCategories.find(this.getFilter());
        const categoryIds = categories.map((category)=>category._id);
        if (categoryIds.length > 0) {
            // Run cleanup operations in parallel
            await Promise.all([
                // Delete all items in these categories
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Items').deleteMany({
                    CategoryId: {
                        $in: categoryIds
                    }
                }),
                // Update inventory stock to remove category references
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('InventoryStock').updateMany({
                    CategoryId: {
                        $in: categoryIds
                    }
                }, {
                    $unset: {
                        CategoryId: 1
                    }
                })
            ]);
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.ItemCategories || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("ItemCategories", itemCategorySchema);
}}),
"[project]/src/app/lib/models/Items.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "itemSchema": (()=>itemSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
;
;
const itemSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    ItemName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Item Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    CategoryId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "ItemCategory",
        required: true
    },
    // Child Relationship
    InventoryStock: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "InventoryStock"
        }
    ],
    PurchasedStock: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "PurchasedStock"
        }
    ],
    StockReport: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "StockReport"
        }
    ]
}, {
    timestamps: true
});
// Add pre-remove middleware
itemSchema.pre('remove', async function(next) {
    try {
        // Check for and delete inventory stock
        const InventoryStock = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('InventoryStock');
        await InventoryStock.deleteMany({
            ItemId: this._id
        });
        // Delete purchased stock records
        const PurchasedStock = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedStock');
        await PurchasedStock.deleteMany({
            ItemId: this._id
        });
        // Delete stock reports
        const StockReport = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('StockReport');
        await StockReport.deleteMany({
            ItemId: this._id
        });
        // Update purchased invoices to remove item reference
        const PurchasedInvoice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedInvoice');
        await PurchasedInvoice.updateMany({
            ItemId: this._id
        }, {
            $unset: {
                ItemId: 1
            }
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
itemSchema.pre('deleteMany', async function(next) {
    try {
        // Get items to be deleted
        const Items = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Items');
        const items = await Items.find(this.getFilter());
        const itemIds = items.map((item)=>item._id);
        if (itemIds.length > 0) {
            // Run cleanup operations in parallel
            await Promise.all([
                // Delete inventory records
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('InventoryStock').deleteMany({
                    ItemId: {
                        $in: itemIds
                    }
                }),
                // Delete purchased stock records
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedStock').deleteMany({
                    ItemId: {
                        $in: itemIds
                    }
                }),
                // Delete stock reports
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('StockReport').deleteMany({
                    ItemId: {
                        $in: itemIds
                    }
                }),
                // Update purchased invoices
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedInvoice').updateMany({
                    ItemId: {
                        $in: itemIds
                    }
                }, {
                    $unset: {
                        ItemId: 1
                    }
                })
            ]);
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Items || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Items", itemSchema);
}}),
"[project]/src/app/lib/models/KotPrinterSettings.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "kotPrinterSettingsSchema": (()=>kotPrinterSettingsSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/BooleanValidator.js [instrumentation] (ecmascript)");
;
;
const kotPrinterSettingsSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Visibility: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Visibility should be either true or false"
    },
    NetworkIP: {
        type: String,
        default: null
    },
    Encoding: {
        type: String,
        default: null
    },
    BluetoothMac: {
        type: String,
        default: null
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true,
        unique: true
    },
    Status: {
        type: String,
        default: "Active"
    }
}, {
    timestamps: true
});
// Add pre-remove middleware
kotPrinterSettingsSchema.pre('remove', async function(next) {
    try {
        // Since printer settings are critical, we should verify no active orders exist
        const Orders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders');
        const activeOrders = await Orders.find({
            HotelId: this.HotelId,
            Status: {
                $in: [
                    'Ordered',
                    'Accepted'
                ]
            }
        });
        if (activeOrders.length > 0) {
            throw new Error('Cannot delete KOT printer settings while active orders exist');
        }
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
kotPrinterSettingsSchema.pre('deleteMany', async function(next) {
    try {
        // Get the settings that will be deleted
        const KotPrinterSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('KotPrinterSettings');
        const settings = await KotPrinterSettings.find(this.getFilter());
        const hotelIds = settings.map((setting)=>setting.HotelId);
        if (hotelIds.length > 0) {
            // Check for active orders
            const Orders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders');
            const activeOrders = await Orders.find({
                HotelId: {
                    $in: hotelIds
                },
                Status: {
                    $in: [
                        'Ordered',
                        'Accepted'
                    ]
                }
            });
            if (activeOrders.length > 0) {
                throw new Error('Cannot delete KOT printer settings while active orders exist');
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.KotPrinterSettings || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("KotPrinterSettings", kotPrinterSettingsSchema);
}}),
"[project]/src/app/lib/models/MenuCategory.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "menuCategorySchema": (()=>menuCategorySchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
;
;
const menuCategorySchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    CategoryName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Category Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    // Child Relationship
    Dishes: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "Dishes"
        }
    ]
}, {
    timestamps: true
});
// Unique constraint on HotelId and CategoryName
menuCategorySchema.index({
    HotelId: 1,
    CategoryName: 1
}, {
    unique: true
});
// Add pre-remove middleware
menuCategorySchema.pre('remove', async function(next) {
    try {
        // Check if dish has any active menus
        const Dishes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Dishes');
        const activeDishes = await Dishes.find({
            CategoryId: this._id
        });
        if (activeDishes.length > 0) {
            // Delete all related menus first
            await Dishes.deleteMany({
                CategoryId: this._id
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
menuCategorySchema.pre('deleteMany', async function(next) {
    try {
        // Get the dishes that will be deleted
        const Categories = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('MenuCategory');
        const categories = await Categories.find(this.getFilter());
        const Ids = categories.map((category)=>category._id);
        // Delete all related menus
        if (Ids.length > 0) {
            const Dishes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Dishes');
            await Dishes.deleteMany({
                CategoryId: {
                    $in: Ids
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.MenuCategory;
}}),
"[project]/src/app/lib/models/Menus.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "menusSchema": (()=>menusSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)");
;
;
const menusSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    SectionId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Sections",
        required: true
    },
    DishId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Dishes",
        required: true
    },
    Price: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Price must be a non-negative number and must be in decimal format(100.00)."
    },
    // Child Relationship
    Menu: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "Orders"
        }
    ]
}, {
    timestamps: true
});
// Unique constraint on SectionId and DishId
menusSchema.index({
    SectionId: 1,
    DishId: 1
}, {
    unique: true
});
// Add pre-remove middleware
menusSchema.pre('remove', async function(next) {
    try {
        // Delete all related orders
        const Orders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders');
        await Orders.deleteMany({
            MenuId: this._id
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
menusSchema.pre('deleteMany', async function(next) {
    try {
        // Get the menus that will be deleted
        const Menus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Menus');
        const menus = await Menus.find(this.getFilter());
        // Get all menu IDs
        const menuIds = menus.map((menu)=>menu._id);
        // Delete all related orders
        if (menuIds.length > 0) {
            const Orders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders');
            await Orders.deleteMany({
                MenuId: {
                    $in: menuIds
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Menus || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Menus", menusSchema);
}}),
"[project]/src/app/lib/models/Notifications.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "notificationSchema": (()=>notificationSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
;
const notificationSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    Type: {
        type: String,
        default: "Unread"
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
// Unique constraint on HotelId and Description
notificationSchema.index({
    HotelId: 1,
    Description: 1
}, {
    unique: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Notifications;
}}),
"[project]/src/app/lib/models/Orders.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "ordersSchema": (()=>ordersSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)");
;
;
const ordersSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Quantity: {
        type: Number,
        required: true,
        min: [
            1,
            'Quantity must be at least 1'
        ],
        validate: {
            validator: function(value) {
                return !isNaN(value) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value);
            },
            message: (props)=>`${props.value} is not a valid quantity. Quantity must be a positive number.`
        }
    },
    Note: {
        type: String,
        default: null
    },
    TotalAmount: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Total Amount must be a non-negative number."
    },
    MenuId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Menus",
        required: true
    },
    BillId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Bills",
        required: true
    },
    Status: {
        type: String,
        default: "Ordered",
        validate: {
            validator: (value)=>{
                return [
                    "Ordered",
                    "Done",
                    "Accepted",
                    "Rejected",
                    "Cancelled"
                ].includes(value);
            }
        },
        message: "Status must be one of: 'Ordered', 'Done', 'Accepted', 'Rejected', 'Cancelled'."
    },
    Reason: {
        type: String,
        default: null
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    }
}, {
    timestamps: true
});
// Pre-remove middleware for single document
ordersSchema.pre('deleteOne', {
    document: true
}, async function(next) {
    try {
        // Update menu if needed
        if (this.MenuId) {
            const Menus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Menus');
            await Menus.findByIdAndUpdate(this.MenuId, {
                $pull: {
                    Orders: this._id
                }
            });
        }
        // Update bill if needed
        if (this.BillId) {
            const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
            await Bills.findByIdAndUpdate(this.BillId, {
                $pull: {
                    Orders: this._id
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
// Pre-deleteMany middleware for multiple documents
ordersSchema.pre('deleteMany', async function(next) {
    try {
        const Orders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Orders');
        const orders = await Orders.find(this.getFilter());
        if (orders.length > 0) {
            const menuIds = orders.map((order)=>order.MenuId).filter(Boolean);
            if (menuIds.length > 0) {
                const Menus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Menus');
                await Menus.updateMany({
                    _id: {
                        $in: menuIds
                    }
                }, {
                    $pull: {
                        Orders: {
                            $in: orders.map((order)=>order._id)
                        }
                    }
                });
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Orders || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Orders", ordersSchema);
}}),
"[project]/src/app/lib/models/PurchasedInvoice.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "purchasedInvoiceSchema": (()=>purchasedInvoiceSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
;
;
;
const purchasedInvoiceSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    InvoiceNo: {
        type: String,
        default: null
    },
    Date: {
        type: String,
        required: true
    },
    PaymentMode: {
        type: String,
        default: "Cash",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["PaymentModeValidator"])(value)
        },
        message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
    },
    AmountPaid: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Amount Paid must be a non-negative number."
    },
    BalanceAmount: {
        type: Number,
        default: 0.0
    },
    PaymentStatus: {
        type: String,
        default: "Paid",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["PaymentStatusValidator"])(value)
        },
        message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },
    SupplierId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Suppliers",
        required: true
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    Cash: {
        type: Number,
        default: 0.0
    },
    UPI: {
        type: Number,
        default: 0.0
    },
    CreditCard: {
        type: Number,
        default: 0.0
    },
    // Child Relationship
    Stock: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "PurchasedStock"
        }
    ]
}, {
    timestamps: true
});
// Add pre-remove middleware
purchasedInvoiceSchema.pre('remove', async function(next) {
    try {
        // Check payment status
        if (this.PaymentStatus === 'Unpaid' || this.PaymentStatus === 'Part-Paid') {
            throw new Error('Cannot delete invoice with pending payments');
        }
        // Check for and delete related menus
        const PurchasedStock = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedStock');
        await PurchasedStock.deleteMany({
            InvoiceId: this._id
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
purchasedInvoiceSchema.pre('deleteMany', async function(next) {
    try {
        // Get the sections that will be deleted
        const PurchasedInvoice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedInvoice');
        const invoices = await PurchasedInvoice.find(this.getFilter());
        const invoicesIds = invoices.map((invoice)=>invoice._id);
        if (invoicesIds.length > 0) {
            // Delete all related menus
            const PurchasedStock = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedStock');
            await PurchasedStock.deleteMany({
                InvoiceId: {
                    $in: invoicesIds
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.PurchasedInvoice;
}}),
"[project]/src/app/lib/models/PurchasedStock.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "purchasedStockSchema": (()=>purchasedStockSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)");
;
;
const purchasedStockSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    InvoiceId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "PurchasedInvoice",
        required: true
    },
    ItemId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Items",
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Quantity must be a non-negative number."
    },
    UnitPrice: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Unit Price must be a non-negative number."
    },
    TotalPrice: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Total Price must be a non-negative number."
    }
}, {
    timestamps: true
});
// Pre-remove middleware for single document
purchasedStockSchema.pre('deleteOne', {
    document: true
}, async function(next) {
    try {
        // Update menu if needed
        if (this.InvoiceId) {
            const PurchasedInvoice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedInvoice');
            await PurchasedInvoice.findByIdAndUpdate(this.InvoiceId, {
                $pull: {
                    Stock: this._id
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
// Pre-deleteMany middleware for multiple documents
purchasedStockSchema.pre('deleteMany', async function(next) {
    try {
        const PurchasedStock = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedStock');
        const stock = await PurchasedStock.find(this.getFilter());
        if (stock.length > 0) {
            const stockIds = stock.map((item)=>item.InvoiceId).filter(Boolean);
            if (stockIds.length > 0) {
                const PurchasedInvoice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedInvoice');
                await PurchasedInvoice.updateMany({
                    _id: {
                        $in: stockIds
                    }
                }, {
                    $pull: {
                        Stock: {
                            $in: stock.map((item)=>item._id)
                        }
                    }
                });
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});
// Unique constraint on InvoiceId and ItemId
purchasedStockSchema.index({
    InvoiceId: 1,
    ItemId: 1
}, {
    unique: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.PurchasedStock;
}}),
"[project]/src/app/lib/models/Sections.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "SectionsSchema": (()=>SectionsSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
;
;
;
const SectionsSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    SectionName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Section Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    Type: {
        type: String,
        default: "Dine-In",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["OrderTypeValidator"])(value)
        },
        message: "Section Type must be one of:- 'Takeaway', 'Delivery', 'Dine-In', 'Swiggy', 'Zomato', 'QR-Orders'."
    },
    // Children Relationship
    Menus: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "Menus"
        }
    ],
    Tables: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "Tables"
        }
    ]
}, {
    timestamps: true
});
// Unique constraint on HotelId and SectionName
SectionsSchema.index({
    HotelId: 1,
    SectionName: 1
}, {
    unique: true
});
// Add pre-remove middleware
SectionsSchema.pre('remove', async function(next) {
    try {
        // Check for and delete related menus
        const Menus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Menus');
        await Menus.deleteMany({
            SectionId: this._id
        });
        // Check for and delete related tables
        const Tables = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Tables');
        await Tables.deleteMany({
            SectionId: this._id
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
SectionsSchema.pre('deleteMany', async function(next) {
    try {
        // Get the sections that will be deleted
        const Sections = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Sections');
        const sections = await Sections.find(this.getFilter());
        const sectionIds = sections.map((section)=>section._id);
        if (sectionIds.length > 0) {
            // Delete all related menus
            const Menus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Menus');
            await Menus.deleteMany({
                SectionId: {
                    $in: sectionIds
                }
            });
            // Update tables to remove section references
            const Tables = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Tables');
            await Tables.deleteMany({
                SectionId: {
                    $in: sectionIds
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Sections || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Sections", SectionsSchema);
}}),
"[project]/src/app/lib/models/StaffAttendance.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "staffAttendanceSchema": (()=>staffAttendanceSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
;
;
const staffAttendanceSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Date: {
        type: String,
        required: true
    },
    Arrival: {
        type: String,
        default: "09:00 AM"
    },
    Departure: {
        type: String,
        default: "05:00 PM"
    },
    Type: {
        type: String,
        default: "Absent",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["AttendanceValidator"])(value)
        },
        message: "Attendance must be one of:- 'Present', 'Absent', 'Half-Day'."
    },
    Note: {
        type: String,
        default: null
    },
    StaffId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Staffs",
        required: true
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels"
    }
}, {
    timestamps: true
});
// Unique constraint on InvoiceId and ItemId
staffAttendanceSchema.index({
    Date: 1,
    StaffId: 1
}, {
    unique: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.StaffAttendance || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('StaffAttendance', staffAttendanceSchema);
}}),
"[project]/src/app/lib/models/Staffs.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "staffSchema": (()=>staffSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/bcryptjs/dist/bcrypt.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
;
;
;
const staffSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    FirstName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "First Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    LastName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Last Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Address: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Address should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Contact: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Contact should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Email should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    SaltPassword: {
        type: String,
        required: true
    },
    DepartmentName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Department Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Designation: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Designation should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Salary: {
        type: Number,
        default: 0.0
    },
    Incentive: {
        type: Number,
        default: 0.0
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels"
    },
    Role: {
        type: String,
        required: true,
        enum: [
            'Owner',
            'Backoffice',
            'Waiter'
        ],
        default: 'Waiter',
        validate: {
            validator: (value)=>{
                return value === "Owner" || value === "Backoffice" || value === "Waiter";
            }
        },
        message: "Role should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    }
}, {
    timestamps: true
});
// Unique constraint on InvoiceId and ItemId
staffSchema.index({
    Contact: 1,
    HotelId: 1
}, {
    unique: true
});
staffSchema.index({
    Email: 1,
    HotelId: 1
}, {
    unique: true
});
// Instance methods
staffSchema.methods = {
    authenticate: async function(plainText) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].compare(plainText, this.Password);
    }
};
// Pre-save hook to hash password
staffSchema.pre('save', async function(next) {
    try {
        if (this.isModified('Password')) {
            const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].genSalt(10);
            this.Password = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].hash(this.Password, salt);
            this.SaltPassword = salt;
        }
        next();
    } catch (error) {
        console.error('Error in pre-save hook:', error);
        next(error);
    }
});
// Pre-delete middleware for single document
staffSchema.pre('deleteOne', {
    document: true
}, async function(next) {
    try {
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
        // Check for active bills
        const activeBills = await Bills.find({
            WaiterId: this._id,
            Status: 'Open'
        });
        if (activeBills.length > 0) {
            throw new Error('Cannot delete staff with active bills');
        }
        // Run cleanup operations in parallel
        await Promise.all([
            Bills.deleteMany({
                WaiterId: this._id
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('StaffAttendance').deleteMany({
                StaffId: this._id
            })
        ]);
        next();
    } catch (error) {
        next(error);
    }
});
// Pre-delete middleware for multiple documents
staffSchema.pre('deleteMany', async function(next) {
    try {
        const Staffs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Staffs');
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
        // Get staff members to be deleted
        const staffMembers = await Staffs.find(this.getFilter());
        if (staffMembers.length > 0) {
            const staffIds = staffMembers.map((staff)=>staff._id);
            // Check for active bills
            const activeBills = await Bills.find({
                WaiterId: {
                    $in: staffIds
                },
                Status: 'Open'
            });
            if (activeBills.length > 0) {
                throw new Error('Cannot delete staff members with active bills');
            }
            // Run cleanup operations in parallel
            await Promise.all([
                Bills.deleteMany({
                    WaiterId: {
                        $in: staffIds
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('StaffAttendance').deleteMany({
                    StaffId: {
                        $in: staffIds
                    }
                })
            ]);
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Staffs || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Staffs", staffSchema);
}}),
"[project]/src/app/lib/models/StockReport.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "StockReportSchema": (()=>StockReportSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)");
;
;
;
;
const StockReportSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    ItemId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Items",
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Quantity must be a non-negative number."
    },
    Unit: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Unit should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Status: {
        type: String,
        default: "Available",
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["StockStatusValidator"])(value)
        },
        message: "Stock Status must be one of:- 'Available', 'Low Stock', 'Unavailable'."
    },
    Date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.StockReport;
}}),
"[project]/src/app/lib/utils/IntegerValidator.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>IntegerValidator)
});
function IntegerValidator(value) {
    return Number(value) === value && value % 1 === 0;
}
}}),
"[project]/src/app/lib/models/Subscription.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "SubscriptionSchema": (()=>SubscriptionSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$IntegerValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/IntegerValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
;
;
;
;
const SubscriptionSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    SubscriptionName: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "SubscriptionName should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Price: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Price must be a non-negative number and must be in decimal format(100.00)."
    },
    Validity: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$IntegerValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Validity must be a non-negative number."
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Subscriptions;
}}),
"[project]/src/app/lib/models/Suppliers.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "supplierSchema": (()=>supplierSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
;
;
const supplierSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    SupplierName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Supplier Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    SupplierType: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Supplier Type should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Contact: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Contact should not contain invalid characters like /, \\, \", ;, ', +, `, or ^ & must be of 10 characters."
    },
    Email: {
        type: String,
        default: null
    },
    GSTIN: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "GSTIN should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Address: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Address should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    // Child Relationship
    StockInvoice: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
            ref: "PurchasedInvoice"
        }
    ]
}, {
    timestamps: true
});
// Unique constraint on HotelId and Contact
supplierSchema.index({
    HotelId: 1,
    Contact: 1
}, {
    unique: true
});
// Add pre-remove middleware
supplierSchema.pre('remove', async function(next) {
    try {
        // Check for and delete related menus
        const PurchasedInvoice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedInvoice');
        await PurchasedInvoice.deleteMany({
            SupplierId: this._id
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
supplierSchema.pre('deleteMany', async function(next) {
    try {
        // Get the sections that will be deleted
        const Suppliers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Suppliers');
        const suppliers = await Suppliers.find(this.getFilter());
        const supplierIds = suppliers.map((supplier)=>supplier._id);
        if (supplierIds.length > 0) {
            // Delete all related menus
            const PurchasedInvoice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('PurchasedInvoice');
            await PurchasedInvoice.deleteMany({
                SupplierId: {
                    $in: supplierIds
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Suppliers;
}}),
"[project]/src/app/lib/models/Tables.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "tableSchema": (()=>tableSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/SpecialStringsValidator.js [instrumentation] (ecmascript)");
;
;
;
const tableSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    TableName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Table Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    SectionId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Sections",
        required: true
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
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
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$SpecialStringsValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["TableStatusValidator"])(value)
        },
        message: "Table Status must be one of:- 'Booked', 'Bill Pending', 'Open'."
    },
    // Child Relationship
    Bills: [
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
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
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
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
        const Tables = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Tables');
        const tables = await Tables.find(this.getFilter());
        const tableIds = tables.map((table)=>table._id);
        // Check for active bills on any table
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
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
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.Tables || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("Tables", tableSchema);
}}),
"[project]/src/app/lib/models/VatSettings.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "vatSettingsSchema": (()=>vatSettingsSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/BooleanValidator.js [instrumentation] (ecmascript)");
;
;
const vatSettingsSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    Visibility: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$BooleanValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Visibility should be either true or false"
    },
    VATPercent: {
        type: Number,
        default: 0.0
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
// Add pre-remove middleware
vatSettingsSchema.pre('remove', async function(next) {
    try {
        // Update all bills to remove VAT references
        const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
        await Bills.updateMany({
            HotelId: this.HotelId
        }, {
            $set: {
                VatRate: '0 %',
                VatAmount: 0
            }
        });
        next();
    } catch (error) {
        next(error);
    }
});
// Add pre-deleteMany middleware
vatSettingsSchema.pre('deleteMany', async function(next) {
    try {
        // Get the settings that will be deleted
        const VatSettings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('VatSettings');
        const settings = await VatSettings.find(this.getFilter());
        const hotelIds = settings.map((setting)=>setting.HotelId);
        if (hotelIds.length > 0) {
            // Update all bills to remove VAT references
            const Bills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('Bills');
            await Bills.updateMany({
                HotelId: {
                    $in: hotelIds
                }
            }, {
                $set: {
                    VatRate: '0 %',
                    VatAmount: 0
                }
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.VatSettings || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model("VatSettings", vatSettingsSchema);
}}),
"[project]/src/app/lib/models/EatofyStaff.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "EatofyStaffSchema": (()=>EatofyStaffSchema),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/bcryptjs/dist/bcrypt.js [instrumentation] (ecmascript)");
;
;
;
const RoleEnums = [
    "Administration",
    "Management",
    "Sales"
];
const EatofyStaffSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].Schema({
    FirstName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value),
            message: "First Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
        }
    },
    LastName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value),
            message: "Last Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
        }
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])(value),
            message: "Email should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
        }
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    Role: {
        type: String,
        default: 'Administration',
        enum: {
            values: RoleEnums,
            message: "Role must be one of: " + RoleEnums.join(", ")
        },
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});
// Instance methods
EatofyStaffSchema.methods = {
    authenticate: async function(plainText) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].compare(plainText, this.Password);
    }
};
// Pre-save hook to hash password
EatofyStaffSchema.pre('save', async function(next) {
    try {
        if (this.isModified('Password')) {
            const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].genSalt(10);
            this.Password = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$dist$2f$bcrypt$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].hash(this.Password, salt);
        }
        next();
    } catch (error) {
        console.error('Error in pre-save hook:', error);
        next(error);
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models.EatofyStaff || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model('EatofyStaff', EatofyStaffSchema);
}}),
"[project]/src/instrumentation.js [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "register": (()=>register)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$db$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/db.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/mongoose/dist/browser.umd.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Bills$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Bills.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$CashDrawer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/CashDrawer.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Customers$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Customers.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Dishes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Dishes.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$EatoCoinsSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/EatoCoinsSettings.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$EbillEmailSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/EbillEmailSettings.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Expenses$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Expenses.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$GstSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/GstSettings.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$HotelSubscription$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/HotelSubscription.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Hotels$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Hotels.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$InventoryStock$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/InventoryStock.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$InvoicePrinterSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/InvoicePrinterSettings.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$ItemCategories$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/ItemCategories.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Items$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Items.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$KotPrinterSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/KotPrinterSettings.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$MenuCategory$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/MenuCategory.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Menus$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Menus.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Notifications$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Notifications.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Orders$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Orders.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$PurchasedInvoice$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/PurchasedInvoice.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$PurchasedStock$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/PurchasedStock.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Reservation$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Reservation.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Sections$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Sections.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$StaffAttendance$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/StaffAttendance.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Staffs$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Staffs.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$StockReport$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/StockReport.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Subscription$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Subscription.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Suppliers$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Suppliers.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Tables$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Tables.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$VatSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/VatSettings.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$EatofyStaff$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/EatofyStaff.js [instrumentation] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
async function register() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$db$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])();
        await initializeModels();
        console.log("✅ Database connected and models initialized successfully");
    } catch (error) {
        console.error("❌ Error initializing database:", error);
    }
}
async function initializeModels() {
    const modelDefinitions = [
        {
            name: 'EatofyStaff',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$EatofyStaff$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["EatofyStaffSchema"]
        },
        {
            name: 'Hotels',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Hotels$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["HotelSchema"]
        },
        {
            name: 'Subscriptions',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Subscription$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["SubscriptionSchema"]
        },
        {
            name: 'HotelSubscription',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$HotelSubscription$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["HotelSubscriptionSchema"]
        },
        {
            name: 'Sections',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Sections$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["SectionsSchema"]
        },
        {
            name: 'Tables',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Tables$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["tableSchema"]
        },
        {
            name: 'Reservations',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Reservation$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["ReservationSchema"]
        },
        {
            name: 'MenuCategory',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$MenuCategory$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["menuCategorySchema"]
        },
        {
            name: 'Dishes',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Dishes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["dishesSchema"]
        },
        {
            name: 'Menus',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Menus$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["menusSchema"]
        },
        {
            name: 'Suppliers',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Suppliers$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["supplierSchema"]
        },
        {
            name: 'ItemCategory',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$ItemCategories$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["itemCategorySchema"]
        },
        {
            name: 'Items',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Items$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["itemSchema"]
        },
        {
            name: 'PurchasedInvoice',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$PurchasedInvoice$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["purchasedInvoiceSchema"]
        },
        {
            name: 'PurchasedStock',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$PurchasedStock$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["purchasedStockSchema"]
        },
        {
            name: 'InventoryStock',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$InventoryStock$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["inventoryStockSchema"]
        },
        {
            name: 'StockReport',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$StockReport$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["StockReportSchema"]
        },
        {
            name: 'Staffs',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Staffs$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["staffSchema"]
        },
        {
            name: 'StaffAttendance',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$StaffAttendance$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["staffAttendanceSchema"]
        },
        {
            name: 'Customers',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Customers$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerSchema"]
        },
        {
            name: 'Orders',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Orders$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["ordersSchema"]
        },
        {
            name: 'Bills',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Bills$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["billsSchema"]
        },
        {
            name: 'Expenses',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Expenses$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["expensesSchema"]
        },
        {
            name: 'GstSettings',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$GstSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["gstSettingsSchema"]
        },
        {
            name: 'VatSettings',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$VatSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["vatSettingsSchema"]
        },
        {
            name: 'EatoCoinsSettings',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$EatoCoinsSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eatocoinsSettingsSchema"]
        },
        {
            name: 'KotPrinterSettings',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$KotPrinterSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["kotPrinterSettingsSchema"]
        },
        {
            name: 'InvoicePrinterSettings',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$InvoicePrinterSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["invoicePrinterSettingsSchema"]
        },
        {
            name: 'EbillEmailSettings',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$EbillEmailSettings$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["ebillEmailSettingsSchema"]
        },
        {
            name: 'Notifications',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Notifications$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["notificationSchema"]
        },
        {
            name: 'CashDrawer',
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$CashDrawer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashDrawerSchema"]
        }
    ];
    for (const { name, schema } of modelDefinitions){
        try {
            // Check if model exists, if not create it
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].models[name] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model(name, schema);
            // For Eatofy Staff, ensure at least one admin exists
            if (name === 'EatofyStaff') {
                const EatofyStaff = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].model(name);
                const adminExists = await EatofyStaff.exists({});
                if (!adminExists) {
                    await EatofyStaff.create({
                        FirstName: 'Super',
                        LastName: 'Admin',
                        Email: 'admin@eatofy.com',
                        Password: 'admin123',
                        Role: 'Administration'
                    });
                    console.log(`✅ Created default root admin: admin@eatofy.com`);
                }
            }
            console.log(`✅ Model initialized: ${name}`);
        } catch (error) {
            console.error(`❌ Error initializing model ${name}:`, error);
        }
    }
}
}}),
"[project]/edge-wrapper.js { MODULE => \"[project]/src/instrumentation.js [instrumentation] (ecmascript)\" } [instrumentation] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
self._ENTRIES ||= {};
self._ENTRIES["middleware_instrumentation"] = Promise.resolve().then(()=>__turbopack_import__("[project]/src/instrumentation.js [instrumentation] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__b9e20c._.js.map