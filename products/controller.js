class requestHandler{
    // POST
    createProduct = (req, res)=>{
        let { body } = req
        res.status(201).send()
    }
    // GET
    getProducts = (req, res)=>{
        res.status(200).send()
    }
    getProductById = (req, res)=>{
        let { params } = req
        res.status(200).send()
    }
    // PUT
    updateProduct = (req, res)=>{
        let { params, body } = req
        res.status(200).send()
    }
    // DELETE
    deleteProduct = (req, res)=>{
        let { params } = req
        res.status(200).send()
    }
}

module.exports = new requestHandler();