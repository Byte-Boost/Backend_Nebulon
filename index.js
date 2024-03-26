const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use('/commissions', require('./commissions/routes'));

app.listen(PORT, ()=>console.log(`Server running on https://localhost:${PORT}`));