const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const bcrypt = require("bcryptjs")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/COMP3006db")


// app.get('/getUsers', (req, res) => {
//     UserModel.find()
//     .then(users => res.json(users))
//     .catch(err => res.join(err))
// })

require("./models/Users")

const User = mongoose.model("Users")

app.post("/register", async(req, res) => {
    const{  Password, Email, Name, PhoneNumber } = req.body;

    const encryptPassword = await bcrypt.hash(Password, 10)

    try {

        const olduser = await User.findOne({ Email })

        if(olduser){
            return res.send({error: "User Already Exists"});
        }

        await User.create({
            Password: encryptPassword,
            Email,
            Name,
            PhoneNumber,
        });
        res.send({status: "ok"})
    } catch (error) {
        res.send({status: "error"})
    }
})

app.post('/', async (req, res) => {
    const { Email, Password } = req.body;
  
    const user = await User.findOne({ Email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const validPassword = await bcrypt.compare(Password, user.Password);
  
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

  
    res.status(200).json({ message: 'Login successful' });
  });


app.listen(3000, () => {
    console.log("Server is running")
})