const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a Username!"],
    unique: [true, "Username Exist"],
  },
  // password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
