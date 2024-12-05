import billsCrud from "@/app/lib/crud/Bills";

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function processOrdersData(orders, filterFn = null) {
    const dateMap = new Map();
    let totalAmount = 0;
    let totalCount = 0;

    // Filter orders if filter function is provided
    const filteredOrders = filterFn ? orders.filter(filterFn) : orders;

    // Group orders by date
    filteredOrders.forEach(order => {
        const date = formatDate(new Date(order.createdAt));
        if (!dateMap.has(date)) {
            dateMap.set(date, { count: 0, amount: 0 });
        }
        dateMap.get(date).count += 1;
        dateMap.get(date).amount += order.TotalAmount || 0;
        totalCount += 1;
        totalAmount += order.TotalAmount || 0;
    });

    // Convert map to sorted arrays
    const sortedDates = Array.from(dateMap.keys()).sort((a, b) => new Date(a) - new Date(b));
    const counts = sortedDates.map(date => dateMap.get(date).count);
    const amounts = sortedDates.map(date => dateMap.get(date).amount);

    return {
        total: {
            count: totalCount,
            amount: totalAmount
        },
        chart: {
            Date: sortedDates,
            Count: counts,
            Amount: amounts
        },
        orders: filteredOrders
    };
}

export async function hotel_dashboard(data, tokenData) {
    try {
        const { from, to } = data;
        const hotel_id = tokenData.hotelId;

        if (!hotel_id || !from || !to) {
            return {
                returncode: 400,
                message: 'Invalid Input: hotel_id, from, and to dates are required',
                output: []
            };
        }

        // Convert input dates
        const fromDate = new Date(`${from}T00:00:00`);
        const toDate = new Date(`${to}T23:59:59`);

        // Fetch all bills for the hotel
        const response = await billsCrud.readBills(hotel_id);
        if (response.returncode !== 200) {
            return response;
        }

        // Filter orders by date range
        const orders = response.output.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= fromDate && orderDate <= toDate;
        });

        // Process different order categories
        const allOrders = processOrdersData(orders);
        const dineIn = processOrdersData(orders, order => order.Type === 'Dine-In');
        const takeaway = processOrdersData(orders, order => order.Type === 'Takeaway');
        const delivery = processOrdersData(orders, order => order.Type === 'Delivery');
        const swiggy = processOrdersData(orders, order => order.Source === 'Swiggy');
        const zomato = processOrdersData(orders, order => order.Source === 'Zomato');
        const qrOrders = processOrdersData(orders, order => order.Source === 'QR-Orders');

        return {
            returncode: 200,
            message: "Dashboard data fetched successfully",
            output: {
                Orders: {
                    All_Order: allOrders.total.count,
                    Dine_In: dineIn.total.count,
                    Takeaway: takeaway.total.count,
                    Delivery: delivery.total.count,
                    Swiggy: swiggy.total.count,
                    Zomato: zomato.total.count,
                    QR: qrOrders.total.count
                },
                Amount: {
                    All_Order: allOrders.total.amount,
                    Dine_In: dineIn.total.amount,
                    Takeaway: takeaway.total.amount,
                    Delivery: delivery.total.amount,
                    Swiggy: swiggy.total.amount,
                    Zomato: zomato.total.amount,
                    QR: qrOrders.total.amount
                },
                Chart: {
                    All_Order: allOrders.chart,
                    Dine_In: dineIn.chart,
                    Takeaway: takeaway.chart,
                    Delivery: delivery.chart,
                    Swiggy: swiggy.chart,
                    Zomato: zomato.chart,
                    QR: qrOrders.chart
                },
                Table: {
                    All: allOrders.orders,
                    Dine_In: dineIn.orders,
                    Takeaway: takeaway.orders,
                    Delivery: delivery.orders,
                    Swiggy: swiggy.orders,
                    Zomato: zomato.orders,
                    QR: qrOrders.orders
                }
            }
        };
    } catch (error) {
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
