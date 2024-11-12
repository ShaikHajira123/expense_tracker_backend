const Expense = require('../models/expenses.model');

const postExpense = async (req, res) => {
    try {
        const { category, amount, date, description, userId } = req.body;
        const expense = new Expense({ category, amount, date, description });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};


const getExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ error: 'Expense not found' });
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

module.exports = { postExpense, getExpense, updateExpense, deleteExpense }