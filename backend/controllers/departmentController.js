import Departments from "../models/department.model.js";

const addDepartment = async (req, res) => {
  try {
    const { dept_name, description } = req.body;
    const newDept = new Departments({
      dept_name, //If the key and value is same then only write once=>/Actually like this dept_name:dept_name
      description,
    });
    await newDept.save();
    return res.status(200).json({ success: true, department: newDept });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Add department!! Internal server error",
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Departments.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const getDepartmentforUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Departments.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "edit department server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dept_name, description } = req.body;
    const updateDept = await Departments.findByIdAndUpdate(
      { _id: id },
      {
        dept_name,
        description,
      }
    );
    return res.status(200).json({ success: true, updateDept });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    // For only delete Department
    // const deleteDept = await Departments.findByIdAndDelete({ _id: id });

    // For all delete data related to deparment
    const deleteDept=await Departments.findById({_id:id});
    await deleteDept.deleteOne();
    return res.status(200).json({ success: true, deleteDept });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Delete department server error" });
  }
};
export {
  addDepartment,
  getDepartments,
  getDepartmentforUpdate,
  updateDepartment,
  deleteDepartment,
};
