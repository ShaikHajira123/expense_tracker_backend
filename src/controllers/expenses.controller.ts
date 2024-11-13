const Expense = require('../models/expenses.model');
const mongoose1 = require('mongoose');
const User1 = require('../models/user.model');

const postExpense = async (req, res) => {
    try {
        const { category, amount, date, description, userId } = req.body;
        const expense = new Expense({ category, amount, date, description , userId});
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};


const getExpense = async (req, res) => {
    try {
        const { category, startDate, endDate, minAmount, maxAmount } = req.query;

        // Build query conditions
        const conditions: any = { userId: req.params.id };

        if (category) conditions.category = category;
        if (startDate) conditions.date = { $gte: new Date(startDate) };
        if (endDate) conditions.date = { $lte: new Date(endDate) };
        if (minAmount) conditions.amount = { $gte: parseFloat(minAmount) };
        if (maxAmount) conditions.amount = { $lte: parseFloat(maxAmount) };
        let expense = await Expense.find(conditions).lean().exec();
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve expense' });
    }
};


const updateExpense = async (req, res) => {
    try {
        const { category, amount, date, description } = req.body;
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { category, amount, date, description },
            { new: true } // Return the updated document
        );
        if (!expense) return res.status(404).json({ error: 'Expense not found' });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
};


const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) return res.status(404).json({ error: 'Expense not found' });
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};


const analytics =  async (req, res) => {
    try {
        const userId  = req.params.id;
        const categoryExpenses = await Expense.aggregate([
            { $match: { userId: new mongoose1.Types.ObjectId(userId) } },
            { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } },
        ]);

        const monthlyExpenses = await Expense.aggregate([
            { $match: { userId: new mongoose1.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: { year: { $year: '$date' }, month: { $month: '$date' } },
                    totalAmount: { $sum: '$amount' },
                },
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
        ]);

        const user = await User1.findById(new mongoose1.Types.ObjectId(userId));
        const monthlyLimit = user.monthlyLimit;
        const categoryPercentage = categoryExpenses.map((expense) => {
            const percentage = (expense.totalAmount / monthlyLimit) * 100;
            return { ...expense, percentage };
        });

        res.json({ categoryExpenses: categoryPercentage, monthlyExpenses });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};


module.exports = { postExpense, getExpense, updateExpense, deleteExpense, analytics }