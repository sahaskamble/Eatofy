export function SubscriptionStatusValidator(value) {

  let validation_flag = false;
  var list = ["Waiting", "On Going", "Expired", "About to Expire"];

  list.map((item) => {
    if (value === item) {
      validation_flag = true;
    }
  });

  return validation_flag;
}

export function PaymentStatusValidator(value) {

  let validation_flag = false;
  var list = ["Paid", "Unpaid", "Part-Paid"];

  list.map((item) => {
    if (value === item) {
      validation_flag = true;
    }
  });

  return validation_flag;
}

export function PaymentModeValidator(value) {

  let validation_flag = false;
  var list = ["Cash", "UPI", "Credit-Card", "Due", "Part"];

  list.map((item) => {
    if (value === item) {
      validation_flag = true;
    }
  });

  return validation_flag;
}

export function OrderTypeValidator(value) {

  let validation_flag = false;
  var list = ["Takeaway", "Delivery", "Dine-In", "Swiggy", "Zomato", "QR-Orders"];

  list.map((item) => {
    if (value === item) {
      validation_flag = true;
    }
  });

  return validation_flag;
}

export function TableStatusValidator(value) {

  let validation_flag = false;
  var list = ["Booked", "Bill Pending", "Open"];

  list.map((item) => {
    if (value === item) {
      validation_flag = true;
    }
  });

  return validation_flag;
}

export function StockStatusValidator(value) {

  let validation_flag = false;
  var list = ["Available", "Low Stock", "Unavailable"];

  list.map((item) => {
    if (value === item) {
      validation_flag = true;
    }
  });

  return validation_flag;
}

export function AttendanceValidator(value) {

  let validation_flag = false;
  var list = ["Absent", "Present", "Half-Day"];

  list.map((item) => {
    if (value === item) {
      validation_flag = true;
    }
  });

  return validation_flag;
}

export function ExpenseCategoryValidator(value) {

  let validation_flag = false;
  var list = ["Salary", "Purchases", "Miscellaneous"];

  list.map((item) => {
    if (value === item) {
      validation_flag = true;
    }
  });

  return validation_flag;
}
