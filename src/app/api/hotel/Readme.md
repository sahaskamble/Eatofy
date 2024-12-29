# API Requests

*Remember that all these APIs can be accessed by Owner, Waiter and Backoffice only and needed to be Logged In before using them* 

----------------------------------------------------------------------------------

## Authentication

###### 1. Login User
/api/hotel/auth/login
`POST`
```json
{
    "email": "admin.eatofy@gmail.com",
    "password": "admin@123"
}
```

###### 2. Sign Out
/api/hotel/auth/logout
`POST`

----------------------------------------------------------------------------------

## Staff (Management)

###### 1. Fetch Staff Data
/api/hotel/staff/fetch
`GET`


###### 2. Add Staff
/api/hotel/staff/add
`POST`
```json
{
    "first_name": "Staff",
    "last_name": "Eatofy",
    "address": "India",
    "contact": "9090909090",
    "email": "staff@eatofy.com",
    "password": "staff123",
    "department_name": "Kitchen",
    "designation": "Waiter Head",
    "role": "Waiter",
    "salary": 10000,
    "incentives": 10,
    "hotel_id": "674cbfcb3176d2d888d597f6"
}
```

###### 3. Edit Staff Info (Even updates password)
/api/hotel/staff/edit
`PUT`
```json
{
    "staff_id": "674a2c60741fa940b316fb49",
    "first_name": "Staff",
    "last_name": "Eatofy",
    "address": "India",
    "contact": "9090909090",
    "email": "staff@eatofy.com",
    "password": "staff123",
    "department_name": "Kitchen",
    "designation": "Waiter Head",
    "role": "Waiter",
    "salary": 10000,
    "incentives": 10,
}
```

###### 4. Remove Staff 
/api/hotel/staff/remove
`DELETE`
```json
{
    "staff_id": "674a336cd990b1b70d2c7416"
}
```

---------------------------------------------------------------------------------

## Staff (Attendance)

###### 1. Add Attendance 
/api/hotel/staff/attendance/add
`POST`
```json
{
    "date": "30 November 2024",
    "type": "Present",
    "note": null,
    "staff_id": "674b7ca1219433ee5e28818e"
}
```

###### 2. Update Attendance 
/api/hotel/staff/attendance/edit
`PUT`
```json
{
    "attendance_id":  "674b9cb405657d1a152589d1",
    "staff_id": "674b7ca1219433ee5e28818e",
    "date": "30 November 2024",
    "type": "Present"
}
```

###### 3. Fetch All Attendances
/api/hotel/staff/attendance/fetch
`GET`


----------------------------------------------------------------------------------

## Sections


###### 1. Add Section
/api/hotel/sections/add
`POST`
```json
{
    "type": "Dine-In",
    "section_name": "Garden"
}
```

###### 2. Edit Section
/api/hotel/sections/edit
`PUT`
```json
{
    "type": "Dine-In",
    "section_name": "Garden",
    "section_id": "674a33e8d990b1b70d2c742c"
}
```

###### 3. Fetch Sections
/api/hotel/sections/fetch
`GET`

###### 4. Remove Sections
/api/hotel/sections/remove
`DELETE`
```json
{
    "section_id": "674a33e8d990b1b70d2c742c"
}
```

###### 5. Fetch Sections (Dine In)
/api/hotel/sections/filter/dine_in
`GET`

###### 6. Fetch Sections (Takeaway)
/api/hotel/sections/filter/takeaway
`GET`

###### 7. Fetch Sections (Delivery)
/api/hotel/sections/filter/delivery
`GET`

###### 8. Fetch Sections (Swiggy) 
/api/hotel/sections/filter/swiggy
`GET`

###### 9. Fetch Sections (Zomato) 
/api/hotel/sections/filter/zomato
`GET`

###### 10. Fetch Sections (QR Orders)
/api/hotel/sections/filter/qr_orders
`GET`

----------------------------------------------------------------------------------

## Tables

###### 1. Add Tables
/api/hotel/tables/add
`POST`
```json
{
    "table_name": "Table 1",
    "section_id": "674853c7bfd7dbd4d464d88c",
    "persons_occupiable": 4
}
```

