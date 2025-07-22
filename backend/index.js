import express from 'express';
import cors from "cors";
import authRouter from './routes/auth.route.js';
import departmentRouter from "./routes/department.route.js";
import employeeRouter from "./routes/employee.route.js";
import salaryRouter from "./routes/salary.route.js";
import leaveRouter from "./routes/leave.route.js";
import settingRouter from "./routes/setting.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import connectToDb from './db/db.js';



if(connectToDb()){
  console.log("MongoDB connected")
};
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));
app.use('/api/auth',authRouter);
app.use('/api/department',departmentRouter);
app.use('/api/employee',employeeRouter);
app.use('/api/salary',salaryRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/setting',settingRouter);
app.use('/api/dashboard',dashboardRouter);
app.use('/api/attendance',attendanceRouter);


// FOR CHECKING PORT ISSUE
// app.use('/test',(req,res)=>{
//   return res.status(200).send("Backend running");
// })

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
});
