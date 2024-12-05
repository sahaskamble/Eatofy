export function stock_values_mapper(data) {
    const result = {
        TotalStock: 0,
        TotalItems: 0,
        ItemsCount: {},
        StockValue: 0
    };

    data.forEach(record => {
        const quantity = record.Quantity || 0;
        const price = record.Price || 0;
        const itemName = record.ItemName || 'Unknown';

        result.TotalStock += quantity;
        result.StockValue += (quantity * price);
        
        if (!result.ItemsCount[itemName]) {
            result.ItemsCount[itemName] = 0;
            result.TotalItems++;
        }
        result.ItemsCount[itemName] += quantity;
    });

    return result;
}

export function values_mapper(data, key) {
    const result = {
        Labels: [],
        Values: [],
        Dates: []
    };

    // First collect all unique dates and items
    data.forEach(record => {
        if (!result.Dates.includes(record.Date)) {
            result.Dates.push(record.Date);
        }
        
        const itemName = record[key];
        if (!result.Labels.includes(itemName)) {
            result.Labels.push(itemName);
        }
    });

    // Initialize the values array with zeros
    result.Values = result.Labels.map(() => 
        new Array(result.Dates.length).fill(0)
    );

    // Fill in the values
    data.forEach(record => {
        const itemName = record[key];
        const dateIndex = result.Dates.indexOf(record.Date);
        const itemIndex = result.Labels.indexOf(itemName);
        
        if (itemIndex !== -1 && dateIndex !== -1) {
            result.Values[itemIndex][dateIndex] += record.Quantity || 0;
        }
    });

    return result;
}
