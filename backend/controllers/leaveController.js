import Leave from "../models/leave.model.js";
import Employee from "../models/employee.model.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    console.log("userId",userId);
    
    const employee = await Employee.findOne({ userId });
    // console.log(employee);
    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    // console.log(newLeave);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Salary add server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    let leaves = await Leave.find({ employeeId: id });
    if (!leaves || leaves.length === 0 ) {
      const employee = await Employee.findOne({ userId: id });
      leaves = await Leave.find({ employeeId: employee._id });
    }
    // const leaves= await Leave.find({ employeeId:id });
    // console.log(leaves);
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get leave server error" });
  }
};

const getLeaveAdminShow = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dept_name" },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get leave server error" });
  }
};

const getLeaveDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dept_name" },
        {
          path: "userId",
          select: "name profileImage",
        },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get leave detail server error" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, error: "Leave not founded" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, error: "get leave detail server error" });
  }
};
export { addLeave, getLeaves, getLeaveAdminShow, getLeaveDetails, updateLeave };
