module.exports = {

"[project]/src/app/offline/services/db.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/idb/build/index.js [app-ssr] (ecmascript)");
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
        this.dbPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openDB"])(DB_NAME, DB_VERSION, {
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
}}),
"[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "OfflineBaseCrud": (()=>OfflineBaseCrud)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$services$2f$db$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/services/db.js [app-ssr] (ecmascript)");
;
class OfflineBaseCrud {
    constructor(storeName){
        this.storeName = storeName;
        this.db = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$services$2f$db$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
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
}}),
"[project]/src/app/offline/crud/Customers.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
;
class CustomersCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
}}),
"[project]/src/app/offline/crud/Menus.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
;
class MenusCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
}}),
"[project]/src/app/offline/crud/MenuCategory.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
;
class MenuCategory extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
}}),
"[project]/src/app/offline/crud/Sections.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
;
class SectionsCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
}}),
"[project]/src/app/offline/crud/EatoCoinsSettings.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
;
class EatoCoinsSettings extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
}}),
"[project]/src/app/offline/crud/GSTSettings.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
;
class GSTSettings extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
}}),
"[project]/src/app/offline/crud/Orders.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Menus.js [app-ssr] (ecmascript)");
;
;
class OrdersCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
            const menu_info = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].read('_id', menu_id);
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
}}),
"[project]/src/app/offline/crud/VATSettings.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
;
class VATSettings extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
}}),
"[project]/src/app/offline/crud/Bills.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Customers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$EatoCoinsSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/EatoCoinsSettings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$GSTSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/GSTSettings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Orders$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Orders.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Tables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$VATSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/VATSettings.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
class BillsCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
                const customer_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCustomer(customerData);
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
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].update(table_id, {
                        Status: "Booked"
                    });
                }
            } else {
                error_flag1 = true;
            }
            const OUTPUT = [];
            for (const order of menu_data){
                const { quantity, note, total_amount, menu_id, status = "Ordered" } = order;
                const order_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Orders$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addOrder({
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
            const order_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Orders$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addOrder({
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
            const gstSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$GSTSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].readSettings();
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
            const vatSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$VATSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].readSettings();
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
            const eatocoinsSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$EatoCoinsSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].readSettings();
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
                    const customer_info = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].read("_id", customer_id);
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
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].updateWallet(customer_id, data);
                    } else if (credit_eatocoins > 0) {
                        credit_eatocoins = eato_wallet + credit_eatocoins;
                        const data = {
                            wallet: credit_eatocoins
                        };
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].update(customer_id, data);
                    }
                }
            }
            // Table Status
            if (result1.output.TableId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].updateTableStatus(result1.output.TableId, "Open");
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
}}),
"[project]/src/app/offline/crud/Tables.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Bills$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Bills.js [app-ssr] (ecmascript)");
;
;
class TablesCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
                const openBills = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Bills$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].read("TableId", table_id);
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
}}),
"[project]/src/app/offline/crud/Staffs.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/BaseCrud.js [app-ssr] (ecmascript)");
;
class StaffsCrud extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$BaseCrud$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfflineBaseCrud"] {
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
}}),
"[project]/src/app/hotel/(dashboard)/restore/page.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>RestorePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Customers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/react-toastify.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Menus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/MenuCategory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Sections.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Tables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Staffs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/Staffs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$GSTSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/GSTSettings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$VATSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/VATSettings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$EatoCoinsSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/offline/crud/EatoCoinsSettings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ArrowUpTrayIcon.js [app-ssr] (ecmascript) <export default as ArrowUpTrayIcon>");
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
;
;
;
;
function RestorePage() {
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [menus, setMenus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [menuCategories, setMenuCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tables, setTables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [staff, setStaff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingStates, setLoadingStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        customers: false,
        menus: false,
        menuCategories: false,
        tables: false,
        staffs: false,
        sections: false
    });
    const [restoreAllLoading, setRestoreAllLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchCustomers = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].readCustomers();
            if (result.returncode === 200) {
                setCustomers(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch customers');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error fetching customers');
            console.error(error);
        }
    };
    const fetchMenus = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].readMenus();
            if (result.returncode === 200) {
                setMenus(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Menus');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Menus');
        }
    };
    const fetchMenuCategories = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].readMenuCategories();
            if (result.returncode === 200) {
                setMenuCategories(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Menu Categories');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Menu Categories');
        }
    };
    const fetchTables = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].readTables();
            if (result.returncode === 200) {
                setTables(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Tables');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Tables');
            console.error(error);
        }
    };
    const fetchSections = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].readAllSections();
            if (result.returncode === 200) {
                setSections(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Sections');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Sections');
        }
    };
    const fetchStaffs = async ()=>{
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Staffs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fetchStaffByHotelId();
            if (result.returncode === 200) {
                setStaff(result.output);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Staff');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Staff');
            console.error(error);
        }
    };
    const fetchSettings = async ()=>{
        try {
            const gst_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$GSTSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            const vat_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$VATSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            const eatocoins_result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$EatoCoinsSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            if (gst_result.returncode === 200 && vat_result.returncode === 200 && eatocoins_result.returncode === 200) {
                gst_result;
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to fetch Staff');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Error fetching Staff');
            console.error(error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchCustomers();
        fetchMenus();
        fetchMenuCategories();
        fetchSections();
        fetchTables();
        fetchStaffs();
        fetchSettings();
    }, []);
    const handleRestore = async (type)=>{
        setLoadingStates((prev)=>({
                ...prev,
                [type]: true
            }));
        try {
            let result;
            switch(type){
                case 'customers':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchCustomers();
                    }
                    break;
                case 'menus':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchMenus();
                    }
                    break;
                case 'menu Categories':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchMenuCategories();
                    }
                    break;
                case 'sections':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchSections();
                    }
                    break;
                case 'tables':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchTables();
                    }
                    break;
                case 'staffs':
                    result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Staffs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
                    if (result.returncode === 200) {
                        await fetchTables();
                    }
                    break;
                default:
                    throw new Error('Invalid restore type');
            }
            if (result.returncode === 200) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`${type.charAt(0).toUpperCase() + type.slice(1)} restored successfully`);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(result.message || `Failed to restore ${type}`);
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error.message || `Error restoring ${type}`);
        } finally{
            setLoadingStates((prev)=>({
                    ...prev,
                    [type]: false
                }));
        }
    };
    const handleRestoreAll = async ()=>{
        setRestoreAllLoading(true);
        setLoadingStates((prev)=>({
                customers: true,
                menus: true,
                menuCategories: true,
                tables: true,
                staffs: true,
                sections: true
            }));
        try {
            const customersResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Customers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            if (customersResult.returncode === 200) {
                await fetchCustomers();
            }
            const menusResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Menus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            if (menusResult.returncode === 200) {
                await fetchMenus();
            }
            const menuCategoriesResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$MenuCategory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            if (menuCategoriesResult.returncode === 200) {
                await fetchMenuCategories();
            }
            const sectionsResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Sections$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            if (sectionsResult.returncode === 200) {
                await fetchSections();
            }
            const tablesResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Tables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            if (tablesResult.returncode === 200) {
                await fetchTables();
            }
            const staffResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$offline$2f$crud$2f$Staffs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].syncFromServer();
            if (staffResult.returncode === 200) {
                await fetchStaffs();
            }
            await fetchSettings();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('All data restored successfully!');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error.message || 'Error restoring all data');
            console.error(error);
        } finally{
            setRestoreAllLoading(false);
            setLoadingStates((prev)=>({
                    customers: false,
                    menus: false,
                    menuCategories: false,
                    tables: false,
                    staffs: false,
                    sections: false
                }));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between pb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold mb-6",
                        children: "Data From Server"
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleRestoreAll,
                        disabled: restoreAllLoading,
                        className: `bg-red-500 text-white px-4 rounded-xl flex items-center h-12 ${loadingStates.customers ? 'opacity-50 cursor-not-allowed' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                className: "h-5 w-5 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            loadingStates.customers ? 'Restoring...' : 'Restore Everything'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Customers"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('customers'),
                                    disabled: loadingStates.customers,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.customers ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 284,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.customers ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 296,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "City"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Wallet"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: customers.length > 0 ? customers.map((customer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 307,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.CustomerName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 308,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.Contact
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 309,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.Email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 310,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.City
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 311,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: customer.Wallet || 0
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 312,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 306,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Customers Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 317,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 316,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 301,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Menus"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('menus'),
                                    disabled: loadingStates.menus,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.menus ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 337,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.menus ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 346,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 347,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Code"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Description"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Section"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 350,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 351,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Type"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 352,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Price"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 353,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 345,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: menus.length > 0 ? menus.map((menu, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 362,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.DishName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 363,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.Code
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 364,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.Description || "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 365,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.SectionId.SectionName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 366,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.CategoryId.CategoryName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 367,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.DishId.Type
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 368,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.Price
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 369,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 361,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Menus Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 374,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 373,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 343,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Menu Categories"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 386,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('menu Categories'),
                                    disabled: loadingStates.menuCategories,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.menus ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 394,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.menuCategories ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 403,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 404,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 402,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: menuCategories.length > 0 ? menuCategories.map((menu, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 413,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: menu.CategoryName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 414,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 412,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Menu Categories Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 419,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 418,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 407,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 399,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 384,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Sections"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 431,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('sections'),
                                    disabled: loadingStates.sections,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.sections ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 439,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.sections ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 433,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 432,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 448,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 449,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Type"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 450,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 447,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 446,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: sections.length > 0 ? sections.map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 459,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: section.SectionName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 460,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: section.Type
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 461,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 458,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Sections Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 466,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 465,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 453,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 445,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 444,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 429,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Tables"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 478,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('tables'),
                                    disabled: loadingStates.tables,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.tables ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 486,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.tables ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 480,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 479,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 477,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 495,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 496,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Capacity"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 494,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 493,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: tables.length > 0 ? tables.map((table, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 506,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: table.TableName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 507,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: [
                                                        table.PersonsOccupiable,
                                                        " Persons"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 508,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 505,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Tables Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 513,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 512,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 500,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 492,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 491,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 476,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Staff"
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 525,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleRestore('staffs'),
                                    disabled: loadingStates.staffs,
                                    className: `bg-green-500 text-white px-4 py-2 rounded flex items-center ${loadingStates.staffs ? 'opacity-50 cursor-not-allowed' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowUpTrayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpTrayIcon$3e$__["ArrowUpTrayIcon"], {
                                            className: "h-5 w-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 533,
                                            columnNumber: 15
                                        }, this),
                                        loadingStates.staffs ? 'Restoring...' : 'Restore'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 527,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Sr.No"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 542,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 544,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 545,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Department"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 546,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-bold text-gray-100 uppercase tracking-wider",
                                                children: "Designation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                lineNumber: 547,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 541,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 540,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "bg-white divide-y divide-gray-200",
                                    children: staff.length > 0 ? staff.map((person, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 556,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: [
                                                        person.FirstName,
                                                        " ",
                                                        person.LastName
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 557,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: person.Contact
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 558,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: person.Email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 559,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: person.DepartmentName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 560,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 whitespace-nowrap",
                                                    children: person.Designation
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                                    lineNumber: 561,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 555,
                                            columnNumber: 23
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 text-center",
                                            colSpan: "8",
                                            children: "No Staff Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                            lineNumber: 566,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                        lineNumber: 565,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                                    lineNumber: 550,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                            lineNumber: 539,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                        lineNumber: 538,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 523,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastContainer"], {
                position: "top-right"
            }, void 0, false, {
                fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
                lineNumber: 575,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/hotel/(dashboard)/restore/page.js",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/hotel/(dashboard)/restore/page.js [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=src_app_50dac5._.js.map