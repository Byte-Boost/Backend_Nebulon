const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./models');
const cors = require('cors');
const authMiddleware = require('./middleware/auth.middleware');
const admin = require('./services/admin.services');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nebulon API',
      version: '0.8.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());

app.use(express.json())

app.use('/account', require('./routes/account.routes'));

app.use(authMiddleware);
app.use('/commissions', require('./routes/commissions.routes'));
app.use('/products', require('./routes/products.routes'));
app.use('/clients', require('./routes/clients.routes'));
app.use('/sellers', require('./routes/sellers.routes'));

db.sequelize.sync().then(()=>{
  // Create an admin user if it doesn't exist
  admin.generateAdmin()
  app.listen(PORT, ()=>console.log(`Server running on https://localhost:${PORT}`));
});