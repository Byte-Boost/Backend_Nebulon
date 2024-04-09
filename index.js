const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./models');
const cors = require('cors');

app.use(cors());

app.use(express.json())

app.use('/commissions', require('./routes/commissions.routes'));
app.use('/products', require('./routes/products.routes'));
app.use('/clients', require('./routes/clients.routes'));
app.use('/sellers', require('./routes/sellers.routes'));

db.sequelize.sync().then(()=>{
  app.listen(PORT, ()=>console.log(`Server running on https://localhost:${PORT}`));
});