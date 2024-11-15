const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require('./configs/db');
const authUser = require('./controllers/auth.controller');
const userExpense = require('./controllers/expenses.controller');
const crypto1 = require('crypto');


app.use(express.json());
app.use(cors());


app.post("/register", authUser.registerUser);
app.post("/login", authUser.loginUser);
app.post("/expenses", userExpense.postExpense);
app.get("/expenses/:id", userExpense.getExpense);
app.patch("/expenses/:id", userExpense.updateExpense);
app.delete("/expenses/:id", userExpense.deleteExpense);
app.get('/analytics/:id', userExpense.analytics);


app.listen(3000, async () => {
    try {
        console.log('Server listening on port 3000');
        await connectDB();
    } catch (error) {

    }
})