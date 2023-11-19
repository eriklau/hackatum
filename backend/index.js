const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());

const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'ok',
    })
})

app.post('/', jsonParser, async (req, res) => {
    try {
        const { body } = req;
        console.log("REQUEST:", body);
        const url = 'https://api.openai.com/v1/chat/completions';
        const headers = {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY}`
        };

        const response = await axios.post(url, body, { headers: headers })
    
        res.status(200).json(response.data);

      } catch (error) {
        // console.error(error.response.data)
        console.error(error)
        res.status(500).json({ message: "Something went wrong at /api" });
    }
})

app.listen(4000, () => console.log(`server is running on 4000`))