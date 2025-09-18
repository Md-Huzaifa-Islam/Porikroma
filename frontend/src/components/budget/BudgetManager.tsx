import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Plus,
  Minus,
  PieChart,
  TrendingUp,
  Users,
  Calendar,
  Receipt,
  AlertTriangle
} from 'lucide-react';
import Navbar from '../layout/Navbar';
import { useTrips } from '../../contexts/TripContext';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const BudgetManager = () => {
  const { user } = useAuth();
  const { trips, addExpense } = useTrips();
  const [selectedTrip, setSelectedTrip] = useState(trips[0] || null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseData, setExpenseData] = useState({
    category: 'Transport',
    amount: '',
    description: '',
    splitAmong: [user?.id || '']
  });

  const categories = [
    { name: 'Transport', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Accommodation', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Food', color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Activities', color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Shopping', color: 'text-pink-600', bg: 'bg-pink-50' },
    { name: 'Other', color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const getBudgetData = () => {
    if (!selectedTrip) return null;

    const totalBudget = selectedTrip.budget;
    const totalExpenses = selectedTrip.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remainingBudget = totalBudget - totalExpenses;
    const budgetUsed = (totalExpenses / totalBudget) * 100;

    const categoryExpenses = categories.map(category => {
      const categoryTotal = selectedTrip.expenses
        .filter(exp => exp.category === category.name)
        .reduce((sum, exp) => sum + exp.amount, 0);
      return {
        ...category,
        amount: categoryTotal,
        percentage: totalExpenses > 0 ? (categoryTotal / totalExpenses) * 100 : 0
      };
    });

    return {
      totalBudget,
      totalExpenses,
      remainingBudget,
      budgetUsed,
      categoryExpenses: categoryExpenses.filter(cat => cat.amount > 0)
    };
  };

  const handleAddExpense = () => {
    if (!selectedTrip || !expenseData.amount || !expenseData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    addExpense(selectedTrip.id, {
      category: expenseData.category,
      amount: parseFloat(expenseData.amount),
      description: expenseData.description,
      paidBy: user?.id || '',
      splitAmong: expenseData.splitAmong,
      date: new Date().toISOString()
    });

    setExpenseData({
      category: 'Transport',
      amount: '',
      description: '',
      splitAmong: [user?.id || '']
    });
    setShowAddExpense(false);
    toast.success('Expense added successfully!');
  };

  const budgetData = getBudgetData();

  if (trips.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No trips to manage budget for
            </h2>
            <p className="text-gray-500 mb-8">
              Create a trip first to start managing your travel budget
            </p>
            <button
              onClick={() => window.location.href = '/trip-planner'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Plan Your First Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Budget Manager</h1>
          <p className="text-gray-600">Track and manage your travel expenses</p>
        </motion.div>

        {/* Trip Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => setSelectedTrip(trip)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedTrip?.id === trip.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-800">{trip.title}</h3>
                <p className="text-sm text-gray-600">{trip.destination}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Budget: ৳{trip.budget.toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {budgetData && (
          <>
            {/* Budget Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ৳{budgetData.totalBudget.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(budgetData.budgetUsed, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {budgetData.budgetUsed.toFixed(1)}% used
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <Minus className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                      ৳{budgetData.totalExpenses.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedTrip?.expenses.length} transactions
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    budgetData.remainingBudget < 0 ? 'bg-red-50' : 'bg-green-50'
                  }`}>
                    <TrendingUp className={`w-6 h-6 ${
                      budgetData.remainingBudget < 0 ? 'text-red-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className={`text-2xl font-bold ${
                      budgetData.remainingBudget < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ৳{Math.abs(budgetData.remainingBudget).toLocaleString()}
                    </p>
                  </div>
                </div>
                {budgetData.remainingBudget < 0 && (
                  <div className="flex items-center space-x-1 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Over budget!</span>
                  </div>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Expense Breakdown</h2>
                  <PieChart className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-4">
                  {budgetData.categoryExpenses.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${category.bg.replace('bg-', 'bg-')}`}></div>
                        <span className="text-gray-800 font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ৳{category.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {category.percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {budgetData.categoryExpenses.length === 0 && (
                    <div className="text-center py-8">
                      <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No expenses recorded yet</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Recent Expenses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Expenses</h2>
                  <button
                    onClick={() => setShowAddExpense(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Expense</span>
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedTrip?.expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">{expense.description}</h3>
                        <p className="text-sm text-gray-600">{expense.category}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          ৳{expense.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Split among {expense.splitAmong.length}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Add Expense</h3>
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={expenseData.category}
                    onChange={(e) => setExpenseData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (৳)
                  </label>
                  <input
                    type="number"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={expenseData.description}
                    onChange={(e) => setExpenseData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What was this expense for?"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddExpense}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Expense
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetManager;