import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FaBoxOpen, FaUsers } from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { GiExpense } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { LiaCashRegisterSolid } from 'react-icons/lia';
import { MdOutlineInventory2 } from 'react-icons/md';
import { RiMoneyRupeeCircleFill } from 'react-icons/ri';
import { TbTallymarks } from 'react-icons/tb';

export default function ReportsPage() {
  const sections = [
    {
      name: 'Financial',
      href: '/hotel/reports/financial',
      icon: <RiMoneyRupeeCircleFill className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Sales',
      href: '/hotel/reports/sales',
      icon: <FaMoneyBillTrendUp className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Purchases',
      href: '/hotel/reports/purchases',
      icon: <ShoppingCartIcon className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Expenses',
      href: '/hotel/reports/expenses',
      icon: <GiExpense className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Staff',
      href: '/hotel/reports/staff',
      icon: <FaUsers className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Customer',
      href: '/hotel/reports/customer',
      icon: <IoIosPeople className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Supplier',
      href: '/hotel/reports/supplier',
      icon: <FaBoxOpen className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Inventory',
      href: '/hotel/reports/inventory',
      icon: <MdOutlineInventory2 className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Galla',
      href: '/hotel/reports/galla',
      icon: <LiaCashRegisterSolid className="w-12 h-12 text-gray-500" />
    },
    {
      name: 'Tally',
      href: '/hotel/reports/tally',
      icon: <TbTallymarks className="w-12 h-12 text-gray-500" />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gradient">Reports</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link key={section.name} href={section.href} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              {section.icon}
              <h2 className="mt-4 text-lg font-semibold text-center text-gray-700">{section.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

