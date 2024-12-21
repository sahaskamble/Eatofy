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
"[project]/src/app/lib/models/MenuCategory.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "menuCategorySchema": (()=>menuCategorySchema)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [app-route] (ecmascript)");
;
;
const menuCategorySchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    CategoryName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Category Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    // Child Relationship
    Dishes: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
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
        const Dishes = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Dishes');
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
        const Categories = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('MenuCategory');
        const categories = await Categories.find(this.getFilter());
        const Ids = categories.map((category)=>category._id);
        // Delete all related menus
        if (Ids.length > 0) {
            const Dishes = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Dishes');
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
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.MenuCategory;
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
"[project]/src/app/lib/models/Dishes.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "dishesSchema": (()=>dishesSchema)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/StringValidator.js [app-route] (ecmascript)");
;
;
const dishesSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    DishName: {
        type: String,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(value)
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
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$StringValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Dish Type should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    CategoryId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "MenuCategory",
        required: true
    },
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    // Child Relationship
    Menus: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
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
        const Menus = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Menus');
        const Orders = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Orders');
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
        const MenuCategory = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('MenuCategory');
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
        const Dishes = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Dishes');
        const dishes = await Dishes.find(this.getFilter());
        const dishIds = dishes.map((dish)=>dish._id);
        if (dishIds.length > 0) {
            const [Orders, Menus, MenuCategory] = await Promise.all([
                __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Orders'),
                __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Menus'),
                __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('MenuCategory')
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
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Dishes || __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Dishes", dishesSchema);
}}),
"[project]/src/app/lib/utils/FloatValidator.js [app-route] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/src/app/lib/models/Menus.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "menusSchema": (()=>menusSchema)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/utils/FloatValidator.js [app-route] (ecmascript)");
;
;
const menusSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    HotelId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    SectionId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Sections",
        required: true
    },
    DishId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Dishes",
        required: true
    },
    Price: {
        type: Number,
        required: true,
        validate: {
            validator: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$utils$2f$FloatValidator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(value)
        },
        message: "Price must be a non-negative number and must be in decimal format(100.00)."
    },
    // Child Relationship
    Menu: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
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
        const Orders = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Orders');
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
        const Menus = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Menus');
        const menus = await Menus.find(this.getFilter());
        // Get all menu IDs
        const menuIds = menus.map((menu)=>menu._id);
        // Delete all related orders
        if (menuIds.length > 0) {
            const Orders = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Orders');
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
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Menus || __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Menus", menusSchema);
}}),
"[project]/src/app/lib/crud/Menus.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Menus$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Menus.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Dishes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Dishes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/BaseCrud.js [app-route] (ecmascript)");
;
;
;
class MenusCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseCrud"] {
    constructor(){
        super(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Menus$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
    }
    async createMenu(data) {
        try {
            const normalizedData = {
                HotelId: data.hotel_id,
                SectionId: data.section_id,
                DishId: data.dish_id,
                Price: data.price
            };
            // Create the menu
            const menuResult = await this.create(normalizedData);
            if (menuResult.returncode === 200) {
                // Update the dish's Menus array
                const dish = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Dishes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(data.dish_id, {
                    $push: {
                        Menus: menuResult.output._id
                    }
                }, {
                    new: true
                });
                if (!dish) {
                    return {
                        returncode: 404,
                        message: "Dish not found",
                        output: []
                    };
                }
                return menuResult;
            }
            return menuResult;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async readMenus(hotel_id) {
        try {
            const result = await this.readMany({
                HotelId: hotel_id
            }, {
                populate: [
                    {
                        path: 'DishId',
                        populate: [
                            {
                                path: 'CategoryId'
                            }
                        ]
                    },
                    {
                        path: 'SectionId'
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
    async readMenusBySectionId(section_id) {
        try {
            const result = await this.readMany({
                SectionId: section_id
            }, {
                populate: [
                    {
                        path: 'DishId',
                        populate: [
                            {
                                path: 'CategoryId'
                            }
                        ]
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
    // Takeaway
    async readTakeawayMenus() {
        try {
            const result = await this.readMany({
                "SectionId.Type": "Takeaway"
            }, {
                populate: [
                    {
                        path: 'DishId',
                        populate: [
                            {
                                path: 'CategoryId'
                            }
                        ]
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
    // Delivery
    async readDeliveryMenus() {
        try {
            const result = await this.readMany({
                "SectionId.Type": "Delivery"
            }, {
                populate: [
                    {
                        path: 'DishId',
                        populate: [
                            {
                                path: 'CategoryId'
                            }
                        ]
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
    // Swiggy
    async readSwiggyMenus() {
        try {
            const result = await this.readMany({
                "SectionId.Type": "Swiggy"
            }, {
                populate: [
                    {
                        path: 'DishId',
                        populate: [
                            {
                                path: 'CategoryId'
                            }
                        ]
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
    // Zomto
    async readZomatoMenus() {
        try {
            const result = await this.readMany({
                "SectionId.Type": "Zomato"
            }, {
                populate: [
                    {
                        path: 'DishId',
                        populate: [
                            {
                                path: 'CategoryId'
                            }
                        ]
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
    // QR Menus
    async readQRMenus() {
        try {
            const result = await this.readMany({
                "SectionId.Type": "QR-Orders"
            }, {
                populate: [
                    {
                        path: 'DishId',
                        populate: [
                            {
                                path: 'CategoryId'
                            }
                        ]
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
    async updateMenu(menu_id, data) {
        try {
            const updateData = {
                Price: data.price
            };
            const result = await this.update({
                _id: menu_id
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
    async deleteMenus(filter) {
        try {
            // First get the menus to be deleted
            const menusToDelete = await this.readMany(filter);
            if (menusToDelete.returncode === 200 && menusToDelete.output.length > 0) {
                // Finally delete the menus
                const result = await this.delete(filter);
                return result;
            }
            return {
                returncode: 404,
                message: "No menus found to delete",
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
    async deleteMenuById(menu_id) {
        try {
            const menu = await this.readOne({
                _id: menu_id
            });
            if (menu.returncode === 200) {
                // Finally delete the menu
                const result = await this.delete({
                    _id: menu_id
                });
                return result;
            }
            return {
                returncode: 404,
                message: "No menus found",
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
    async doesMenuExists(section_id, dish_id) {
        try {
            const result = await this.readMany({
                SectionId: section_id,
                DishId: dish_id
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
    async updateMenuAvailability(menu_id, is_available) {
        try {
            const result = await this.update({
                _id: menu_id
            }, {
                IsAvailable: is_available
            }, {
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
    async updateMenuPrice(menu_id, price) {
        try {
            const result = await this.update({
                _id: menu_id
            }, {
                Price: price
            }, {
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
    async readMenusByDish(dish_id) {
        try {
            const result = await this.readMany({
                DishId: dish_id
            }, {
                populate: [
                    {
                        path: 'SectionId'
                    },
                    {
                        path: 'Menu'
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
    async moveMenusBetweenSections(from_section_id, to_section_id) {
        try {
            // Check if any menus have active orders
            const menusWithOrders = await this.readMany({
                SectionId: from_section_id
            }, {
                populate: [
                    {
                        path: 'Menu',
                        match: {
                            Status: {
                                $in: [
                                    'Ordered',
                                    'Preparing'
                                ]
                            }
                        }
                    }
                ]
            });
            if (menusWithOrders.returncode === 200) {
                const activeMenus = menusWithOrders.output.filter((menu)=>menu.Menu && menu.Menu.length > 0);
                if (activeMenus.length > 0) {
                    return {
                        returncode: 400,
                        message: "Cannot move menus with active orders",
                        output: []
                    };
                }
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
    async getMenuStats(menu_id) {
        try {
            const result = await this.readOne({
                _id: menu_id
            }, {
                populate: [
                    {
                        path: 'Menu',
                        select: 'Quantity TotalAmount Status CreatedAt'
                    }
                ]
            });
            if (result.returncode === 200) {
                const orders = result.output.Menu || [];
                const stats = {
                    totalOrders: orders.length,
                    totalQuantity: orders.reduce((sum, order)=>sum + order.Quantity, 0),
                    totalRevenue: orders.reduce((sum, order)=>sum + order.TotalAmount, 0),
                    ordersByStatus: orders.reduce((acc, order)=>{
                        acc[order.Status] = (acc[order.Status] || 0) + 1;
                        return acc;
                    }, {}),
                    averageOrderValue: orders.length ? orders.reduce((sum, order)=>sum + order.TotalAmount, 0) / orders.length : 0
                };
                return {
                    returncode: 200,
                    message: "Menu stats retrieved successfully",
                    output: stats
                };
            }
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
const menusCrud = new MenusCrud();
const __TURBOPACK__default__export__ = menusCrud;
}}),
"[project]/src/app/lib/crud/Dishes.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Dishes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/Dishes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/BaseCrud.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$Menus$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/Menus.js [app-route] (ecmascript)");
;
;
;
class DishesCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseCrud"] {
    constructor(){
        super(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$Dishes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
    }
    async createDish(data) {
        try {
            const normalized_data = {
                DishName: data.dish_name,
                Code: data.code,
                Description: data.description,
                Type: data.type,
                CategoryId: data.category_id,
                HotelId: data.hotel_id
            };
            const result = await this.create(normalized_data);
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async readDishes(hotel_id) {
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
    async doesDishExists(hotel_id, dish_name, code) {
        try {
            const result = await this.readMany({
                HotelId: hotel_id,
                DishName: dish_name,
                Code: code
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
    async updateDishInfo(data) {
        try {
            const updateData = {
                DishName: data.dish_name,
                Code: data.code,
                Description: data.description,
                Type: data.type
            };
            const dish_id = data.dish_id;
            const result = await this.update({
                _id: dish_id
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
    async deleteDishesByCategoryId(category_id) {
        try {
            const deleteResult = await this.delete({
                CategoryId: category_id
            });
            return deleteResult;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async deleteDishesById(dish_id) {
        try {
            const deleteResult = await this.delete({
                _id: dish_id
            });
            return deleteResult;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async deleteDishes(filter) {
        try {
            const deleteResult = await this.delete(filter);
            return deleteResult;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
}
const dishesCrud = new DishesCrud();
const __TURBOPACK__default__export__ = dishesCrud;
}}),
"[project]/src/app/lib/crud/MenuCategory.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$MenuCategory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/models/MenuCategory.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/BaseCrud.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$Dishes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/Dishes.js [app-route] (ecmascript)");
;
;
;
class MenuCategoryCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseCrud"] {
    constructor(){
        super(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$models$2f$MenuCategory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
    }
    async createMenuCategory(data) {
        try {
            const normalizedData = {
                CategoryName: data.category_name,
                HotelId: data.hotel_id
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
    async updateMenuCategory(data) {
        try {
            const updateData = {
                CategoryName: data.category_name
            };
            const result = await this.update({
                _id: data.category_id
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
    async readMenuCategories(hotel_id) {
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
    async doesMenuCategoryExists(hotel_id, category_name) {
        try {
            const result = await this.readMany({
                HotelId: hotel_id,
                CategoryName: category_name
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
    async deleteCategoriesById(category_id) {
        try {
            // Delete all related data
            const deleteResult = await this.delete({
                _id: category_id
            });
            if (deleteResult.returncode === 200) {
                return {
                    returncode: 200,
                    message: "Menu Categories and all related data deleted successfully",
                    output: []
                };
            }
            return deleteResult;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
}
const menuCategoriesCrud = new MenuCategoryCrud();
const __TURBOPACK__default__export__ = menuCategoriesCrud;
}}),
"[project]/src/app/api/sync/MenuCategory/pull/controller.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "fetch_categories": (()=>fetch_categories)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/lib/crud/MenuCategory.js [app-route] (ecmascript)");
;
async function fetch_categories(tokenData) {
    try {
        const hotel_id = await tokenData.hotelId;
        const existing_categories = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].readMenuCategories(hotel_id);
        if (existing_categories.returncode === 200 && existing_categories.output.length === 0) {
            return {
                returncode: 409,
                message: "No Tables to be displayed",
                output: []
            };
        }
        return existing_categories;
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
"[project]/src/app/api/sync/MenuCategory/pull/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$sync$2f$MenuCategory$2f$pull$2f$controller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/sync/MenuCategory/pull/controller.js [app-route] (ecmascript)");
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
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$sync$2f$MenuCategory$2f$pull$2f$controller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetch_categories"])(userData);
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

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__568792._.js.map