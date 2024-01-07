const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
   FullName: String,
   Email:{ type: String, unique: true },
   PhoneNumber: String,
   Password: String,
   isAdmin: Boolean
});

const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
