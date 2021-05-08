const express = require('express');
const app = express();
const PORT = 5000
require("./db/conn");
require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));




app.get('/', (req, res) => {
    res.send("Hello word");
})
app.get('/home', (req, res) => {
    res.send("Home");
})
app.get('/business', (req, res) => {
    res.send("Start Business");
})
app.get('/shopping', (req, res) => {
    res.send("Start sShopping");
})
app.get('/services', (req, res) => {
    res.send("Our services");
})
app.get('/about', (req, res) => {
    res.send("About Us");
})
app.get('/contact', (req, res) => {
    res.send("Contact Us");
})

app.listen(PORT, () => {
    console.log("server is running on ", PORT);
})