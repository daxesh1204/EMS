import Salary from "../models/salary.model.js";
import Employee from "../models/employee.model.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;
    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });
    await newSalary.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, error: "Salary add server error" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Salary get server error" });
  }
};
export { addSalary, getSalary };
