import offlineDB from "../services/db";

export class OfflineBaseCrud {
	constructor(storeName) {
		this.storeName = storeName;
		this.db = offlineDB;
	}

	// Create a new record
	async create(data) {
		try {
			const result = await this.db.add(this.storeName, data);
			return result;
		} catch (err) {
			return { returncode: 500, message: err.message, output: [] };
		}
	}

	// Read records with optional filters
	async read(filterKey, filterValue) {
		try {
			const result = await this.db.getByFilter(this.storeName, filterKey, filterValue);
			return result;
		} catch (err) {
			return { returncode: 500, message: err.message, output: [] };
		}
	}

	// Update a record
	async update(id, data) {
		try {
			const result = await this.db.update(this.storeName, id, data);
			return result;
		} catch (err) {
			return { returncode: 500, message: err.message, output: [] };
		}
	}

	// Delete a record
	async delete(id) {
		try {
			const result = await this.db.delete(this.storeName, id);
			return result;
		} catch (err) {
			return { returncode: 500, message: err.message, output: [] };
		}
	}

	// Delete Every Record
	async deleteEverything() {
		try {
			const result = await this.db.clear(this.storeName);
			return result;
		} catch (err) {
			return { returncode: 500, message: err.message, output: [] };
		}
	}


	// Bulk update records (e.g., after syncing)
	async bulkUpdate(items) {
		try {
			const result = await this.db.bulkUpdate(this.storeName, items);
			return result;
		} catch (err) {
			return { returncode: 500, message: err.message, output: [] };
		}
	}

	// Sync unsynced records from IndexedDB to MongoDB for this store. Pushes local changes to the server.
	async syncToServer() {
		try {
			const result = await this.db.syncToServer(this.storeName);
			return { returncode: 200, message: "Synced to Server Successfully", output: result };
		} catch (err) {
			return { returncode: 500, message: err.message, output: [] };
		}
	}

	// Fetch updates from MongoDB and apply them to IndexedDB for this store. Pulls server-side changes to the local database.
	async syncFromServer() {
		try {
			const result = await this.db.syncFromServer(this.storeName);
			return { returncode: 200, message: "Synced from Server Successfully", output: result };
		} catch (err) {
			return { returncode: 500, message: err.message, output: [] };
		}
	}
}