###### 2. Auto Table Add
/api/hotel/tables/add/multiple
`POST`
```json
{
    "section_id": "674a3434d990b1b70d2c7446",
    "count": 10
}
```

###### 3. Fetch Tables
/api/hotel/tables/fetch
`GET`

###### 4. Change Table Status 
/api/hotel/tables/edit/status
`PUT`
```json
{
    "table_id": "674a3527d990b1b70d2c7461",
    "status": "Bill Pending"
}
```

###### 5. Update Table Info 
/api/hotel/tables/edit
`PUT`
```json
{
    "table_name": "Table 1",
    "table_id": "674a3527d990b1b70d2c7461",
    "persons_occupiable": 2
}
```

###### 6. Remove Table
/api/hotel/tables/remove
`DELETE`
```json
{
    "table_id": "674a3531d990b1b70d2c747d"
}
```

----------------------------------------------------------------------------------

## Menu Categories

###### 1. Add Category
/api/hotel/menu_categories/add
`POST`
```json
{
    "category_name": "Starters"
}
```

###### 2. Update Category Name
/api/hotel/menu_categories/edit
`PUT`
```json
{
    "category_name": "Starter",
    "category_id": "674866819f12298c9c333d58"
}
```

###### 3. Remove Category
/api/hotel/menu_categories/remove
`DELETE`
```json
{
    "category_id": "674866819f12298c9c333d58"
}
```

###### 4. Fetch Categories
/api/hotel/menu_categories/fetch
`GET`

----------------------------------------------------------------------------------

## Dishes

###### 1. Add Dish
/api/hotel/dishes/add
`POST`
```json
{
    "dish_name": "Paneer Masala",
    "code": "PM",
    "type": "Veg",
    "description": null,
    "category_id": "674866819f12298c9c333d58"
}
```

###### 2. Update Dish Info
/api/hotel/dishes/edit
`PUT`
```json
{
    "dish_id": "674882229f12298c9c333d63",
    "dish_name": "Paneer Masala",
    "code": "PM",
    "type": "Veg",
    "description": null
}
```

###### 3. Remove Dish
/api/hotel/dishes/remove
`DELETE`
```json
{
    "dish_id": "674a3b5ec4a419fbcf55c629"
}
```

###### 4. Fetch Dishes
/api/hotel/dishes/fetch
`GET`

----------------------------------------------------------------------------------

## Menus

###### 1. Add Menu (Multi-Level)
/api/hotel/menu/add
`POST`
```json
{
    "category_name": "Starters",
    "dish_name": "Paneer Chilly",
    "code": "PC",
    "type": "Veg",
    "description": null,
    "price": 70.00
}
```

###### 2.Update Price 
/api/hotel/menu/management/edit
`PUT`
```json
{
    "menu_id": "6748d537b75ed212bdb8460e",
    "price": 80.00
}
```

###### 3. Remove Menu
/api/hotel/menu/management/remove
`DELETE`
```json
{
    "menu_id": "6748d537b75ed212bdb8460e"
}
```

###### 4. Fetch (Multi-level)
/api/hotel/menu/fetch
`GET`

----------------------------------------------------------------------------------

## Cash Drawer

###### 1. Opening Balance
/api/hotel/cash_drawer/opening_balance
`POST`
```json
{
    "opening_balance": 10000
}
```

###### 2.Closing Balance
/api/hotel/cash_drawer/closing_balance
`PUT`
```json
{
    "closing_balance": 10000,
    "dropped_cash": 0,
    "cash_withdrawn": 0,
    "refunds": 0
}
```

###### 4. Opening Balance Check
/api/hotel/cash_drawer/opening_balance
`GET`

----------------------------------------------------------------------------------

## Bills

###### 1. Create Bill 
/api/hotel/bills/add
`POST`
```json
{
    "customer_name": "User",
    "contact": "9090909090",
    "type": "Dine-In",
    "menu_data": [
        {
            "quantity": 4,
            "note": null,
            "menu_id": "674cc0203176d2d888d59808",
            "total_amount": 280.00
        }
    ]
}
```

