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

export function attendance_values_mapper(data) {
    const result = {
        Present: 0,
        Absent: 0,
        'Half-Day': 0
    };

    // Count attendance status
    data.forEach(record => {
        const status = record.Status || 'Absent';
        if (status === 'Present') {
            result.Present++;
        } else if (status === 'Half-Day') {
            result['Half-Day']++;
        } else {
            result.Absent++;
        }
    });

    return result;
}
