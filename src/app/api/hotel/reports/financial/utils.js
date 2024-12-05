export function payment_mode_values_mapper(data) {
    const result = {
        Labels: [],
        Amount: [],
        Count: []
    };

    // Group data by PaymentMode
    const groupedData = data.reduce((acc, item) => {
        const mode = item.PaymentMode || 'Unknown';
        if (!acc[mode]) {
            acc[mode] = {
                amount: 0,
                count: 0
            };
        }
        acc[mode].amount += item.AmountPaid || item.GrandTotal || 0;
        acc[mode].count += 1;
        return acc;
    }, {});

    // Convert grouped data to arrays
    for (const [mode, values] of Object.entries(groupedData)) {
        result.Labels.push(mode);
        result.Amount.push(values.amount);
        result.Count.push(values.count);
    }

    return result;
}

export function sales_values_mapper(data, key) {
    const result = {
        Labels: [],
        Amount: [],
        Count: []
    };

    // Group data by the key
    const groupedData = data.reduce((acc, item) => {
        const keyValue = item[key] || 'Unknown';
        if (!acc[keyValue]) {
            acc[keyValue] = {
                amount: 0,
                count: 0
            };
        }
        acc[keyValue].amount += item.GrandTotal || 0;
        acc[keyValue].count += 1;
        return acc;
    }, {});

    // Convert grouped data to arrays
    for (const [label, values] of Object.entries(groupedData)) {
        result.Labels.push(label);
        result.Amount.push(values.amount);
        result.Count.push(values.count);
    }

    return result;
}

export function expenses_values_mapper(data, key) {
    const result = {
        Labels: [],
        Amount: [],
        Count: []
    };

    // Group data by the key
    const groupedData = data.reduce((acc, item) => {
        const keyValue = item[key] || 'Unknown';
        if (!acc[keyValue]) {
            acc[keyValue] = {
                amount: 0,
                count: 0
            };
        }
        acc[keyValue].amount += item.AmountPaid || 0;
        acc[keyValue].count += 1;
        return acc;
    }, {});

    // Convert grouped data to arrays
    for (const [label, values] of Object.entries(groupedData)) {
        result.Labels.push(label);
        result.Amount.push(values.amount);
        result.Count.push(values.count);
    }

    return result;
}
