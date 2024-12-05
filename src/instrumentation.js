import connect from '@/app/lib/db'
import mongoose from 'mongoose';
import { billsSchema } from './app/lib/models/Bills';
import { cashDrawerSchema } from './app/lib/models/CashDrawer';
import { customerSchema } from './app/lib/models/Customers';
import { dishesSchema } from './app/lib/models/Dishes';
import { eatocoinsSettingsSchema } from './app/lib/models/EatoCoinsSettings';
import { ebillEmailSettingsSchema } from './app/lib/models/EbillEmailSettings';
import { expensesSchema } from './app/lib/models/Expenses';
import { gstSettingsSchema } from './app/lib/models/GstSettings';
import { HotelSubscriptionSchema } from './app/lib/models/HotelSubscription';
import { HotelSchema } from './app/lib/models/Hotels';
import { inventoryStockSchema } from './app/lib/models/InventoryStock';
import { invoicePrinterSettingsSchema } from './app/lib/models/InvoicePrinterSettings';
import { itemCategorySchema } from './app/lib/models/ItemCategories';
import { itemSchema } from './app/lib/models/Items';
import { kotPrinterSettingsSchema } from './app/lib/models/KotPrinterSettings';
import { menuCategorySchema } from './app/lib/models/MenuCategory';
import { menusSchema } from './app/lib/models/Menus';
import { notificationSchema } from './app/lib/models/Notifications';
import { ordersSchema } from './app/lib/models/Orders';
import { purchasedInvoiceSchema } from './app/lib/models/PurchasedInvoice';
import { purchasedStockSchema } from './app/lib/models/PurchasedStock';
import { ReservationSchema } from './app/lib/models/Reservation';
import { SectionsSchema } from './app/lib/models/Sections';
import { staffAttendanceSchema } from './app/lib/models/StaffAttendance';
import { staffSchema } from './app/lib/models/Staffs';
import { StockReportSchema } from './app/lib/models/StockReport';
import { SubscriptionSchema } from './app/lib/models/Subscription';
import { supplierSchema } from './app/lib/models/Suppliers';
import { tableSchema } from './app/lib/models/Tables';
import { vatSettingsSchema } from './app/lib/models/VatSettings';
import { EatofyStaffSchema } from './app/lib/models/EatofyStaff';

export async function register() {
  try {
    await connect();
    await initializeModels();
    console.log("✅ Database connected and models initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
  }
}

async function initializeModels() {
  const modelDefinitions = [
    { name: 'EatofyStaff', schema: EatofyStaffSchema },
    { name: 'Hotels', schema: HotelSchema },
    { name: 'Subscriptions', schema: SubscriptionSchema },
    { name: 'HotelSubscription', schema: HotelSubscriptionSchema },
    { name: 'Sections', schema: SectionsSchema },
    { name: 'Tables', schema: tableSchema },
    { name: 'Reservations', schema: ReservationSchema },
    { name: 'MenuCategory', schema: menuCategorySchema },
    { name: 'Dishes', schema: dishesSchema },
    { name: 'Menus', schema: menusSchema },
    { name: 'Suppliers', schema: supplierSchema },
    { name: 'ItemCategory', schema: itemCategorySchema },
    { name: 'Items', schema: itemSchema },
    { name: 'PurchasedInvoice', schema: purchasedInvoiceSchema },
    { name: 'PurchasedStock', schema: purchasedStockSchema },
    { name: 'InventoryStock', schema: inventoryStockSchema },
    { name: 'StockReport', schema: StockReportSchema },
    { name: 'Staffs', schema: staffSchema },
    { name: 'StaffAttendance', schema: staffAttendanceSchema },
    { name: 'Customers', schema: customerSchema },
    { name: 'Orders', schema: ordersSchema },
    { name: 'Bills', schema: billsSchema },
    { name: 'Expenses', schema: expensesSchema },
    { name: 'GstSettings', schema: gstSettingsSchema },
    { name: 'VatSettings', schema: vatSettingsSchema },
    { name: 'EatoCoinsSettings', schema: eatocoinsSettingsSchema },
    { name: 'KotPrinterSettings', schema: kotPrinterSettingsSchema },
    { name: 'InvoicePrinterSettings', schema: invoicePrinterSettingsSchema },
    { name: 'EbillEmailSettings', schema: ebillEmailSettingsSchema },
    { name: 'Notifications', schema: notificationSchema },
    { name: 'CashDrawer', schema: cashDrawerSchema }
  ];

  for (const { name, schema } of modelDefinitions) {
    try {
      // Check if model exists, if not create it
      mongoose.models[name] || mongoose.model(name, schema);

      // For Eatofy Staff, ensure at least one admin exists
      if (name === 'EatofyStaff') {
        const EatofyStaff = mongoose.model(name);
        const adminExists = await EatofyStaff.exists({});

        if (!adminExists) {
          await EatofyStaff.create({
            FirstName: 'Super',
            LastName: 'Admin',
            Email: 'admin@eatofy.com',
            Password: 'admin123', // Will be hashed by pre-save hook
            Role: 'Administration'
          });
          console.log(`✅ Created default root admin: admin@eatofy.com`);
        }
      }

      console.log(`✅ Model initialized: ${name}`);
    } catch (error) {
      console.error(`❌ Error initializing model ${name}:`, error);
    }
  }
}
