const app = require('express')();
const PORT = 8080

app.get('/', (req, res)=>{
    res.status(200).send()
})

app.listen(PORT, ()=>console.log(`Server running on https://localhost:${PORT}`));