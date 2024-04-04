

export default class passHash{
    hashes = async(password) => {
        const bcrypt = require('bcrypt')
        const salt = await bcrypt.genSalt()  //create a random salt that goes before the password, like eUsFhiYouPassword
        const hashed = await bcrypt.hash(password, salt)  //Hash the password using the salt, is hashing like this password => eusfhiYouPassword
        console.log(hashed)
        return hashed
    }
    
    compareHash = async(password, hash) => {
        const bcrypt = require('bcrypt')
        console.log(hash)
        return await bcrypt.compare(password,hash)
    }
}


