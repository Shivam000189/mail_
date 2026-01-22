const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/emailRoutes')

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', router);


app.get("/", (req, res) => {
    res.send('Backend Working');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running ')
})