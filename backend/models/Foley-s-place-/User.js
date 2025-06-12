const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { 
    type: String, 
    enum: ['admin', 'manager', 'sales', 'accountant'], 
    default: 'sales' 
  }
});
module.exports = mongoose.model('User', UserSchema);
