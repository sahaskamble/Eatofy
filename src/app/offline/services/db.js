import { openDB } from 'idb';

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
	MenuCategory: 'MenuCategory',
};

class DatabaseService {
	constructor() {
		this.dbPromise = openDB(DB_NAME, DB_VERSION, {
			upgrade(db) {
				Object.values(STORES).forEach((storeName) => {
					if (!db.objectStoreNames.contains(storeName)) {
						const store = db.createObjectStore(storeName, { keyPath: '_id' });
						switch (storeName) {
							case 'Bills':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('synced', 'synced', { unique: false });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('TableId', 'TableId', { unique: false });
								break;
							case 'Customers':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('synced', 'synced', { unique: false });
								store.createIndex('CustomerName', 'CustomerName', { unique: false });
								store.createIndex('Contact', 'Contact', { unique: false });
								break;
							case 'Menus':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('SectionId', 'SectionId', { unique: false });
								store.createIndex('Type', 'Type', { unique: false });
								break;
							case 'Sections':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('Type', 'Type', { unique: false });
								break;
							case 'Staffs':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('Email', 'Email', { unique: true });
								break;
							case 'Tables':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('SectionId', 'SectionId', { unique: false });
								break;
							case 'Orders':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('synced', 'synced', { unique: false });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('BillId', 'BillId', { unique: false });
								store.createIndex('MenuId', 'MenuId', { unique: false });
								break;
							case 'GSTSettings':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('Visibility', 'Visibility', { unique: false });
								break;
							case 'VATSettings':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('Visibility', 'Visibility', { unique: false });
								break;
							case 'EatoCoinsSettings':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								store.createIndex('Visibility', 'Visibility', { unique: false });
								break;
							case 'MenuCategory':
								store.createIndex('_id', '_id', { unique: true });
								store.createIndex('HotelId', 'HotelId', { unique: false });
								break;
							default:
								break;
						}
					}
				});
			},
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
				synced: 0,
			};
			await store.add(item);
			return {
				returncode: 200,
				message: `${storeName.slice(0, -1)} Created Successfully (Offline)`,
				output: item,
			};
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: [],
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
				}
			}


			return {
				returncode: 200,
				message: `${storeName} Fetched Successfully (Offline)`,
				output: result,
			};
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: [],
			};
		}
	}

	// Helper function to handle nested keys
	async getByNestedKey(store, filterKey, filterValue) {
		const keys = filterKey.split('.'); // Split the filterKey into levels
		const allItems = await store.getAll(); // Get all items from the store
		return allItems.filter((item) =>
			keys.reduce((nested, key) => (nested && nested[key] !== undefined ? nested[key] : null), item) === filterValue
		);
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
					output: [],
				};
			}
			const updatedItem = {
				...item,
				...data,
				updatedAt: new Date().toISOString(),
				synced: 0,
			};
			await store.put(updatedItem);
			return {
				returncode: 200,
				message: `${storeName.slice(0, -1)} Updated Successfully (Offline)`,
				output: updatedItem,
			};
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: [],
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
				output: [],
			};
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: [],
			};
		}
	}

	// Bulk Update Method - For syncing data from server
	async bulkUpdate(storeName, items) {
		try {
			const store = await this.getStore(storeName, 'readwrite');
			for (const item of items) {
				await store.put({
					...item,
					synced: 1, // Mark as synced
				});
			}
			return {
				returncode: 200,
				message: `Bulk updated ${items.length} items in ${storeName}`,
				output: [],
			};
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: [],
			};
		}
	}

	// Syncs data from the server (MongoDB) to a specific store in IndexedDB.
	async syncFromServer(storeName) {
		try {
			// Fetch updated records from the server via API
			const response = await fetch(`/api/sync/${storeName}/pull`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
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
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ data: unsyncedRecords }),
			});

			if (response.ok) {
				const result = await response.json();

				// Mark records as synced in IndexedDB
				await this.markAsSynced(storeName, result.syncedIds);
				console.log(`Successfully synced ${storeName} to server.`);
			}
		} catch (error) {
			if (retries > 0) {
				await new Promise(res => setTimeout(res, delay));
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
		for (const storeName of stores) {
			await this.syncStore(storeName);
		}
	}

	/*
	 * Supporting Functions 
	*/
	// Retrieve unsynced records from a specific store.
	async getUnsyncedRecords(storeName) {
		const store = await this.getStore(storeName, 'readonly');
		return store.index('synced').getAll(0);
	}

	// Mark records as synced in IndexedDB.
	async markAsSynced(storeName, syncedIds) {
		const store = await this.getStore(storeName, 'readwrite');
		const tx = store.transaction;
		for (const id of syncedIds) {
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
		await data.map(async (record) => {
			await store.put({
				...record,
				synced: 1, // Mark as synced
				updatedAt: new Date().toISOString(),
			});
		})
		await tx.done;
	}

}

const offlineDB = new DatabaseService();
export default offlineDB; 
