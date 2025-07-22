import mongoose from "mongoose"
const AttendanceSchema=new mongoose.Schema({
  date:{
    type:String, //format "YYYY-MM-DD"
    required:true
  },
  employeeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"employee",
    required:true,
  },
  status:{
    type:String,
    enum:["Present","Absent","Slick","Leave"],
    dafault:null
  }
})

const Attendance=mongoose.model("Attendance",AttendanceSchema);
export default Attendance;
