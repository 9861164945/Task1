import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  mobile_number: {
    type: String, // Changed from Number to String
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Validates exactly 10 digits
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  designation: {
    type: String,
    enum: ["Hr", "Manager", "Sales"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  course: {
    type: String,
    enum: ["Mca", "Bca", "Bsc"],
    required: true,
  },
  image: {
    type: String,
  },
}, { versionKey: false, timestamps: true });

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
