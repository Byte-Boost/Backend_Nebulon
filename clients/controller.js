class requestHandler{
    // POST
    createClient = (req, res)=>{
        let { body } = req
        res.status(201).send()
    }
    // GET
    getClients = (req, res)=>{
        res.status(200).send()
    }
    getClientById = (req, res)=>{
        let { params } = req
        res.status(200).send()
    }
    // PUT
    updateClient = (req, res)=>{
        let { params, body } = req
        res.status(200).send()
    }
    // DELETE
    deleteClient = (req, res)=>{
        let { params } = req
        res.status(200).send()
    }
}

module.exports = new requestHandler();