###### 2. Bill Payment 
/api/hotel/bills/edit/payment
`PUT`
```json
{
    "bill_id": "674b896489411559e2c69936",
    "eatocoins": 0,
    "balance_amount": 0,
    "discount_rate": 0,
    "discount_amount": 0,
    "payment_mode": "Cash",
    "payment_status": "Paid"
}
```

###### 3. Delete Bill
/api/hotel/bills/remove
`DELETE`
```json
{
    "bill_id": "674b8077219433ee5e2881c2"
}
```

###### 4. Fetch Bills (Hotel)
/api/hotel/bills/fetch
`GET`

###### 5. Order Cancel
/api/hotel/bills/order/cancel
`PUT`
```json
{
    "order_id": "674b896489411559e2c69939",
    "reason": "Wrong Input"
}
```

###### 5. Undo Order Cancel
/api/hotel/bills/order/undo
`PUT`
```json
{
    "order_id": "674b896489411559e2c69939"
}
```

###### 6. Add Items inside Bill 
/api/hotel/bills/order/add
`POST`
```json
{
    "response_data": [
        {
            "quantity": 4,
            "note": null,
            "menu_id": "674b7ce5219433ee5e28819d",
            "total_amount": 280.00
        }
    ],
    "bill_id": "674b8117219433ee5e2881c7"
}
```
----------------------------------------------------------------------------------

## Customers

###### 1. Add Customer
/api/hotel/customers/add
`POST`
```json
{    
    "customer_name": "User",
    "contact": "9090909090",
    "email": "user@gmail.com",
    "birthday": "08 November 2002",
    "anniversary": null,
    "apartment": "1/50, SkyLine Infra",
    "street_address": "Vice Road",
    "landmark": "Statue",
    "city": "Palghar",
    "state": "Maharashtra",
    "zip_code": "202134"

}
```

###### 2. Update Customer Info
/api/hotel/menu/management/edit
`PUT`
```json
{
    "customer_name": "Sahas",
    "contact": "9090909090",
    "email": "shashank@gmail.com",
    "birthday": "08 November 2002",
    "anniversary": null,
    "apartment": "1/50, SkyLine Infra",
    "street_address": "Vice Road",
    "landmark": "Statue",
    "city": "Palghar",
    "state": "Maharashtra",
    "zip_code": "202134",
    "customer_id": "674b7d04219433ee5e2881a5"
}
```

###### 3. Delete Customer
/api/hotel/customers/remove
`DELETE`
```json
{
    "customer_id": "674b7d04219433ee5e2881a5"
}
```

###### 4. Fetch Customers
/api/hotel/customers/fetch
`GET`

----------------------------------------------------------------------------------

## Eatocoins Settings

###### 1. Add or Update Settings
/api/hotel/settings/eatocoins/add
`POST`
```json
{
    "visibility": true,
    "credit_limit_amt": 1000,
    "credit_limit_percent": 40,
    "redeem_limit_amt": 500,
    "redeem_limit_percent": 30,
    "rate": 1
}
```

###### 2. Fetch Settings
/api/hotel/settings/eatocoins/fetch
`GET`

----------------------------------------------------------------------------------

## Invoice Printer Settings

###### 1. Add or Update Settings
/api/hotel/settings/printer/invoice/add
`POST`
```json
{
    "visibility": true,
    "network_ip": "192.168.1.123",
    "encoding": "End12",
    "bluetooth_mac": "01-23-45-67-89-ab"
}
```

###### 2. Fetch Settings
/api/hotel/settings/printer/invoice/fetch
`GET`

----------------------------------------------------------------------------------

## Kot Printer Settings

###### 1. Add or Update Settings
/api/hotel/settings/printer/kot/add
`POST`
```json
{
    "visibility": true,
    "network_ip": "192.168.1.123",
    "encoding": "End12",
    "bluetooth_mac": "01-23-45-67-89-ab"
}
```

###### 2. Fetch Settings
/api/hotel/settings/printer/kot/fetch
`GET`

----------------------------------------------------------------------------------

## Ebill Email Settings

