const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    
    Password: String,
    Email: { type: String, unique: true},
    Name: String,
    PhoneNumber: String
})

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel