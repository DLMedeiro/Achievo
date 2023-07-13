// Schema and all fields we want a user to have
// Mongoose = ODM to interact with MongoDB
import { Schema, model} from 'mongoose';


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
    // Automatically creates an add and update timestamp
  }
);

export default model("User", userSchema)