###### 1. Add or Update Settings
/api/hotel/settings/ebill/email/add
`POST`
```json
{
    "visibility": true,
    "email": "user@gmail.com",
    "app_password": "zkam wkwm wkan",
    "upi_id": "user@okaxis.ltd",
    "merchant_name": "User Surname"
}
```

###### 2. Fetch Settings
/api/hotel/settings/ebill/email/add
`GET`

----------------------------------------------------------------------------------

## GST Settings

###### 1. Add or Update Settings
/api/hotel/settings/gst/add
`POST`
```json
{
    "visibility": true,
    "gst_percent": 10
}
```

###### 2. Fetch Settings
/api/hotel/settings/eatocoins/fetch
`GET`

----------------------------------------------------------------------------------

## VAT Settings

###### 1. Add or Update Settings
/api/hotel/settings/vat/add
`POST`
```json
{
    "visibility": true,
    "vat_percent": 16
}
```

###### 2. Fetch Settings
/api/hotel/settings/vat/fetch
`GET`

----------------------------------------------------------------------------------

## Reservations

###### 1. Add Reservation
/api/hotel/reservations/add
`POST`
```json
{
    "date": "30 November 2024",
    "time": "12:00 PM",
    "note": null,
    "contact": "1234567890",
    "customer_name": "Gaurav",
    "no_of_persons": 4
}
```

###### 2. Fetch Reservation
/api/hotel/reservations/fetch
`GET`

###### 3. Delete Reservation
/api/hotel/reservations/remove
`DELETE`
```json
{
    "reservation_id": "674b9b8105657d1a152589cb"
}
```

----------------------------------------------------------------------------------

## Expenses

###### 1. Add Expense
/api/hotel/expenses/add
`POST`
```json
{
    "expense_name": "Salary",
    "date": "1 December 2024",
    "note": null,
    "payable_to": "Staff",
    "amount_paid": 1000.00,
    "amount_payable": 0,
    "payment_status": "Paid",
    "payment_mode": "Cash",
    "cash": 1000.00,
    "upi": 0,
    "credit_card": 0
}
```

###### 2. Update Expense
/api/hotel/expenses/edit
`PUT`
```json
{
    "expense_id": "674cc18d3176d2d888d5981f",
    "expense_name": "Salary",
    "date": "1 December 2024",
    "note": null,
    "payable_to": "Shashank",
    "amount_paid": 1000.00,
    "amount_payable": 0,
    "payment_status": "Paid",
    "payment_mode": "Cash",
    "cash": 1000.00,
    "upi": 0,
    "credit_card": 0
}
```

###### 3. Delete Expense
/api/hotel/expenses/remove
`DELETE`
```json
{
    "expense_id": "674cc18d3176d2d888d5981f"
}
```

###### 4. Fetch Expense
/api/hotel/expenses/fetch
`GET`

----------------------------------------------------------------------------------

# Inventory

## Suppliers

###### 1. Add Suppliers
/api/hotel/inventory/suppliers/add
`POST`
```json
{
    "supplier_name": "User",
    "contact": "9090909090",
    "email": "user@eatofy.in",
    "gstin": "ASCKEMS345246",
    "address": "Dombivli",
    "supplier_type": "Groceries"
}
```

###### 2. Update Supplier Info
/api/hotel/inventory/suppliers/edit
`PUT`
```json
{
    "supplier_id": "674cc3993176d2d888d59828",
    "supplier_name": "User",
    "contact": "9090909090",
    "email": "user@eatofy.in",
    "gstin": "ASCKEMS345246",
    "address": "Dombivli",
    "supplier_type": "Groceries"
}
```

###### 3. Delete Supplier
/api/hotel/inventory/suppliers/remove
`DELETE`
```json
{
    "supplier_id": "674cc3993176d2d888d59828"
}
```

###### 4. Fetch Supplier
/api/hotel/inventory/suppliers/remove
`GET`


## Items

###### 5. Add Item (With Category)
/api/hotel/inventory/items/add
`POST`
```json
{
    "category_name": "Veggies",
    "unit": "KG",
    "item_name": "Potato"
}
```

###### 6. Update Item Name 
/api/hotel/inventory/items/edit
`PUT`
```json
{
    "item_id": "674cc54f3176d2d888d59841",
    "item_name": "Potato"
}
```

