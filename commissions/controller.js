class requestHandler{
    // POST
    createCommission = (req, res)=>{
        let { body } = req
        res.status(201).send()
    }
    // GET
    getCommissions = (req, res)=>{
        res.status(200).send()
    }
    getCommissionById = (req, res)=>{
        let { params } = req
        res.status(200).send()
    }
    // PUT
    updateCommission = (req, res)=>{
        let { params, body } = req
        res.status(200).send()
    }
    // DELETE
    deleteCommission = (req, res)=>{
        let { params } = req
        res.status(200).send()
    }
}

module.exports = new requestHandler();