(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_b03bc2._.js", {

"[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "OfflineBaseCrud": (()=>OfflineBaseCrud)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$services$2f$db$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/services/db.js [app-client] (ecmascript)");
;
class OfflineBaseCrud {
    constructor(storeName){
        this.storeName = storeName;
        this.db = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$services$2f$db$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
    }
    // Create a new record
    async create(data) {
        try {
            const result = await this.db.add(this.storeName, data);
            return result;
        } catch (err) {
            return {
                returncode: 500,
                message: err.message,
                output: []
            };
        }
    }
    // Read records with optional filters
    async read(filterKey, filterValue) {
        try {
            const result = await this.db.getByFilter(this.storeName, filterKey, filterValue);
            return result;
        } catch (err) {
            return {
                returncode: 500,
                message: err.message,
                output: []
            };
        }
    }
    // Update a record
    async update(id, data) {
        try {
            const result = await this.db.update(this.storeName, id, data);
            return result;
        } catch (err) {
            return {
                returncode: 500,
                message: err.message,
                output: []
            };
        }
    }
    // Delete a record
    async delete(id) {
        try {
            const result = await this.db.delete(this.storeName, id);
            return result;
        } catch (err) {
            return {
                returncode: 500,
                message: err.message,
                output: []
            };
        }
    }
    // Delete Every Record
    async deleteEverything() {
        try {
            const result = await this.db.clear(this.storeName);
            return result;
        } catch (err) {
            return {
                returncode: 500,
                message: err.message,
                output: []
            };
        }
    }
    // Bulk update records (e.g., after syncing)
    async bulkUpdate(items) {
        try {
            const result = await this.db.bulkUpdate(this.storeName, items);
            return result;
        } catch (err) {
            return {
                returncode: 500,
                message: err.message,
                output: []
            };
        }
    }
    // Sync unsynced records from IndexedDB to MongoDB for this store. Pushes local changes to the server.
    async syncToServer() {
        try {
            const result = await this.db.syncToServer(this.storeName);
            return {
                returncode: 200,
                message: "Synced to Server Successfully",
                output: result
            };
        } catch (err) {
            return {
                returncode: 500,
                message: err.message,
                output: []
            };
        }
    }
    // Fetch updates from MongoDB and apply them to IndexedDB for this store. Pulls server-side changes to the local database.
    async syncFromServer() {
        try {
            const result = await this.db.syncFromServer(this.storeName);
            return {
                returncode: 200,
                message: "Synced from Server Successfully",
                output: result
            };
        } catch (err) {
            return {
                returncode: 500,
                message: err.message,
                output: []
            };
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/Customers.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
;
class CustomersCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('Customers');
    }
    async createCustomer({ customer_id = null, customer_name, email, contact, hotel_id, street_address, apartment, city, state, landmark, zip_code, birthday, anniversary }) {
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
            const exists = await this.read({
                CustomerName: customer_name,
                Contact: contact,
                HotelId: hotel_id
            });
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
                return await this.update(customer_id, updateData);
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
    async readCustomers(hotel_id) {
        try {
            const result = await this.read('HotelId', hotel_id);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/Menus.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
;
class MenusCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('Menus');
    }
    async readMenus(hotel_id) {
        try {
            const result = await this.read('HotelId', hotel_id);
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
            const result = await this.read('SectionId._id', section_id);
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
            const result = await this.read("SectionId.Type", "Takeaway");
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
            const result = await this.read("SectionId.Type", "Delivery");
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
            const result = await this.read("SectionId.Type", "Swiggy");
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
            const result = await this.read("SectionId.Type", "Zomato");
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
            const result = await this.read("SectionId.Type", "QR-Orders");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/MenuCategory.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
;
class MenuCategory extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('MenuCategory');
    }
    async readMenuCategories(hotel_id) {
        try {
            const result = await this.read('HotelId', hotel_id);
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
const menuCategoryCrud = new MenuCategory();
const __TURBOPACK__default__export__ = menuCategoryCrud;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/Sections.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
;
class SectionsCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('Sections');
    }
    async readAllSections(hotel_id) {
        try {
            const sections = await this.read('HotelId', hotel_id);
            return sections;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
}
const sectionsCrud = new SectionsCrud();
const __TURBOPACK__default__export__ = sectionsCrud;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/hotel/(dashboard)/restore/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>RestorePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Customers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/react-toastify.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Menus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/MenuCategory.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Sections.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ArrowUpTrayIcon.js [app-client] (ecmascript) <export default as ArrowUpTrayIcon>");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
function RestorePage() {
    _s();
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [menus, setMenus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [menuCategories, setMenuCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingStates, setLoadingStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        customers: false,
        menus: false,
        menuCategories: false,
        sections: false
    });
    const fetchCustomers = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].readCustomers();
            if (result.returncode === 200) {
                setCustomers(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch customers');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Error fetching customers');
            console.error(error);
        }
    };
    const fetchMenus = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].readMenus();
            if (result.returncode === 200) {
                setMenus(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Menus');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Menus');
        }
    };
    const fetchMenuCategories = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].readMenuCategories();
            if (result.returncode === 200) {
                setMenuCategories(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Menu Categories');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Menu Categories');
        }
    };
    const fetchSections = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].readAllSections();
            if (result.returncode === 200) {
                setSections(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Sections');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Sections');
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RestorePage.useEffect": ()=>{
            fetchCustomers();
            fetchMenus();
            fetchMenuCategories();
            fetchSections();
        }
    }["RestorePage.useEffect"], []);
    const handleRestore = async (type)=>{
        setLoadingStates((prev)=>({
                ...prev,
                [type]: true
            }));
        try {
            let result;
            switch(type){
                case 'customers':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchCustomers();
                    }
                    break;
                case 'menus':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchMenus();
                    }
                    break;
                case 'menu Categories':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchMenuCategories();
                    }
                    break;
                case 'sections':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchSections();
                    }
                    break;
                default:
                    throw new Error('Invalid restore type');
            }
            if (result.returncode === 200) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${type.charAt(0).toUpperCase() + type.slice(1)} restored successfully`);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(result.message || `Failed to restore ${type}`);
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || `Error restoring ${type}`);
        } finally{
            setLoadingStates((prev)=>({
                    ...prev,
                    [type]: false
                }));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-6",
                children: "Data From Server"
            }, void 0, false, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Customers"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('customers'),
                                    disabled: loadingStates.customers,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.customers ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 144,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.customers ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 154,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "City"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 157,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Wallet"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: customers.length > 0 ? customers.map((customer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 167,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.CustomerName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 168,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.Contact
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 169,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.Email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 170,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.City
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 171,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.Wallet || 0
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 172,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 166,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Customers Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 177,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 176,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Menus"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('menus'),
                                    disabled: loadingStates.menus,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.menus ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 197,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.menus ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 207,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Code"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Description"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 209,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Section"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 211,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Type"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Price"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: menus.length > 0 ? menus.map((menu, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 222,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.DishName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 223,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.Code
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 224,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.Description || "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 225,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.SectionId.SectionName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 226,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.CategoryId.CategoryName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 227,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.Type
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 228,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.Price
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 229,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 221,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Menus Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 234,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 233,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Menu Categories"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('menu Categories'),
                                    disabled: loadingStates.menuCategories,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.menus ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 254,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.menuCategories ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 263,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 264,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 261,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: menuCategories.length > 0 ? menuCategories.map((menu, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 273,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.CategoryName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 274,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 272,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Menu Categories Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 279,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 278,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 260,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Section"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('sections'),
                                    disabled: loadingStates.sections,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.sections ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 299,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.sections ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 308,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 309,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Type"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: sections.length > 0 ? sections.map((menu, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 319,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.SectionName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 320,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.Type
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 321,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 318,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Sections Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 326,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 325,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {
                position: "bottom-right"
            }, void 0, false, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 335,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s(RestorePage, "8+Evh6WHeI1eM34tdG5vjCYyk8g=");
_c = RestorePage;
var _c;
__turbopack_refresh__.register(_c, "RestorePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/hotel/(dashboard)/restore/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
"[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "clsx": (()=>clsx),
    "default": (()=>__TURBOPACK__default__export__)
});
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}}),
"[project]/node_modules/react-toastify/dist/react-toastify.esm.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Bounce": (()=>H),
    "Flip": (()=>Y),
    "Icons": (()=>z),
    "Slide": (()=>F),
    "ToastContainer": (()=>Q),
    "Zoom": (()=>X),
    "collapseToast": (()=>f),
    "cssTransition": (()=>g),
    "toast": (()=>B),
    "useToast": (()=>N),
    "useToastContainer": (()=>L)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
'use client';
;
;
const c = (e)=>"number" == typeof e && !isNaN(e), d = (e)=>"string" == typeof e, u = (e)=>"function" == typeof e, p = (e)=>d(e) || u(e) ? e : null, m = (e)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(e) || d(e) || u(e) || c(e);
function f(e, t, n) {
    void 0 === n && (n = 300);
    const { scrollHeight: o, style: s } = e;
    requestAnimationFrame(()=>{
        s.minHeight = "initial", s.height = o + "px", s.transition = `all ${n}ms`, requestAnimationFrame(()=>{
            s.height = "0", s.padding = "0", s.margin = "0", setTimeout(t, n);
        });
    });
}
function g(t) {
    let { enter: a, exit: r, appendPosition: i = !1, collapse: l = !0, collapseDuration: c = 300 } = t;
    return function(t) {
        let { children: d, position: u, preventExitTransition: p, done: m, nodeRef: g, isIn: y, playToast: v } = t;
        const h = i ? `${a}--${u}` : a, T = i ? `${r}--${u}` : r, E = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
            const e = g.current, t = h.split(" "), n = (o)=>{
                o.target === g.current && (v(), e.removeEventListener("animationend", n), e.removeEventListener("animationcancel", n), 0 === E.current && "animationcancel" !== o.type && e.classList.remove(...t));
            };
            e.classList.add(...t), e.addEventListener("animationend", n), e.addEventListener("animationcancel", n);
        }, []), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            const e = g.current, t = ()=>{
                e.removeEventListener("animationend", t), l ? f(e, m, c) : m();
            };
            y || (p ? t() : (E.current = 1, e.className += ` ${T}`, e.addEventListener("animationend", t)));
        }, [
            y
        ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, null, d);
    };
}
function y(e, t) {
    return null != e ? {
        content: e.content,
        containerId: e.props.containerId,
        id: e.props.toastId,
        theme: e.props.theme,
        type: e.props.type,
        data: e.props.data || {},
        isLoading: e.props.isLoading,
        icon: e.props.icon,
        status: t
    } : {};
}
const v = new Map;
let h = [];
const T = new Set, E = (e)=>T.forEach((t)=>t(e)), b = ()=>v.size > 0;
function I(e, t) {
    var n;
    if (t) return !(null == (n = v.get(t)) || !n.isToastActive(e));
    let o = !1;
    return v.forEach((t)=>{
        t.isToastActive(e) && (o = !0);
    }), o;
}
function _(e, t) {
    m(e) && (b() || h.push({
        content: e,
        options: t
    }), v.forEach((n)=>{
        n.buildToast(e, t);
    }));
}
function C(e, t) {
    v.forEach((n)=>{
        null != t && null != t && t.containerId ? (null == t ? void 0 : t.containerId) === n.id && n.toggle(e, null == t ? void 0 : t.id) : n.toggle(e, null == t ? void 0 : t.id);
    });
}
function L(e) {
    const { subscribe: o, getSnapshot: s, setProps: i } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(function(e) {
        const n = e.containerId || 1;
        return {
            subscribe (o) {
                const s = function(e, n, o) {
                    let s = 1, r = 0, i = [], l = [], f = [], g = n;
                    const v = new Map, h = new Set, T = ()=>{
                        f = Array.from(v.values()), h.forEach((e)=>e());
                    }, E = (e)=>{
                        l = null == e ? [] : l.filter((t)=>t !== e), T();
                    }, b = (e)=>{
                        const { toastId: n, onOpen: s, updateId: a, children: r } = e.props, i = null == a;
                        e.staleId && v.delete(e.staleId), v.set(n, e), l = [
                            ...l,
                            e.props.toastId
                        ].filter((t)=>t !== e.staleId), T(), o(y(e, i ? "added" : "updated")), i && u(s) && s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(r) && r.props);
                    };
                    return {
                        id: e,
                        props: g,
                        observe: (e)=>(h.add(e), ()=>h.delete(e)),
                        toggle: (e, t)=>{
                            v.forEach((n)=>{
                                null != t && t !== n.props.toastId || u(n.toggle) && n.toggle(e);
                            });
                        },
                        removeToast: E,
                        toasts: v,
                        clearQueue: ()=>{
                            r -= i.length, i = [];
                        },
                        buildToast: (n, l)=>{
                            if (((t)=>{
                                let { containerId: n, toastId: o, updateId: s } = t;
                                const a = n ? n !== e : 1 !== e, r = v.has(o) && null == s;
                                return a || r;
                            })(l)) return;
                            const { toastId: f, updateId: h, data: I, staleId: _, delay: C } = l, L = ()=>{
                                E(f);
                            }, N = null == h;
                            N && r++;
                            const $ = {
                                ...g,
                                style: g.toastStyle,
                                key: s++,
                                ...Object.fromEntries(Object.entries(l).filter((e)=>{
                                    let [t, n] = e;
                                    return null != n;
                                })),
                                toastId: f,
                                updateId: h,
                                data: I,
                                closeToast: L,
                                isIn: !1,
                                className: p(l.className || g.toastClassName),
                                bodyClassName: p(l.bodyClassName || g.bodyClassName),
                                progressClassName: p(l.progressClassName || g.progressClassName),
                                autoClose: !l.isLoading && (w = l.autoClose, k = g.autoClose, !1 === w || c(w) && w > 0 ? w : k),
                                deleteToast () {
                                    const e = v.get(f), { onClose: n, children: s } = e.props;
                                    u(n) && n((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(s) && s.props), o(y(e, "removed")), v.delete(f), r--, r < 0 && (r = 0), i.length > 0 ? b(i.shift()) : T();
                                }
                            };
                            var w, k;
                            $.closeButton = g.closeButton, !1 === l.closeButton || m(l.closeButton) ? $.closeButton = l.closeButton : !0 === l.closeButton && ($.closeButton = !m(g.closeButton) || g.closeButton);
                            let P = n;
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(n) && !d(n.type) ? P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"])(n, {
                                closeToast: L,
                                toastProps: $,
                                data: I
                            }) : u(n) && (P = n({
                                closeToast: L,
                                toastProps: $,
                                data: I
                            }));
                            const M = {
                                content: P,
                                props: $,
                                staleId: _
                            };
                            g.limit && g.limit > 0 && r > g.limit && N ? i.push(M) : c(C) ? setTimeout(()=>{
                                b(M);
                            }, C) : b(M);
                        },
                        setProps (e) {
                            g = e;
                        },
                        setToggle: (e, t)=>{
                            v.get(e).toggle = t;
                        },
                        isToastActive: (e)=>l.some((t)=>t === e),
                        getSnapshot: ()=>f
                    };
                }(n, e, E);
                v.set(n, s);
                const r = s.observe(o);
                return h.forEach((e)=>_(e.content, e.options)), h = [], ()=>{
                    r(), v.delete(n);
                };
            },
            setProps (e) {
                var t;
                null == (t = v.get(n)) || t.setProps(e);
            },
            getSnapshot () {
                var e;
                return null == (e = v.get(n)) ? void 0 : e.getSnapshot();
            }
        };
    }(e)).current;
    i(e);
    const l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(o, s, s);
    return {
        getToastToRender: function(t) {
            if (!l) return [];
            const n = new Map;
            return e.newestOnTop && l.reverse(), l.forEach((e)=>{
                const { position: t } = e.props;
                n.has(t) || n.set(t, []), n.get(t).push(e);
            }), Array.from(n, (e)=>t(e[0], e[1]));
        },
        isToastActive: I,
        count: null == l ? void 0 : l.length
    };
}
function N(e) {
    const [t, o] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!1), [a, r] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!1), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        start: 0,
        delta: 0,
        removalDistance: 0,
        canCloseOnClick: !0,
        canDrag: !1,
        didMove: !1
    }).current, { autoClose: d, pauseOnHover: u, closeToast: p, onClick: m, closeOnClick: f } = e;
    var g, y;
    function h() {
        o(!0);
    }
    function T() {
        o(!1);
    }
    function E(n) {
        const o = l.current;
        c.canDrag && o && (c.didMove = !0, t && T(), c.delta = "x" === e.draggableDirection ? n.clientX - c.start : n.clientY - c.start, c.start !== n.clientX && (c.canCloseOnClick = !1), o.style.transform = `translate3d(${"x" === e.draggableDirection ? `${c.delta}px, var(--y)` : `0, calc(${c.delta}px + var(--y))`},0)`, o.style.opacity = "" + (1 - Math.abs(c.delta / c.removalDistance)));
    }
    function b() {
        document.removeEventListener("pointermove", E), document.removeEventListener("pointerup", b);
        const t = l.current;
        if (c.canDrag && c.didMove && t) {
            if (c.canDrag = !1, Math.abs(c.delta) > c.removalDistance) return r(!0), e.closeToast(), void e.collapseAll();
            t.style.transition = "transform 0.2s, opacity 0.2s", t.style.removeProperty("transform"), t.style.removeProperty("opacity");
        }
    }
    null == (y = v.get((g = {
        id: e.toastId,
        containerId: e.containerId,
        fn: o
    }).containerId || 1)) || y.setToggle(g.id, g.fn), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (e.pauseOnFocusLoss) return document.hasFocus() || T(), window.addEventListener("focus", h), window.addEventListener("blur", T), ()=>{
            window.removeEventListener("focus", h), window.removeEventListener("blur", T);
        };
    }, [
        e.pauseOnFocusLoss
    ]);
    const I = {
        onPointerDown: function(t) {
            if (!0 === e.draggable || e.draggable === t.pointerType) {
                c.didMove = !1, document.addEventListener("pointermove", E), document.addEventListener("pointerup", b);
                const n = l.current;
                c.canCloseOnClick = !0, c.canDrag = !0, n.style.transition = "none", "x" === e.draggableDirection ? (c.start = t.clientX, c.removalDistance = n.offsetWidth * (e.draggablePercent / 100)) : (c.start = t.clientY, c.removalDistance = n.offsetHeight * (80 === e.draggablePercent ? 1.5 * e.draggablePercent : e.draggablePercent) / 100);
            }
        },
        onPointerUp: function(t) {
            const { top: n, bottom: o, left: s, right: a } = l.current.getBoundingClientRect();
            "touchend" !== t.nativeEvent.type && e.pauseOnHover && t.clientX >= s && t.clientX <= a && t.clientY >= n && t.clientY <= o ? T() : h();
        }
    };
    return d && u && (I.onMouseEnter = T, e.stacked || (I.onMouseLeave = h)), f && (I.onClick = (e)=>{
        m && m(e), c.canCloseOnClick && p();
    }), {
        playToast: h,
        pauseToast: T,
        isRunning: t,
        preventExitTransition: a,
        toastRef: l,
        eventHandlers: I
    };
}
function $(t) {
    let { delay: n, isRunning: o, closeToast: s, type: a = "default", hide: r, className: i, style: c, controlledProgress: d, progress: p, rtl: m, isIn: f, theme: g } = t;
    const y = r || d && 0 === p, v = {
        ...c,
        animationDuration: `${n}ms`,
        animationPlayState: o ? "running" : "paused"
    };
    d && (v.transform = `scaleX(${p})`);
    const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Toastify__progress-bar", d ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${g}`, `Toastify__progress-bar--${a}`, {
        "Toastify__progress-bar--rtl": m
    }), T = u(i) ? i({
        rtl: m,
        type: a,
        defaultClassName: h
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(h, i), E = {
        [d && p >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: d && p < 1 ? null : ()=>{
            f && s();
        }
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        className: "Toastify__progress-bar--wrp",
        "data-hidden": y
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${g} Toastify__progress-bar--${a}`
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        role: "progressbar",
        "aria-hidden": y ? "true" : "false",
        "aria-label": "notification timer",
        className: T,
        style: v,
        ...E
    }));
}
let w = 1;
const k = ()=>"" + w++;
function P(e) {
    return e && (d(e.toastId) || c(e.toastId)) ? e.toastId : k();
}
function M(e, t) {
    return _(e, t), t.toastId;
}
function x(e, t) {
    return {
        ...t,
        type: t && t.type || e,
        toastId: P(t)
    };
}
function A(e) {
    return (t, n)=>M(t, x(e, n));
}
function B(e, t) {
    return M(e, x("default", t));
}
B.loading = (e, t)=>M(e, x("default", {
        isLoading: !0,
        autoClose: !1,
        closeOnClick: !1,
        closeButton: !1,
        draggable: !1,
        ...t
    })), B.promise = function(e, t, n) {
    let o, { pending: s, error: a, success: r } = t;
    s && (o = d(s) ? B.loading(s, n) : B.loading(s.render, {
        ...n,
        ...s
    }));
    const i = {
        isLoading: null,
        autoClose: null,
        closeOnClick: null,
        closeButton: null,
        draggable: null
    }, l = (e, t, s)=>{
        if (null == t) return void B.dismiss(o);
        const a = {
            type: e,
            ...i,
            ...n,
            data: s
        }, r = d(t) ? {
            render: t
        } : t;
        return o ? B.update(o, {
            ...a,
            ...r
        }) : B(r.render, {
            ...a,
            ...r
        }), s;
    }, c = u(e) ? e() : e;
    return c.then((e)=>l("success", r, e)).catch((e)=>l("error", a, e)), c;
}, B.success = A("success"), B.info = A("info"), B.error = A("error"), B.warning = A("warning"), B.warn = B.warning, B.dark = (e, t)=>M(e, x("default", {
        theme: "dark",
        ...t
    })), B.dismiss = function(e) {
    !function(e) {
        var t;
        if (b()) {
            if (null == e || d(t = e) || c(t)) v.forEach((t)=>{
                t.removeToast(e);
            });
            else if (e && ("containerId" in e || "id" in e)) {
                const t = v.get(e.containerId);
                t ? t.removeToast(e.id) : v.forEach((t)=>{
                    t.removeToast(e.id);
                });
            }
        } else h = h.filter((t)=>null != e && t.options.toastId !== e);
    }(e);
}, B.clearWaitingQueue = function(e) {
    void 0 === e && (e = {}), v.forEach((t)=>{
        !t.props.limit || e.containerId && t.id !== e.containerId || t.clearQueue();
    });
}, B.isActive = I, B.update = function(e, t) {
    void 0 === t && (t = {});
    const n = ((e, t)=>{
        var n;
        let { containerId: o } = t;
        return null == (n = v.get(o || 1)) ? void 0 : n.toasts.get(e);
    })(e, t);
    if (n) {
        const { props: o, content: s } = n, a = {
            delay: 100,
            ...o,
            ...t,
            toastId: t.toastId || e,
            updateId: k()
        };
        a.toastId !== e && (a.staleId = e);
        const r = a.render || s;
        delete a.render, M(r, a);
    }
}, B.done = (e)=>{
    B.update(e, {
        progress: 1
    });
}, B.onChange = function(e) {
    return T.add(e), ()=>{
        T.delete(e);
    };
}, B.play = (e)=>C(!0, e), B.pause = (e)=>C(!1, e);
const O = "undefined" != typeof window ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"], D = (t)=>{
    let { theme: n, type: o, isLoading: s, ...a } = t;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        viewBox: "0 0 24 24",
        width: "100%",
        height: "100%",
        fill: "colored" === n ? "currentColor" : `var(--toastify-icon-color-${o})`,
        ...a
    });
}, z = {
    info: function(t) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(D, {
            ...t
        }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
        }));
    },
    warning: function(t) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(D, {
            ...t
        }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
        }));
    },
    success: function(t) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(D, {
            ...t
        }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
        }));
    },
    error: function(t) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(D, {
            ...t
        }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
        }));
    },
    spinner: function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
            className: "Toastify__spinner"
        });
    }
}, R = (n)=>{
    const { isRunning: o, preventExitTransition: s, toastRef: r, eventHandlers: i, playToast: c } = N(n), { closeButton: d, children: p, autoClose: m, onClick: f, type: g, hideProgressBar: y, closeToast: v, transition: h, position: T, className: E, style: b, bodyClassName: I, bodyStyle: _, progressClassName: C, progressStyle: L, updateId: w, role: k, progress: P, rtl: M, toastId: x, deleteToast: A, isIn: B, isLoading: O, closeOnClick: D, theme: R } = n, S = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Toastify__toast", `Toastify__toast-theme--${R}`, `Toastify__toast--${g}`, {
        "Toastify__toast--rtl": M
    }, {
        "Toastify__toast--close-on-click": D
    }), H = u(E) ? E({
        rtl: M,
        position: T,
        type: g,
        defaultClassName: S
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(S, E), F = function(e) {
        let { theme: n, type: o, isLoading: s, icon: r } = e, i = null;
        const l = {
            theme: n,
            type: o
        };
        return !1 === r || (u(r) ? i = r({
            ...l,
            isLoading: s
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(r) ? i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"])(r, l) : s ? i = z.spinner() : ((e)=>e in z)(o) && (i = z[o](l))), i;
    }(n), X = !!P || !m, Y = {
        closeToast: v,
        type: g,
        theme: R
    };
    let q = null;
    return !1 === d || (q = u(d) ? d(Y) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(d) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"])(d, Y) : function(t) {
        let { closeToast: n, theme: o, ariaLabel: s = "close" } = t;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("button", {
            className: `Toastify__close-button Toastify__close-button--${o}`,
            type: "button",
            onClick: (e)=>{
                e.stopPropagation(), n(e);
            },
            "aria-label": s
        }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
            "aria-hidden": "true",
            viewBox: "0 0 14 16"
        }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            fillRule: "evenodd",
            d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
        })));
    }(Y)), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(h, {
        isIn: B,
        done: A,
        position: T,
        preventExitTransition: s,
        nodeRef: r,
        playToast: c
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: x,
        onClick: f,
        "data-in": B,
        className: H,
        ...i,
        style: b,
        ref: r
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        ...B && {
            role: k
        },
        className: u(I) ? I({
            type: g
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Toastify__toast-body", I),
        style: _
    }, null != F && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Toastify__toast-icon", {
            "Toastify--animate-icon Toastify__zoom-enter": !O
        })
    }, F), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", null, p)), q, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement($, {
        ...w && !X ? {
            key: `pb-${w}`
        } : {},
        rtl: M,
        theme: R,
        delay: m,
        isRunning: o,
        isIn: B,
        closeToast: v,
        hide: y,
        type: g,
        style: L,
        className: C,
        controlledProgress: X,
        progress: P || 0
    })));
}, S = function(e, t) {
    return void 0 === t && (t = !1), {
        enter: `Toastify--animate Toastify__${e}-enter`,
        exit: `Toastify--animate Toastify__${e}-exit`,
        appendPosition: t
    };
}, H = g(S("bounce", !0)), F = g(S("slide", !0)), X = g(S("zoom")), Y = g(S("flip")), q = {
    position: "top-right",
    transition: H,
    autoClose: 5e3,
    closeButton: !0,
    pauseOnHover: !0,
    pauseOnFocusLoss: !0,
    draggable: "touch",
    draggablePercent: 80,
    draggableDirection: "x",
    role: "alert",
    theme: "light"
};
function Q(t) {
    let o = {
        ...q,
        ...t
    };
    const s = t.stacked, [a, r] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!0), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), { getToastToRender: d, isToastActive: m, count: f } = L(o), { className: g, style: y, rtl: v, containerId: h } = o;
    function T(e) {
        const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Toastify__toast-container", `Toastify__toast-container--${e}`, {
            "Toastify__toast-container--rtl": v
        });
        return u(g) ? g({
            position: e,
            rtl: v,
            defaultClassName: t
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(t, p(g));
    }
    function E() {
        s && (r(!0), B.play());
    }
    return O(()=>{
        if (s) {
            var e;
            const t = c.current.querySelectorAll('[data-in="true"]'), n = 12, s = null == (e = o.position) ? void 0 : e.includes("top");
            let r = 0, i = 0;
            Array.from(t).reverse().forEach((e, t)=>{
                const o = e;
                o.classList.add("Toastify__toast--stacked"), t > 0 && (o.dataset.collapsed = `${a}`), o.dataset.pos || (o.dataset.pos = s ? "top" : "bot");
                const l = r * (a ? .2 : 1) + (a ? 0 : n * t);
                o.style.setProperty("--y", `${s ? l : -1 * l}px`), o.style.setProperty("--g", `${n}`), o.style.setProperty("--s", "" + (1 - (a ? i : 0))), r += o.offsetHeight, i += .025;
            });
        }
    }, [
        a,
        f,
        s
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        ref: c,
        className: "Toastify",
        id: h,
        onMouseEnter: ()=>{
            s && (r(!1), B.pause());
        },
        onMouseLeave: E
    }, d((t, n)=>{
        const o = n.length ? {
            ...y
        } : {
            ...y,
            pointerEvents: "none"
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
            className: T(t),
            style: o,
            key: `container-${t}`
        }, n.map((t)=>{
            let { content: n, props: o } = t;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(R, {
                ...o,
                stacked: s,
                collapseAll: E,
                isIn: m(o.toastId, o.containerId),
                style: o.style,
                key: `toast-${o.key}`
            }, n);
        }));
    }));
}
;
 //# sourceMappingURL=react-toastify.esm.mjs.map
}}),
"[project]/node_modules/@heroicons/react/24/outline/esm/ArrowUpTrayIcon.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function ArrowUpTrayIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(ArrowUpTrayIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}}),
"[project]/node_modules/@heroicons/react/24/outline/esm/ArrowUpTrayIcon.js [app-client] (ecmascript) <export default as ArrowUpTrayIcon>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
__turbopack_esm__({
    "ArrowUpTrayIcon": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ArrowUpTrayIcon.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_b03bc2._.js.map