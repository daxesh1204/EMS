import multer from "multer";
import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import path from "path";
// import department from "../models/department.model.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered in employee" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    // console.log(newUser);
    const savedUser = await newUser.save();
    // console.log(savedUser);

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    // console.log(newEmployee);
    await newEmployee.save();
    return res.status(200).json({ success: true, message: "employee created" });
  } catch (error) {
    console.error("Error in addEmployee:", error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error in getEmployee:", error);
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const getEmployeesForView = async (req, res) => {
  try {
    let employees;
    const { id } = req.params;
    employees = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (!employees) {
      employees = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get employees for views server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: true, error: "Update employees server error" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: true, error: "User not found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        salary,
      }
    );

    if (!updateEmployee || !updateUser) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Employee update successfully!!" });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: true, error: "Update employees server error" });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({ department: id });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get employeesbyDeptId server error" });
  }
};

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployeesForView,
  updateEmployee,
  fetchEmployeesByDepId,
};
