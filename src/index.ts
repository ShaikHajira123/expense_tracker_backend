const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());


app.listen(3000, () => {
    try {
        console.log('Server listening on port 3000');
    } catch (error) {

    }
})