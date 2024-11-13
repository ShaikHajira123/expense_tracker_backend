const mongoose2 = require('mongoose');

const expenseSchema = new mongoose2.Schema({
    userId: { type: mongoose2.Schema.Types.ObjectId, ref: 'users', required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
});

module.exports = mongoose2.model('expenses', expenseSchema);