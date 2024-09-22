function groupBy(arr, key) {
	return arr.reduce((acc, obj) => {
		const groupKey = key.split('.').reduce((o, k) => (o || {})[k], obj);
		if (!acc[groupKey]) {
			acc[groupKey] = {
				items: [],
				TotalAmount: 0,
				count: 0
			};
		}
		acc[groupKey].items.push(obj);
		acc[groupKey].TotalAmount += obj.TotalAmount || 0;
		acc[groupKey].count += 1;
		return acc;
	}, {});
}

export function sales_values_mapper(orders, key) {
	const groupByOrders = groupBy(orders, key);
	const totalAmt = [];
	const counts = [];
	const category = [];

	for (const [date, data] of Object.entries(groupByOrders)) {
		totalAmt.push(data.TotalAmount);
		counts.push(data.count);
		category.push(date);
	}

	return {
		Amount: totalAmt,
		Count: counts,
		Category: category
	}
}

export function payment_mode_values_mapper(data) {
	const summary = {
		'Cash': 0,
		'UPI': 0,
		'Credit': 0
	};

	// Iterate through each entry in the attendance data
	data.forEach(entry => {
		const type = entry.PaymentMode;

		// Check if the type is valid and increment the corresponding count
		if (summary.hasOwnProperty(type)) {
			summary[type]++;
		}
	});

	return summary;
}



function groupByExpenses(arr, key) {
	return arr.reduce((acc, obj) => {
		const groupKey = key.split('.').reduce((o, k) => (o || {})[k], obj);
		if (!acc[groupKey]) {
			acc[groupKey] = {
				items: [],
				TotalAmount: 0,
				count: 0
			};
		}
		acc[groupKey].items.push(obj);
		acc[groupKey].TotalAmount += obj.AmountPaid || 0;
		acc[groupKey].count += 1;
		return acc;
	}, {});
}


export function expenses_values_mapper(orders, key) {
	const groupByOrders = groupByExpenses(orders, key);
	const totalAmt = [];
	const counts = [];
	const category = [];

	for (const [date, data] of Object.entries(groupByOrders)) {
		totalAmt.push(data.TotalAmount);
		counts.push(data.count);
		category.push(date);
	}

	return {
		Amount: totalAmt,
		Count: counts,
		Category: category
	}
}
