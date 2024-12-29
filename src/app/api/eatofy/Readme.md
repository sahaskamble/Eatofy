# API Requests

*Remember that all these APIs can be accessed by Administration and Management only and needed to be Logged In before using them* 

----------------------------------------------------------------------------------

## Authentication

###### 1. Register User
/api/eatofy/authentication/register
`POST`
```json
{
    "firstName": "Admin",
    "lastName": "Eatofy",
    "email": "admin.eatofy@gmail.com",
    "password": "admin@123",
    "role": "Administration"
}
```

###### 2. Login User
/api/eatofy/authentication/login
`POST`
```json
{
    "email": "admin.eatofy@gmail.com",
    "password": "admin@123"
}
```

###### 3. Forgot Password
/api/eatofy/authentication/forgot-password
`PUT`
```json
{
    "email": "admin.eatofy@gmail.com",
    "newPassword": "admin@123"
}
```

###### 4. Sign Out
/api/eatofy/authentication/logout
`POST`

###### 5. Delete User 
/api/eatofy/authentication/delete
`DELETE`
```json
{
    "email": "admin.eatofy@gmail.com",
}
```


----------------------------------------------------------------------------------

## Dashboard

###### 1. Fetch Data
/api/eatofy/dashboard
`GET`

----------------------------------------------------------------------------------

## Hotels

###### 1. Add Hotels  
/api/eatofy/hotel/add
`POST` `FORMDATA`
```json
{
    "hotel_name": "Appniche",
    "email": "morderncafe@gmail.com",
    "address": "Dombivli",
    "speciality": [
        "Chinese",
        " Indian"
    ],
    "contacts": [
        "0000000000"
    ],
    "website": null,
    "fssai_code": "HJBJCHGUDGCJD",
    "gstin": "JGDCJGDJJ",
    "logo": Image
    "first_name": "Owner",
    "last_name": "Eatofy",
    "address": "India",
    "contact": "9090909090",
    "email": "owner@eatofy.com",
    "password": "owner123",
    "department_name": "Board of Directors",
    "designation": "Owners",
}
```

###### 2. Update Hotel Info 
/api/eatofy/hotel/edit/logo
`PUT`
```json
{
    "hotel_id": "6746f33f5676da5ad5adbf06",
    "hotel_name": "Appniche",
    "email": "morderncafe@gmail.com",
    "address": "Dombivli",
    "speciality": [
        "Chinese",
        " Indian"
    ],
    "contacts": [
        "0000000000"
    ],
    "website": null,
    "fssai_code": "HJBJCHGUDGCJD",
    "gstin": "JGDCJGDJJ",
}
```

###### 3. Update Hotel Profile
/api/eatofy/hotel/edit/logo
`PUT` `FORMDATA`
```json
{
    "hotel_id": "6746f33f5676da5ad5adbf06",
    "hotel_name": "Appniche",
    "logo": Image
}
```

###### 4. Fetch All Hotels
/api/eatofy/hotel/fetch
`GET`

###### 5. Fetch By Hotel Name
/api/eatofy/hotel/fetch
`POST`
```json
{
    "hotel_name": "Appniche"
}
```

###### 6. Fetch By Hotel Id
/api/eatofy/hotel/fetch/id
`POST`
```json
{
    "hotel_id":"6745c0851f9e619753e9ef96"
}
```

###### 7. Delete Hotels
/api/eatofy/hotel/remove
`DELETE`
```json
{
    "hotel_id": "6746f31b5676da5ad5adbf00"
}
```

----------------------------------------------------------------------------------

## Subscription


###### 1. Add Subscription 
/api/eatofy/subscription/add
`POST`
```json
{
    "subscription_name": "Base (Half Yearly)",
    "price": 4000,
    "validity": 182
}
```

###### 2. Edit Subscription
/api/eatofy/subscription/edit
`POST`
```json
{
    "subscription_id": "6746f4555676da5ad5adbf10",
    "subscription_name": "Base (Yearly)",
    "price": 6000,
    "validity": 365
}
```

###### 3. Fetch Subscriptions
/api/eatofy/subscription/fetch
`GET`

###### 4. Remove Subscription
/api/eatofy/subscription/remove
`POST`
```json
{
    "subscription_id": "6746f4555676da5ad5adbf10"
}
```

----------------------------------------------------------------------------------

## Hotel Subscription

###### 1. Add Hotel Subscription 
/api/eatofy/hotel_subscription/add
`POST`
```json
{
    "hotel_id": "6746f33f5676da5ad5adbf06",
    "subscription_id": "6746f4555676da5ad5adbf10",
    "is_valid": false,
    "start_date": "27 November 2024",
    "end_date": "27 November 2025",
    "payment_status": "Paid",
    "payment_mode": "Cash",
    "cash": 6000,
    "upi": 0,
    "credit_card": 0
}
```

###### 2. Pay Hotel Subscription 
/api/eatofy/hotel_subscription/edit/payment
`POST`
```json
{
    "hotel_subscription_id": "6746f8185676da5ad5adbf23",
    "payment_status": "Paid",
    "payment_mode": "Part",
    "cash": 3000,
    "upi": 3000,
    "credit_card": 0
}
```

###### 3. Fetch Subscribed Hotels
/api/eatofy/hotel_subscription/fetch/subscribed
`GET`

###### 4. Fetch Unsubscribed Hotels
/api/eatofy/hotel_subscription/fetch/unsubscribed
`GET`

###### 5. Deactivate Current Subscription 
/api/eatofy/hotel_subscription/deactivate
`POST`
```json
{
    "hotel_subscription_id": "6746f8185676da5ad5adbf23",
    "is_valid": false
}
```
