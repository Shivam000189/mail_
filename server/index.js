const express = require('express');
const cors = require('cors');
const router = require('./routes/emailRoutes')

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', router);


app.get("/", (req, res) => {
    res.send('Backend Working');
})


app.listen(5000, () => {
    console.log('Server is running ')
})