###### 7. Delete Item 
/api/hotel/inventory/items/remove
`DELETE`
```json
{
    "item_id": "674cc54f3176d2d888d59841"
}
```

###### 8. Fetch Items
/api/hotel/inventory/items/fetch
`GET`

###### 9. Delete Category
/api/hotel/inventory/items/remove
`DELETE`
```json
{
    "item_id": "674cc54f3176d2d888d59841"
}
```

###### 10. Fetch Item Categories
/api/hotel/inventory/item_categories/fetch
`GET`


## Purchases

###### 10. Add Purchase
/api/hotel/inventory/purchase/add
`POST`
```json
{
    "invoice_no": "001",
    "payment_mode": "Cash",
    "payment_status": "Paid",
    "amount_paid": 1000.00,
    "balance_amount": 0,
    "supplier_id": "674cc4433176d2d888d59833",
    "invoice_date": "1 December 2024",
    "cash": 1000.00,
    "upi": 0,
    "credit_card": 0,
    "stock_data": [
        {
            "item_id": "674cc7d53176d2d888d59867",
            "quantity": 10,
            "unit": "KG",
            "per_price": 100.00,
            "total_price": 1000.00
        }
    ]
}
```

###### 11. Bill Payment
/api/hotel/inventory/purchase/edit
`PUT`
```json
{
    "invoice_id": "674ccae03176d2d888d5988b",
    "payment_mode": "Cash",
    "payment_status": "Paid",
    "amount_paid": 1000.00,
    "balance_amount": 0,
    "cash": 1000.00,
    "upi": 0,
    "credit_card": 0
}
```

###### 12. Delete Invoice 
/api/hotel/inventory/purchase/remove
`DELETE`
```json
{
    "invoice_id": "674cca203176d2d888d5987b"
}
```

###### 13. Fetch Invoices 
/api/hotel/inventory/purchase/fetch
`GET`


## Stock

###### 14. Add Stock
/api/hotel/inventory/stock/add
`POST`
```json
{
    "item_id": "674cc7d53176d2d888d59867",
    "quantity": 20,
    "unit": "KG"
}
```

###### 15. Update Stock Quantity
/api/hotel/inventory/stock/edit
`PUT`
```json
{
    "stock_id": "674ccae03176d2d888d59894",
    "quantity": 20
}
```

###### 16. Remove Stock 
/api/hotel/inventory/stock/remove
`DELETE`
```json
{
    "stock_id": "674cc4433176d2d888d59833"
}
```

###### 17. Fetch Stock
/api/hotel/inventory/stock/fetch
`GET`

----------------------------------------------------------------------------------

## Bill Order 

###### 1. Dine-In 
/api/hotel/bill_order/dine_in
`POST`
```json
{
    "table_id": "674ccf8c3176d2d888d598ad"
}
```

###### 2. Takeaway
/api/hotel/bill_order/takeaway
`GET`

###### 3. Delivery
/api/hotel/bill_order/delivery
`GET`

###### 4. Swiggy
/api/hotel/bill_order/swiggy
`GET`

###### 5. Zomato
/api/hotel/bill_order/zomato
`GET`

###### 6. QR Orders
/api/hotel/bill_order/qr
`GET`

----------------------------------------------------------------------------------

## Reports

###### 1. Expenses
/api/hotel/reports/expenses
`GET`

###### 2. Staff 
/api/hotel/reports/staff
`GET`

###### 3. Financial 
/api/hotel/reports/financial
`GET`

###### 4. Inventory
/api/hotel/reports/inventory
`GET`

###### 5. Purchase
/api/hotel/reports/purchases
`GET`

###### 6. Tally
/api/hotel/reports/tally
`GET`

###### 7. Galla
/api/hotel/reports/galla
`GET`

###### 8. Sales 
/api/hotel/reports/sales
`GET`

----------------------------------------------------------------------------------

## Stock Report

###### 1. Add
/api/hotel/stock_report/add
`POST`

###### 2. Fetch
/api/hotel/stock_report/fetch
`GET`

----------------------------------------------------------------------------------
