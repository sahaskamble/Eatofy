(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_126abb._.js", {

"[project]/src/app/offline/services/db.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/idb/build/index.js [app-client] (ecmascript)");
;
const DB_NAME = 'Eatofy';
const DB_VERSION = 1;
const STORES = {
    Bills: 'Bills',
    Customers: 'Customers',
    Menus: 'Menus',
    Sections: 'Sections',
    Staffs: 'Staffs',
    Tables: 'Tables',
    Orders: 'Orders',
    GSTSettings: 'GSTSettings',
    VATSettings: 'VATSettings',
    EatoCoinsSettings: 'EatoCoinsSettings',
    MenuCategory: 'MenuCategory'
};
class DatabaseService {
    constructor(){
        this.dbPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openDB"])(DB_NAME, DB_VERSION, {
            upgrade (db) {
                Object.values(STORES).forEach((storeName)=>{
                    if (!db.objectStoreNames.contains(storeName)) {
                        const store = db.createObjectStore(storeName, {
                            keyPath: '_id'
                        });
                        switch(storeName){
                            case 'Bills':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('synced', 'synced', {
                                    unique: false
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('TableId', 'TableId', {
                                    unique: false
                                });
                                break;
                            case 'Customers':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('synced', 'synced', {
                                    unique: false
                                });
                                store.createIndex('CustomerName', 'CustomerName', {
                                    unique: false
                                });
                                store.createIndex('Contact', 'Contact', {
                                    unique: false
                                });
                                break;
                            case 'Menus':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('SectionId', 'SectionId', {
                                    unique: false
                                });
                                store.createIndex('Type', 'Type', {
                                    unique: false
                                });
                                break;
                            case 'Sections':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('Type', 'Type', {
                                    unique: false
                                });
                                break;
                            case 'Staffs':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('Email', 'Email', {
                                    unique: true
                                });
                                break;
                            case 'Tables':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('SectionId', 'SectionId', {
                                    unique: false
                                });
                                break;
                            case 'Orders':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('synced', 'synced', {
                                    unique: false
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('BillId', 'BillId', {
                                    unique: false
                                });
                                store.createIndex('MenuId', 'MenuId', {
                                    unique: false
                                });
                                break;
                            case 'GSTSettings':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('Visibility', 'Visibility', {
                                    unique: false
                                });
                                break;
                            case 'VATSettings':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('Visibility', 'Visibility', {
                                    unique: false
                                });
                                break;
                            case 'EatoCoinsSettings':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                store.createIndex('Visibility', 'Visibility', {
                                    unique: false
                                });
                                break;
                            case 'MenuCategory':
                                store.createIndex('_id', '_id', {
                                    unique: true
                                });
                                store.createIndex('HotelId', 'HotelId', {
                                    unique: false
                                });
                                break;
                            default:
                                break;
                        }
                    }
                });
            }
        });
    }
    async getStore(storeName, mode = 'readonly') {
        if (!this.dbPromise) {
            throw new Error('Database is not initialized');
        }
        const db = await this.dbPromise;
        return db.transaction(storeName, mode).objectStore(storeName);
    }
    // Generic Add Method
    async add(storeName, data) {
        try {
            const store = await this.getStore(storeName, 'readwrite');
            const item = {
                _id: crypto.randomUUID(),
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                synced: 0
            };
            await store.add(item);
            return {
                returncode: 200,
                message: `${storeName.slice(0, -1)} Created Successfully (Offline)`,
                output: item
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    // Generic Get by Filter Method
    async getByFilter(storeName, filterKey, filterValue) {
        try {
            const store = await this.getStore(storeName);
            // Check if the filterKey is multilevel (contains dots)
            let result;
            if (filterKey.includes('.')) {
                // Handle multilevel keys
                result = await this.getByNestedKey(store, filterKey, filterValue);
            } else {
                // Handle simple keys
                const index = store.index(filterKey);
                result = await index.getAll(filterValue);
            }
            if (result.length === 0) {
                return {
                    returncode: 404,
                    message: "Not Found.",
                    output: []
                };
            }
            return {
                returncode: 200,
                message: `${storeName} Fetched Successfully (Offline)`,
                output: result
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    // Helper function to handle nested keys
    async getByNestedKey(store, filterKey, filterValue) {
        const keys = filterKey.split('.'); // Split the filterKey into levels
        const allItems = await store.getAll(); // Get all items from the store
        return allItems.filter((item)=>keys.reduce((nested, key)=>nested && nested[key] !== undefined ? nested[key] : null, item) === filterValue);
    }
    // Generic Update Method
    async update(storeName, id, data) {
        try {
            const store = await this.getStore(storeName, 'readwrite');
            const item = await store.get(id);
            if (!item) {
                return {
                    returncode: 404,
                    message: `${storeName.slice(0, -1)} not found`,
                    output: []
                };
            }
            const updatedItem = {
                ...item,
                ...data,
                updatedAt: new Date().toISOString(),
                synced: 0
            };
            await store.put(updatedItem);
            return {
                returncode: 200,
                message: `${storeName.slice(0, -1)} Updated Successfully (Offline)`,
                output: updatedItem
            };
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    // Generic Delete Method
    async delete(storeName, id) {
        try {
            const store = await this.getStore(storeName, 'readwrite');
            await store.delete(id);
            return {
                returncode: 200,
                message: `${storeName.slice(0, -1)} Deleted Successfully (Offline)`,
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
    // Bulk Update Method - For syncing data from server
    async bulkUpdate(storeName, items) {
        try {
            const store = await this.getStore(storeName, 'readwrite');
            for (const item of items){
                await store.put({
                    ...item,
                    synced: 1
                });
            }
            return {
                returncode: 200,
                message: `Bulk updated ${items.length} items in ${storeName}`,
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
    // Syncs data from the server (MongoDB) to a specific store in IndexedDB.
    async syncFromServer(storeName) {
        try {
            // Fetch updated records from the server via API
            const response = await fetch(`/api/sync/${storeName}/pull`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const result = await response.json();
                // Apply fetched data to IndexedDB
                await this.applyServerUpdates(storeName, result.output);
            }
        } catch (error) {
            console.log(`Error pulling ${storeName}:`, error);
        }
    }
    // Sync local changes in IndexedDB to MongoDB.
    async syncToServer(storeName, retries = 3, delay = 1000) {
        try {
            // Fetch unsynced records from IndexedDB
            const unsyncedRecords = await this.getUnsyncedRecords(storeName);
            if (unsyncedRecords.length === 0) {
                return;
            }
            // Push unsynced records to the server via API
            const response = await fetch(`/api/sync/${storeName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: unsyncedRecords
                })
            });
            if (response.ok) {
                const result = await response.json();
                // Mark records as synced in IndexedDB
                await this.markAsSynced(storeName, result.syncedIds);
                console.log(`Successfully synced ${storeName} to server.`);
            }
        } catch (error) {
            if (retries > 0) {
                await new Promise((res)=>setTimeout(res, delay));
                return this.syncToServer(storeName, retries - 1, delay * 2);
            }
        }
    }
    // Syncing Stores
    async syncStore(storeName) {
        await this.syncToServer(storeName);
        await this.syncFromServer(storeName);
    }
    // Initial Syncing
    async initialSync() {
        const stores = Object.keys(STORES);
        for (const storeName of stores){
            await this.syncStore(storeName);
        }
    }
    /*
	 * Supporting Functions 
	*/ // Retrieve unsynced records from a specific store.
    async getUnsyncedRecords(storeName) {
        const store = await this.getStore(storeName, 'readonly');
        return store.index('synced').getAll(0);
    }
    // Mark records as synced in IndexedDB.
    async markAsSynced(storeName, syncedIds) {
        const store = await this.getStore(storeName, 'readwrite');
        const tx = store.transaction;
        for (const id of syncedIds){
            const record = await store.get(id);
            if (record) {
                await store.delete(record);
            }
        }
        await tx.done;
    }
    // Applies server-side updates to a specific store in IndexedDB.
    async applyServerUpdates(storeName, data) {
        const store = await this.getStore(storeName, 'readwrite');
        const tx = store.transaction;
        await data.map(async (record)=>{
            await store.put({
                ...record,
                synced: 1,
                updatedAt: new Date().toISOString()
            });
        });
        await tx.done;
    }
}
const offlineDB = new DatabaseService();
const __TURBOPACK__default__export__ = offlineDB;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
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
"[project]/src/app/offline/crud/EatoCoinsSettings.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
;
class EatoCoinsSettings extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('EatoCoinsSettings');
    }
    async readSettings(hotel_id) {
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
const eatoCoinsSettingsCrud = new EatoCoinsSettings();
const __TURBOPACK__default__export__ = eatoCoinsSettingsCrud;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/GSTSettings.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
;
class GSTSettings extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('GSTSettings');
    }
    async readSettings(hotel_id) {
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
const gstSettingsCrud = new GSTSettings();
const __TURBOPACK__default__export__ = gstSettingsCrud;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/Orders.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Menus.js [app-client] (ecmascript)");
;
;
class OrdersCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('Orders');
    }
    async addOrder({ quantity, note, total_amount, menu_id, bill_id, status = "Ordered", hotel_id }) {
        try {
            // Validate required parameters
            if (!quantity || !menu_id || !bill_id || !hotel_id) {
                return {
                    returncode: 400,
                    message: "Missing required parameters for adding an order.",
                    output: []
                };
            }
            const menu_info = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].read('_id', menu_id);
            const normalizedData = {
                Quantity: quantity,
                Note: note,
                TotalAmount: total_amount,
                MenuId: menu_info.output[0],
                BillId: bill_id,
                Status: status,
                HotelId: hotel_id
            };
            // Check if the order exists for the given MenuId and BillId
            const order_exists = await this.read('MenuId._id', menu_id).then((result)=>result.output.filter((order)=>order.BillId === bill_id));
            if (order_exists.length > 0) {
                // Update existing order
                const existingOrder = order_exists[0];
                const updatedQuantity = (existingOrder.Quantity || 0) + quantity;
                const updatedTotalAmount = (existingOrder.TotalAmount || 0) + total_amount;
                const orderResult = await this.update(existingOrder._id, {
                    Quantity: updatedQuantity,
                    TotalAmount: updatedTotalAmount,
                    Status: status
                });
                return orderResult;
            } else {
                // Create new order
                const orderResult = await this.create(normalizedData);
                return orderResult;
            }
        } catch (error) {
            console.error('Error in addOrder:', error);
            return {
                returncode: 500,
                message: error.message || "Failed to add order",
                output: []
            };
        }
    }
    async readOrders(bill_id) {
        try {
            const result = await this.read('BillId', bill_id);
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async updateOrderStatus(order_id, status) {
        try {
            const result = await this.update(order_id, {
                Status: status
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
    async cancelOrder(order_id, reason) {
        try {
            const result = await this.update(order_id, {
                Reason: reason,
                Status: "Cancelled"
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
    async undoCancelOrder(order_id, status) {
        try {
            const result = await this.update(order_id, {
                Status: status,
                Reason: null
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
const ordersCrud = new OrdersCrud();
const __TURBOPACK__default__export__ = ordersCrud;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/VATSettings.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
;
class VATSettings extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('VATSettings');
    }
    async readSettings(hotel_id) {
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
const vatSettingsCrud = new VATSettings();
const __TURBOPACK__default__export__ = vatSettingsCrud;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/Bills.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Customers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$EatoCoinsSettings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/EatoCoinsSettings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$GSTSettings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/GSTSettings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Orders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Orders.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Tables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$VATSettings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/VATSettings.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
class BillsCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('Bills');
    }
    async createBill({ customer_name = null, contact = null, email = null, birthday = null, anniversary = null, apartment = null, street_address = null, landmark = null, city = null, state = null, zip_code = null, type = null, table_id = null, waiter_id = null, hotel_id = null, menu_data = null }) {
        try {
            // Default Invalid Checker
            if (hotel_id === null || type === null || menu_data === null) {
                return {
                    returncode: 400,
                    message: "Missing required parameters",
                    output: []
                };
            }
            // If the customer exists taking its id else Creating new one
            let customer_id = null;
            let customers = [];
            if (customer_name !== null) {
                const customerData = {
                    customer_name,
                    contact,
                    email,
                    street_address,
                    apartment,
                    landmark,
                    city,
                    state,
                    zip_code,
                    birthday,
                    anniversary,
                    hotel_id
                };
                const customer_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createCustomer(customerData);
                if (customer_result.returncode === 200) {
                    customers = customer_result.output;
                    customer_id = customer_result.output?._id || "";
                }
            }
            // Creating new bill
            let bill_id;
            const billData = {
                Type: type,
                TableId: table_id,
                WaiterId: waiter_id,
                HotelId: hotel_id,
                CustomerId: customer_id,
                Customers: customers,
                Orders: []
            };
            const bill_result = await this.create(billData);
            bill_id = bill_result.output._id;
            let error_flag1 = false;
            if (bill_result.returncode === 200) {
                // If table is assigned, update its status
                if (table_id) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].update(table_id, {
                        Status: "Booked"
                    });
                }
            } else {
                error_flag1 = true;
            }
            const OUTPUT = [];
            for (const order of menu_data){
                const { quantity, note, total_amount, menu_id, status = "Ordered" } = order;
                const order_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Orders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addOrder({
                    quantity,
                    note,
                    total_amount,
                    menu_id,
                    bill_id,
                    status,
                    hotel_id
                });
                if (order_result.returncode === 200) {
                    OUTPUT.push(order_result.output);
                } else {
                    error_flag1 = true;
                }
            }
            const adding_orders = await this.update(bill_id, {
                Orders: OUTPUT
            });
            if (adding_orders.returncode !== 200) {
                error_flag1 = true;
            }
            if (!error_flag1) {
                return {
                    returncode: 200,
                    message: "Bill Created.",
                    output: [
                        {
                            success: true
                        }
                    ]
                };
            } else {
                return {
                    returncode: 500,
                    message: "Error creating Bill in some sections",
                    output: []
                };
            }
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async addOrdersInBill(bill_id, orders) {
        const fetchBill = await this.read("_id", bill_id);
        const hotel_id = fetchBill.output[0].HotelId;
        let OUTPUT = fetchBill.output[0].Orders || []; // Ensure OUTPUT is initialized to an array
        for (const order of orders){
            const { quantity, note, total_amount, menu_id, status = "Ordered" } = order;
            // Add the order using ordersCrud
            const order_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Orders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addOrder({
                quantity,
                note,
                total_amount,
                menu_id,
                bill_id,
                status,
                hotel_id
            });
            if (order_result.returncode === 200) {
                // Check if the order already exists in OUTPUT
                const existingOrderIndex = OUTPUT.findIndex((existingOrder)=>existingOrder._id === order_result.output?._id);
                if (existingOrderIndex === -1) {
                    // Add to OUTPUT if not already present
                    OUTPUT.push(order_result.output);
                } else {
                    // Update the existing order if necessary
                    OUTPUT[existingOrderIndex] = order_result.output;
                }
            } else {
                // Handle errors (set a flag or take other action)
                error_flag = true;
            }
        }
        // Update the bill with the new orders array
        const adding_orders = await this.update(bill_id, {
            Orders: OUTPUT
        });
        return adding_orders;
    }
    async dineInRead(table_id) {
        try {
            const data = await this.read("TableId", table_id);
            if (data.returncode === 200) {
                const output = await data.output.filter((bill)=>{
                    if (bill.Status !== "Closed") {
                        return bill;
                    }
                });
                if (output.length > 0) {
                    return {
                        returncode: 200,
                        message: "Bill Fetched.",
                        output
                    };
                } else {
                    return {
                        returncode: 500,
                        message: "No Bills to be Fetched.",
                        output: []
                    };
                }
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
    async BillPayment({ bill_id, payment_mode, payment_status, balance_amount, eatocoins, delivery_rate, delivery_amount, discount_rate, discount_amount }) {
        try {
            const bill = await this.read("_id", bill_id);
            if (bill.returncode !== 200) {
                return bill;
            }
            const customer_id = bill.output[0].CustomerId;
            let menu_total = 0;
            // Calculate menu total
            if (bill.output[0].Orders) {
                menu_total = bill.output[0].Orders.reduce((total, order)=>{
                    return total + (order.MenuId ? order.MenuId.Price * order.Quantity : 0);
                }, 0);
            }
            // GST Params
            let gst_amount = 0;
            let cgst_rate = 0;
            let sgst_rate = 0;
            let cgst_amount = 0;
            let sgst_amount = 0;
            const gstSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$GSTSettings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].readSettings();
            if (gstSettings.output[0]?.Visibility) {
                gst_amount = menu_total * gstSettings.output[0].GSTPercent / 100;
                console.log(gst_amount);
                cgst_amount = gst_amount / 2 | 0;
                sgst_amount = gst_amount / 2 | 0;
                cgst_rate = gstSettings.output[0].GSTPercent / 2;
                sgst_rate = cgst_rate;
            }
            // Vat Params
            let vat_rate = 0;
            let vat_amount = 0;
            const vatSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$VATSettings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].readSettings();
            if (vatSettings.output[0]?.Visibility) {
                vat_rate = vatSettings.output[0].VATPercent;
                vat_amount = menu_total * vat_rate / 100;
            }
            // Delivery Params
            if (delivery_rate != 0) {
                delivery_amount = delivery_rate / 100 * menu_total;
            }
            // Total amount
            const total_amount = menu_total + cgst_amount + sgst_amount + vat_amount + delivery_amount;
            // Discount
            if (discount_rate != 0) {
                discount_amount = discount_rate / 100 * total_amount | 0;
            }
            // Calculating amount of bill
            let amount = total_amount - discount_amount;
            // Eatocoins Params 
            let eatocoins_rate = 0;
            let credit_eatocoins = 0;
            const eatocoinsSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$EatoCoinsSettings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].readSettings();
            if (eatocoinsSettings.output[0]?.Visibility) {
                eatocoins_rate = eatocoinsSettings.output[0].RedeemLimitPercent || 0;
                let redeem_limit_amt = eatocoinsSettings.output[0].RedeemLimitAmount || 0;
                let credit_limit_amt = eatocoinsSettings.output[0].CreditLimitAmt || 0;
                let credit_limit_rate = eatocoinsSettings.output[0].CreditLimitPercent || 0;
                // Check whether Amount is greater than Credit Limit 
                if (amount >= credit_limit_amt) {
                    credit_eatocoins = credit_limit_rate / 100 * total_amount | 0;
                }
                // Redeem
                if (eatocoins != 0) {
                    if (eatocoins_rate != 0) {
                        // Redeem limit
                        if (amount >= redeem_limit_amt) {
                            // Max Amount
                            const eatocoins_max = eatocoins_rate / 100 * total_amount | 0;
                            // If Eatocoins in input is greater than max amount
                            if (eatocoins > eatocoins_max) {
                                eatocoins = eatocoins_max;
                            }
                        } else {
                            eatocoins = 0;
                            eatocoins_rate = 0;
                        }
                    }
                } else {
                    eatocoins = 0;
                    eatocoins_rate = 0;
                }
            }
            // Update bill with calculated amounts
            const updateData = {
                MenuTotal: menu_total,
                VatAmount: vat_amount,
                CGSTAmount: cgst_amount,
                SGSTAmount: sgst_amount,
                DeliveryChargesAmount: delivery_amount,
                DiscountAmount: discount_amount,
                EatocoinsAmount: eatocoins,
                DeliveryChargesRate: `${delivery_rate} %`,
                DiscountRate: `${discount_rate} %`,
                CGSTRate: `${cgst_rate} %`,
                SGSTRate: `${sgst_rate} %`,
                VatRate: `${vat_rate} %`,
                EatocoinsRate: `${eatocoins_rate} %`,
                TotalAmount: total_amount,
                Amount: amount,
                BalanceAmount: balance_amount,
                PaymentMode: payment_mode,
                PaymentStatus: payment_status,
                Status: "Closed"
            };
            const result1 = await this.update(bill_id, updateData);
            if (result1.returncode === 200) {
                if (customer_id != null) {
                    const customer_info = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].read("_id", customer_id);
                    const eato_wallet = customer_info.output[0].EatocoinsWallet;
                    console.log('Wallet update data:', {
                        customer_id,
                        eato_wallet,
                        credit_eatocoins,
                        eatocoins
                    });
                    if (eato_wallet > eatocoins) {
                        credit_eatocoins = eato_wallet - eatocoins + credit_eatocoins;
                        const data = {
                            wallet: credit_eatocoins
                        };
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].updateWallet(customer_id, data);
                    } else if (credit_eatocoins > 0) {
                        credit_eatocoins = eato_wallet + credit_eatocoins;
                        const data = {
                            wallet: credit_eatocoins
                        };
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].update(customer_id, data);
                    }
                }
            }
            // Table Status
            if (result1.output.TableId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].updateTableStatus(result1.output.TableId, "Open");
            }
            return result1;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
}
const billsCrud = new BillsCrud();
const __TURBOPACK__default__export__ = billsCrud;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/Tables.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Bills$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Bills.js [app-client] (ecmascript)");
;
;
class TablesCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super("Tables");
    }
    async readTables(hotel_id) {
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
    async readTable(table_id) {
        try {
            const result = await this.read('_id', table_id);
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
            const result = await this.read('SectionId', section_id);
            return result;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async updateTableStatus(table_id, status) {
        try {
            // If setting to occupied, check if there are any open bills
            if (status === "Occupied") {
                const openBills = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Bills$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].read("TableId", table_id);
                if (openBills.output[0].Status === "Open") {
                    return {
                        returncode: 400,
                        message: "Cannot occupy table without an open bill",
                        output: []
                    };
                }
            }
            const result = await this.update(table_id, {
                Status: status
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/offline/crud/Staffs.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-client] (ecmascript)");
;
class StaffsCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
    constructor(){
        super('Staffs');
    }
    async fetchStaffByHotelId(hotel_id) {
        try {
            const staff = await this.read('HotelId', hotel_id);
            if (staff.returncode !== 200) {
                return {
                    returncode: 401,
                    message: "Staffs doesn't exist",
                    output: []
                };
            }
            return staff;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
    async fetchStaffByEmail(email) {
        try {
            const staff = await this.read('Email', email);
            if (staff.returncode !== 200) {
                return {
                    returncode: 401,
                    message: "Staff doesn't exist",
                    output: []
                };
            }
            return staff;
        } catch (error) {
            return {
                returncode: 500,
                message: error.message,
                output: []
            };
        }
    }
}
const staffsCrud = new StaffsCrud();
const __TURBOPACK__default__export__ = staffsCrud;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/hotel/(dashboard)/backup/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>BackupPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Customers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Menus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/MenuCategory.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Sections.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Tables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Staffs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Staffs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/react-toastify.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowDownTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownTrayIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ArrowDownTrayIcon.js [app-client] (ecmascript) <export default as ArrowDownTrayIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-client] (ecmascript) <export default as CheckCircleIcon>");
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
;
;
function BackupPage() {
    _s();
    const [pendingBackups, setPendingBackups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Check for pending backups on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackupPage.useEffect": ()=>{
            checkPendingBackups();
        }
    }["BackupPage.useEffect"], []);
    const checkPendingBackups = async ()=>{
        setIsLoading(true);
        try {
            const backupChecks = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].checkPendingBackups(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].checkPendingBackups(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].checkPendingBackups(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].checkPendingBackups(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].checkPendingBackups(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Staffs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].checkPendingBackups()
            ]);
            const pending = [];
            if (backupChecks[0].length > 0) pending.push({
                type: 'Customers',
                count: backupChecks[0].length
            });
            if (backupChecks[1].length > 0) pending.push({
                type: 'Menus',
                count: backupChecks[1].length
            });
            if (backupChecks[2].length > 0) pending.push({
                type: 'Menu Categories',
                count: backupChecks[2].length
            });
            if (backupChecks[3].length > 0) pending.push({
                type: 'Sections',
                count: backupChecks[3].length
            });
            if (backupChecks[4].length > 0) pending.push({
                type: 'Tables',
                count: backupChecks[4].length
            });
            if (backupChecks[5].length > 0) pending.push({
                type: 'Staff',
                count: backupChecks[5].length
            });
            setPendingBackups(pending);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Error checking pending backups');
            console.error(error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleBackup = async (type)=>{
        try {
            let result;
            switch(type){
                case 'Customers':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncToServer();
                    break;
                case 'Menus':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncToServer();
                    break;
                case 'Menu Categories':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncToServer();
                    break;
                case 'Sections':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncToServer();
                    break;
                case 'Tables':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncToServer();
                    break;
                case 'Staff':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Staffs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].syncToServer();
                    break;
                default:
                    throw new Error('Invalid backup type');
            }
            if (result.returncode === 200) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${type} backed up successfully`);
                checkPendingBackups(); // Refresh the pending backups list
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(result.message || `Failed to backup ${type}`);
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Error backing up ${type}`);
            console.error(error);
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
            }, void 0, false, {
                fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
            lineNumber: 93,
            columnNumber: 7
        }, this);
    }
    if (pendingBackups.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                    className: "h-24 w-24 text-green-500 mb-4"
                }, void 0, false, {
                    fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                    lineNumber: 102,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-gray-800 mb-2",
                    children: "You're All Set!"
                }, void 0, false, {
                    fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600",
                    children: "All your data is backed up and synchronized"
                }, void 0, false, {
                    fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
            lineNumber: 101,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-6",
                children: "Pending Backups"
            }, void 0, false, {
                fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                children: pendingBackups.map((backup, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>handleBackup(backup.type),
                        className: "bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-semibold text-gray-800",
                                                children: backup.type
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 mt-1",
                                                children: [
                                                    backup.count,
                                                    " ",
                                                    backup.count === 1 ? 'item' : 'items',
                                                    " pending"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowDownTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownTrayIcon$3e$__["ArrowDownTrayIcon"], {
                                        className: "h-6 w-6 text-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 text-sm text-gray-500",
                                children: [
                                    "Click to backup ",
                                    backup.type.toLowerCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {
                position: "bottom-right"
            }, void 0, false, {
                fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/hotel/(dashboard)/backup/page.js",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(BackupPage, "NklElp6Tb1k2UaGMuFHRsiDOFNI=");
_c = BackupPage;
var _c;
__turbopack_refresh__.register(_c, "BackupPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/hotel/(dashboard)/backup/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
"[project]/node_modules/idb/build/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "deleteDB": (()=>deleteDB),
    "openDB": (()=>openDB),
    "unwrap": (()=>unwrap),
    "wrap": (()=>wrap)
});
const instanceOfAny = (object, constructors)=>constructors.some((c)=>object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
        IDBDatabase,
        IDBObjectStore,
        IDBIndex,
        IDBCursor,
        IDBTransaction
    ]);
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey
    ]);
}
const transactionDoneMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject)=>{
        const unlisten = ()=>{
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = ()=>{
            resolve(wrap(request.result));
            unlisten();
        };
        const error = ()=>{
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    // This mapping exists in reverseTransformCache but doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx)) return;
    const done = new Promise((resolve, reject)=>{
        const unlisten = ()=>{
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = ()=>{
            resolve();
            unlisten();
        };
        const error = ()=>{
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get (target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done') return transactionDoneMap.get(target);
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set (target, prop, value) {
        target[prop] = value;
        return true;
    },
    has (target, prop) {
        if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    }
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function(...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(this.request);
        };
    }
    return function(...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function') return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest) return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value)) return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value)=>reverseTransformCache.get(value);
/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */ function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event)=>{
            upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
        });
    }
    if (blocked) {
        request.addEventListener('blocked', (event)=>blocked(// Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
            event.oldVersion, event.newVersion, event));
    }
    openPromise.then((db)=>{
        if (terminated) db.addEventListener('close', ()=>terminated());
        if (blocking) {
            db.addEventListener('versionchange', (event)=>blocking(event.oldVersion, event.newVersion, event));
        }
    }).catch(()=>{});
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */ function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) {
        request.addEventListener('blocked', (event)=>blocked(// Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
            event.oldVersion, event));
    }
    return wrap(request).then(()=>undefined);
}
const readMethods = [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
];
const writeMethods = [
    'put',
    'add',
    'delete',
    'clear'
];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop)) return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (// Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function(storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex) target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
replaceTraps((oldTraps)=>({
        ...oldTraps,
        get: (target, prop, receiver)=>getMethod(target, prop) || oldTraps.get(target, prop, receiver),
        has: (target, prop)=>!!getMethod(target, prop) || oldTraps.has(target, prop)
    }));
const advanceMethodProps = [
    'continue',
    'continuePrimaryKey',
    'advance'
];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
    get (target, prop) {
        if (!advanceMethodProps.includes(prop)) return target[prop];
        let cachedFunc = methodMap[prop];
        if (!cachedFunc) {
            cachedFunc = methodMap[prop] = function(...args) {
                advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
            };
        }
        return cachedFunc;
    }
};
async function* iterate(...args) {
    // tslint:disable-next-line:no-this-assignment
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) {
        cursor = await cursor.openCursor(...args);
    }
    if (!cursor) return;
    cursor = cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    // Map this double-proxy back to the original, so other cursor methods work.
    reverseTransformCache.set(proxiedCursor, unwrap(cursor));
    while(cursor){
        yield proxiedCursor;
        // If one of the advancing methods was not called, call continue().
        cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
        advanceResults.delete(proxiedCursor);
    }
}
function isIteratorProp(target, prop) {
    return prop === Symbol.asyncIterator && instanceOfAny(target, [
        IDBIndex,
        IDBObjectStore,
        IDBCursor
    ]) || prop === 'iterate' && instanceOfAny(target, [
        IDBIndex,
        IDBObjectStore
    ]);
}
replaceTraps((oldTraps)=>({
        ...oldTraps,
        get (target, prop, receiver) {
            if (isIteratorProp(target, prop)) return iterate;
            return oldTraps.get(target, prop, receiver);
        },
        has (target, prop) {
            return isIteratorProp(target, prop) || oldTraps.has(target, prop);
        }
    }));
;
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
"[project]/node_modules/@heroicons/react/24/outline/esm/ArrowDownTrayIcon.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function ArrowDownTrayIcon({ title, titleId, ...props }, svgRef) {
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
        d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(ArrowDownTrayIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}}),
"[project]/node_modules/@heroicons/react/24/outline/esm/ArrowDownTrayIcon.js [app-client] (ecmascript) <export default as ArrowDownTrayIcon>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
__turbopack_esm__({
    "ArrowDownTrayIcon": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowDownTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowDownTrayIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ArrowDownTrayIcon.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function CheckCircleIcon({ title, titleId, ...props }, svgRef) {
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
        d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(CheckCircleIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}}),
"[project]/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-client] (ecmascript) <export default as CheckCircleIcon>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
__turbopack_esm__({
    "CheckCircleIcon": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_126abb._.js.map