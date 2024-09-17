import express from "express";
import multer from "multer";
import Employee from "../models/Employee.js";

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be stored in the 'uploads' directory

const router = express.Router();

// Getting all employee data
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
    console.log("Data fetched successfully!");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ message: "Error occurred while fetching data" });
  }
});

// Registering a new employee with form data
router.post("/register", upload.single('image'), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const employeeData = {
      name: req.body.name,
      email: req.body.email,
      mobile_number: req.body.mobile_number,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      image: req.file ? req.file.path : undefined, // Handle file if uploaded
    };

    const employee = new Employee(employeeData);
    const newEmployee = await employee.save();
    res.status(201).json({ newEmployee });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(400).send({ message: error.message });
  }
});

// Updating an employee
router.put("/employee/:id", upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEmployee = {
      ...req.body,
      image: req.file ? req.file.path : undefined, // Handle file if uploaded
    };

    const employee = await Employee.findByIdAndUpdate(id, updatedEmployee, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      res.status(404).send({ error: "Employee not found" });
    } else {
      res.status(200).send(employee);
      console.log("Employee updated:", employee);
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Deleting an employee
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      res.status(404).send({ error: "Employee not found" });
    } else {
      res.status(200).send({ message: "Delete successful" });
      console.log("Employee deleted:", employee);
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
