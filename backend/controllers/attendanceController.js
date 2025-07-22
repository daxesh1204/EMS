import Attendance from "../models/Attendance.model.js";
import Employee from "../models/employee.model.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: [{ path: "department" }, { path: "userId" }],
    });
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    let { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];
    const employee = await Employee.findOne({ employeeId });
    // console.log(employee);
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true }
      // console.log("Status", status)
    );
    // console.log(attendance);

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: error.message });
  }
};

const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};
    if (date) {
      query.date = date;
    }
    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: [{ path: "department" }, { path: "userId" }],
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceData.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }

      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.dept_name,
        status: record.status || "Not Marked",
      });
      return result;
    }, {});
    return res.status(201).json({success:true,groupData})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
};
export { getAttendance, updateAttendance,attendanceReport };
