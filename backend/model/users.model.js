import mongoose from "mongoose";
// This is the schema for the user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can not insert the data because name is empty!"],
  },
  email: {
    type: String,
    required: [true, "Can not insert the data because email is empty!"],
  },
  password: {
    type: String,
    required: [true, "Can not insert the data because password is empty!"],
  },
  userName: { type: String },
  profilePicture: {
    type: Object,
  },
});

// Create the user model using the schema
const users = mongoose.model("users", userSchema);

export default users;
