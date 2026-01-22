const express = require('express');
const cors = require('cors');
require('dotenv').config();
import path from 'path';

const router = require('./routes/emailRoutes')

const app = express();
app.use(express.static("dist"));

app.use(cors());
app.use(express.json());


app.use('/api', router);


app.get("*", (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running ')
})