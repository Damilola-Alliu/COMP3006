const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const secretKey = 'SecretKey'; 
const BooksModel = require('./models/Books'); 

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/COMP3006db")

