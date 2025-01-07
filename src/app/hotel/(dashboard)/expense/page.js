'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchExpenses, addExpense, editExpense, removeExpense } from './api';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    expense_name: '',
    date: '',
    note: '',
    payable_to: '',
    amount_paid: 0,
    amount_payable: 0,
    payment_status: '',
    payment_mode: '',
    cash: 0,
    upi: 0,
    credit_card: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const [isOpenEditPopup, setIsOpenEditPopup] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const data = await fetchExpenses();
      if (data.returncode === 200) {
        setExpenses(data.output);
      } else {
        toast.error(data.message || 'Failed to load expenses');
      }
    } catch (error) {
      toast.error('Error loading expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateExpense();
    } else {
      await createExpense();
    }
    setFormData({
      expense_name: '',
      date: '',
      note: '',
      payable_to: '',
      amount_paid: 0,
      amount_payable: 0,
      payment_status: '',
      payment_mode: '',
      cash: 0,
      upi: 0,
      credit_card: 0
    });
    setEditingId(null);
    setIsOpenAddPopup(false);
    setIsOpenEditPopup(false);
  };

  const createExpense = async () => {
    try {
      const response = await addExpense(formData);
      if (response.returncode === 200) {
        toast.success('Expense added successfully');
        loadExpenses();
      } else {
        toast.error(response.message || 'Failed to add expense');
      }
    } catch (error) {
      toast.error('Error adding expense');
    }
  };

  const updateExpense = async () => {
    try {
      const response = await editExpense(editingId, formData);
      if (response.returncode === 200) {
        toast.success('Expense updated successfully');
        loadExpenses();
      } else {
        toast.error(response.message || 'Failed to update expense');
      }
    } catch (error) {
      toast.error('Error updating expense');
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setFormData({
      expense_name: expense.expense_name,
      date: expense.date,
      note: expense.note,
      payable_to: expense.payable_to,
      amount_paid: expense.amount_paid,
      amount_payable: expense.amount_payable,
      payment_status: expense.payment_status,
      payment_mode: expense.payment_mode,
      cash: expense.cash,
      upi: expense.upi,
      credit_card: expense.credit_card
    });
    setEditingId(expense._id);
    setIsOpenEditPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await removeExpense(id);
        if (response.returncode === 200) {
          toast.success('Expense deleted successfully');
          loadExpenses();
        } else {
          toast.error(response.message || 'Failed to delete expense');
        }
      } catch (error) {
        toast.error('Error deleting expense');
      }
    }
  };

  const AddExpensePopup = () => {
    return (
      <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white w-96 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Add Expense</h2>
          <button onClick={() => setIsOpenAddPopup(false)} className="text-red-500 float-right">Close</button>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Expense Name" value={formData.expense_name} onChange={(e) => setFormData({ ...formData, expense_name: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="date" placeholder="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="text" placeholder="Payable To" value={formData.payable_to} onChange={(e) => setFormData({ ...formData, payable_to: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="number" placeholder="Amount Paid" value={formData.amount_paid} onChange={(e) => setFormData({ ...formData, amount_paid: Number(e.target.value) })} required className="border p-2 rounded mb-4 w-full" />
            <input type="number" placeholder="Amount Payable" value={formData.amount_payable} onChange={(e) => setFormData({ ...formData, amount_payable: Number(e.target.value) })} required className="border p-2 rounded mb-4 w-full" />
            <select value={formData.payment_status} onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })} required className="border p-2 rounded mb-4 w-full">
              <option value="">Select Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
            <select value={formData.payment_mode} onChange={(e) => setFormData({ ...formData, payment_mode: e.target.value })} required className="border p-2 rounded mb-4 w-full">
              <option value="">Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
            </select>
            <button type="submit" className="bg-red-500 text-white p-2 rounded">Add Expense</button>
          </form>
        </div>
      </div>
    );
  };

  const EditExpensePopup = () => {
    return (
      <div className="fixed z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white w-96 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
          <button onClick={() => setIsOpenEditPopup(false)} className="text-red-500 float-right">Close</button>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Expense Name" value={formData.expense_name} onChange={(e) => setFormData({ ...formData, expense_name: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="date" placeholder="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="text" placeholder="Payable To" value={formData.payable_to} onChange={(e) => setFormData({ ...formData, payable_to: e.target.value })} required className="border p-2 rounded mb-4 w-full" />
            <input type="number" placeholder="Amount Paid" value={formData.amount_paid} onChange={(e) => setFormData({ ...formData, amount_paid: Number(e.target.value) })} required className="border p-2 rounded mb-4 w-full" />
            <input type="number" placeholder="Amount Payable" value={formData.amount_payable} onChange={(e) => setFormData({ ...formData, amount_payable: Number(e.target.value) })} required className="border p-2 rounded mb-4 w-full" />
            <select value={formData.payment_status} onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })} required className="border p-2 rounded mb-4 w-full">
              <option value="">Select Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
            <select value={formData.payment_mode} onChange={(e) => setFormData({ ...formData, payment_mode: e.target.value })} required className="border p-2 rounded mb-4 w-full">
              <option value="">Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
            </select>
            <button type="submit" className="bg-red-500 text-white p-2 rounded">Edit Expense</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 pt-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <button onClick={() => setIsOpenAddPopup(true)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Add Expense</button>
      </div>
      {isOpenAddPopup && <AddExpensePopup />}
      {isOpenEditPopup && <EditExpensePopup />}
      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 mb-4">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map(expense => (
                    <tr key={expense._id}>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{expense.expense_name}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">₹{expense.amount_paid}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        <button onClick={() => handleEdit(expense)} className="text-blue-500 mr-2">Edit</button>
                        <button onClick={() => handleDelete(expense._id)} className="text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensePage;
