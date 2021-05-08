const express = require('express');
const env = require('dotenv');
const app = express();
require("./db/conn");
const cors = require('cors');
const path = require('path');

//import routes here
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const initialDataRoutes = require('./routes/admin/initialData');
const cartRoutes = require('./routes/cart');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

// environment variable or you can say constrants
env.config();
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', cartRoutes);
app.use('/api', pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);


app.listen(process.env.PORT, () => {
    console.log(`server is running at port no ${process.env.PORT}`);
})