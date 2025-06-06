import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import connectDB from "./utils/db.js";
import bookRoute from "./routes/book.routes.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import planRouter from "./routes/plan.routes.js";
import bookRoutes from "./routes/book.routes.js";
import eventRoutes from "./routes/eventRoutes.js";
import examRoutes from './routes/examRoutes.js';
import loanRoutes from "./routes/loan.routes.js"; // Ensure the path is correct
import ticketRoutes from "./routes/ticketRoutes.js";
import Library from "./models/library.model.js"; // <-- Import the Library model
import studentRoutes from './routes/student.routes.js'; // Your student routes
import seatRoutes from './routes/seat.routes.js'; // Your seat booking routes
import { Attendance } from "./models/attendanceSchema.model.js";
import admitCardRoutes from "./routes/admitCardRoutes.js";
import FeeData from "./models/feeDataSchema.model.js"; // <-- Import the FeeData model
import studyCenterRoutes from "./routes/studyCenterRoutes.js";
import searchRoutes from './routes/searchRoutes.js';
import animalRoutes from "./routes/animal.route.js";
import humanRoutes from "./routes/humanBeingRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js"
import materialRoutes from "./routes/materialRoutes.js";
import joinedRoutes from './routes/joinedRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import scheduleRoutes from  './routes/scheduleRoutes.js';
import resumeRoutes from './routes/resume.routes.js';
import companyRoutes from './routes/companyRoutes.js';
import balanceSheetRoutes from './routes/balanceSheetRoutes.js';
import enquiryRoutes from './routes/gymenquiryRoutes.js'
import exerciseRoutes from './routes/gymexerciseRoutes.js'
import machineMaintenanceRoutes from './routes/aharmachineMaintenanceRoutes.js'
import productMaintenanceRoutes from './routes/aharproductMaintenanceRoutes.js'
import staffAttendanceRoutes from './routes/staffAttendanceRoutes.js'
import aharsmpurnattendanceRoutes from './routes/aharsmpurnattendanceRoutes.js';
import inventoryRoutes from './routes/aharinventoryRoutes.js'
import demandinventoryRoutes from './routes/DemandinventoryRoutes.js'
import reuseinventoryRoutes from './routes/ReuseinventoryRoutes.js'
import organizationRoutes from './routes/aharorganizationRoutes.js';
import gymmultipleorganizationRoutes from './routes/gymorganizationmultiple.js';
import noticeRoutes from "./routes/aharnoticeRoutes.js";
import gymnoticeRoutes from "./routes/gymnoticeRoutes.js";
import aharuserRoutes from "./routes/aharuserRoutes.js";
import gymUserRoutes from "./routes/gymuserRoutes.js";
import aharstaffRoutes from "./routes/aharstaffRoutes.js";
import AharMemberRoutes from "./routes/aharMemberRoutes.js";
import GymMemberRoutes from "./routes/gymMemberroutes.js";
import aharratingRoutes from "./routes/aharratingRoutes.js";
import aharShowroomRoutes from "./routes/aharshowroomRoutes.js";
import suchiGodownRoutes from "./routes/suchigodown.routes.js";
import aharwifiBillRoutes from "./routes/aharwifiBillRoutes.js";
import gymwifiBillRoutes from "./routes/gymwifiBIllRoutes.js";
import aharEquipmentBillRoutes from "./routes/aharequipmentBillRoutes.js";
import aharelectricityBillRoutes from "./routes/aharelectricityBillRoutes.js";
import gymelectricityBillRoutes from "./routes/gymelectricityBillRoutes.js";
import gymEquipmentBillRoutes from "./routes/gymequipmentBillRoutes.js";
import aharwaterBillRoutes from "./routes/aharwaterBillRoutes.js";
import gymwaterBillRoutes from "./routes/gymwaterBillroutes.js";
import aharrentBillRoutes from "./routes/aharratingRoutes.js";
import aharbalanceSheetRoutes from "./routes/aharbalancesheetRoutes.js";
import aharfinancialRoutes from "./routes/aharfinancialRoutes.js";
import gymbatchRoutes from "./routes/gymbatchRoutes.js"; 
import gympackageRoutes from "./routes/gympackageRoutes.js"; 
import gyminventoryRoutes from "./routes/gyminventoryRoutes.js"; 
import gymtrainerRoutes from "./routes/gymtrainerRoutes.js";
import gymFeesRoutes from "./routes/gymfeeRoutes.js";
import dietPlanRoutes from "./routes/dietPlanRoutes.js";
import gymproductRoutes from "./routes/gymproductRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import chestexerciseRoutes from './routes/gymchestRoutes.js';
import gymArmRoutes from './routes/gymarmRoutes.js';
import gymAbsRoutes from './routes/gymabsRoutes.js';
import gymBackRoutes from './routes/gymbackRoutes.js';
import gymButtRoutes from './routes/gymbuttRoutes.js';
import gymFullBodyRoutes from './routes/gymfullbodyRoutes.js';
import gymLowerBodyRoutes from './routes/gymlowerbodyRoutes.js';
import gymShoulderRoutes from './routes/gymshoulderRoutes.js';
import gymStrongLiftRoutes from './routes/gymstrongliftRoutes.js';
import gymUpperBodyRoutes from './routes/gymuppebodyRoutes.js';
import gymVTaperRoutes from './routes/gymvtaperRoutes.js';
import gymEventRoutes from "./routes/gymEventRoutes.js";
import gymcorrectiveRoutes from "./routes/gymcorrectiveRoutes.js";
import gympreventiveRoutes from "./routes/gymPreventiveRoutes.js";
import gymAccountRoutes from "./routes/gymAccountRoutes.js";
import liveRoutes from "./routes/liveRoutes.js";
import gymProfileRoutes from "./routes/gymProfileRoutes.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from "multer";
import path from 'path';


dotenv.config();


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({ dest: "uploads/" });

// Middleware
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" })); 
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "https://www.vedann.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "Welcome Sunny",
    success: true,
  });
});

// Book Management Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/gymProfiles", gymProfileRoutes);
app.use("/api/rent-bills", aharrentBillRoutes);
app.use("/api/live", liveRoutes);
app.use("/api/gym-accounts", gymAccountRoutes);
app.use("/api/gym/preventive", gympreventiveRoutes);
app.use("/api/correctives", gymcorrectiveRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/gym-events", gymEventRoutes);
app.use('/api/chest/exercises', chestexerciseRoutes);
app.use("/api/arm/exercises", gymArmRoutes);
app.use("/api/abs/exercises", gymAbsRoutes);
app.use("/api/back/exercises", gymBackRoutes);
app.use("/api/vtaper/exercises", gymVTaperRoutes);
app.use("/api/fullbody/exercises", gymFullBodyRoutes);
app.use("/api/lowerbody/exercises", gymLowerBodyRoutes);
app.use("/api/shoulder/exercises", gymShoulderRoutes);
app.use("/api/upperbody/exercises", gymUpperBodyRoutes);
app.use("/api/stronglift/exercises", gymStrongLiftRoutes);
app.use("/api/butt/exercises", gymButtRoutes);
app.use("/api/gym/products", gymproductRoutes);
app.use("/api/diet-plans", dietPlanRoutes);
app.use("/api/gym/trainers", gymtrainerRoutes);
app.use("/api/gym/fees", gymFeesRoutes);
app.use("/api/gym/packages", gympackageRoutes);
app.use("/api/gym/batches", gymbatchRoutes);
app.use("/api/financial-data", aharfinancialRoutes);
app.use("/electricitybills", aharelectricityBillRoutes); 
app.use("/gym/electricitybills", gymelectricityBillRoutes); 
app.use("/api/aharequipmentbills", aharEquipmentBillRoutes);  
app.use("/api/gymequipmentbills", gymEquipmentBillRoutes);  
app.use("/api/gym/wifibills", gymwifiBillRoutes);
app.use("/api/wifibills", aharwifiBillRoutes);
app.use("/api/water", aharwaterBillRoutes);
app.use("/api/gym/water", gymwaterBillRoutes);
app.use("/api/suchigodown", suchiGodownRoutes);
app.use('/api/aharshowroom', aharShowroomRoutes);
app.use("/ratings", aharratingRoutes);
app.use("/api/members", AharMemberRoutes);
app.use("/api/gym/members", GymMemberRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use("/api/ahar/staff", aharstaffRoutes);
app.use("/api/ahar", aharuserRoutes);
app.use("/api/gym/users", gymUserRoutes); 
app.use('/api/notices', noticeRoutes); 
app.use('/api/gym/notices', gymnoticeRoutes); 
app.use('/api', organizationRoutes);
app.use('/api/gym', gymmultipleorganizationRoutes);
app.use("/api/demandinventory", demandinventoryRoutes);
app.use('/api/reuse', reuseinventoryRoutes);
app.use('/api', inventoryRoutes);
app.use("/api/machine-maintenance", machineMaintenanceRoutes);
app.use("/api/product-maintenance", productMaintenanceRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/gym/inventory", gyminventoryRoutes);
app.use("/api/attendance", staffAttendanceRoutes);
app.use("/api", aharsmpurnattendanceRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/companies", companyRoutes);
app.use("/balancesheet", balanceSheetRoutes);
app.use("/aharbalancesheet", aharbalanceSheetRoutes);
app.use('/api', resumeRoutes);
app.use('/api', reminderRoutes);
app.use('/api', joinedRoutes);
app.use('/api', searchRoutes);
app.use("/api/v1/library/books", bookRoute);
app.use('/api', consultationRoutes);
// User, Company, and Job Routes
app.use("/api/v1/user", userRoute);
app.get('/api/v1/user', (req, res) => {
  res.json({ success: true, users: [] });
});

app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/plans", planRouter);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);
app.use("/",ticketRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api", humanRoutes);
app.use("/api", materialRoutes);
// Use routes
app.use('/api/student', studentRoutes);  // Ensure the student routes are included
app.use('/api', seatRoutes);   // Ensure the seat booking routes are included
app.use('/api', examRoutes);
app.use("/api", scholarshipRoutes);
app.use("/api/admitcards", admitCardRoutes);
app.use("/api/study-centers", studyCenterRoutes);
app.use('/api/v1/user/update-profile', userRoute);
app.post("/api/inventory", upload.single("description"), (req, res) => {
  console.log("Received body:", req.body);
  console.log("Received files:", req.file || req.files);

  if (!req.body.items) {
    return res.status(400).json({ error: "Missing inventory data" });
  }

  res.status(200).json({ message: "Inventory saved!" });
});

app.get("/api/v1/user/update-profile", async (req, res) => {
  try {
    const { userId } = req.query; // Get the userId from the query parameters

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data in the response
    return res.status(200).json({
      message: "User data retrieved successfully",
      user: user, // Send the user object
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Error during retrieval" });
  }
});

app.put("/api/v1/user/update-profile", async (req, res) => {
  try {
    // Update logic here (e.g., updating user or other data)
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ message: "Error during update" });
  }
});

// Fee Data Endpoints
app.post("/api/update-fees", async (req, res) => {
  const { month, data } = req.body;

  // Validation
  if (!month || !data) {
    return res.status(400).json({ error: "Month and data are required" });
  }

  try {
    // Check if fee data already exists for the given month
    let feeEntry = await FeeData.findOne({ month });
    console.log(feeEntry);
    if (feeEntry) {
      // If the data exists, update it
      feeEntry.data = data;
      await feeEntry.save();
      return res
        .status(200)
        .json({ message: `Data for ${month} updated successfully.` });
    } else {
      // If no data exists, create a new entry
      feeEntry = new FeeData({ month, data });
      await feeEntry.save();
      return res
        .status(201)
        .json({ message: `Data for ${month} created successfully.` });
    }
  } catch (error) {
    console.error("Error updating fee data:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating fee data." });
  }
});

app.get("/api/fees", async (req, res) => {
  try {
    const fees = await FeeData.find();
    return res.status(200).json({ success: true, fees });
  } catch (error) {
    console.error("Error fetching fee data:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: "Something went wrong while fetching fee data.",
      });
  }
});

// After successful login
// app.post("/login", (req, res) => {
//   const token = generateToken(); // Replace with your token generation logic
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "None",
//     maxAge: 3600000, // 1 hour cookie expiration
//   });
//   res.json({ message: "Logged in successfully" });
// });

// Endpoint to save attendance

app.post("/api/save-attendance", async (req, res) => {
  const { attendanceList } = req.body;

  // Check if attendanceList is present and not empty
  if (!attendanceList || attendanceList.length === 0) {
    return res.status(400).json({ message: "Attendance list is empty" });
  }

  // Loop through each entry and check for missing required fields
  for (let entry of attendanceList) {
    if (!entry.id || !entry.name || !entry.timeIn || !entry.timeOut) {
      return res
        .status(400)
        .json({
          message: "All fields (id, name, timeIn, timeOut) are required",
        });
    }
  }

  try {
    // If validation passes, save the data
    await Attendance.insertMany(attendanceList);
    res.status(200).json({ message: "Attendance saved successfully" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Error saving attendance" });
  }
});

// Start the server
// Library Management Endpoints
app.post("/api/add-library", async (req, res) => {
  const { pincode, timeSlot, dateJoining, fee } = req.body;

  try {
    const newLibrary = new Library({
      pincode,
      timeSlot,
      dateJoining,
      fee,
    });

    await newLibrary.save();

    return res.status(201).json({
      success: true,
      message: "Library added successfully!",
      library: newLibrary,
    });
  } catch (error) {
    console.error("Error adding library:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding the library.",
    });
  }
});

app.get("/api/libraries", async (req, res) => {
  try {
    const libraries = await Library.find();
    return res.status(200).json({
      success: true,
      libraries,
    });
  } catch (error) {
    console.error("Error fetching libraries:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching libraries.",
    });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    success: false,
  });
});

// In-memory storage for plans
let plans = [
  {
    id: 1,
    name: "Basic Plan",
    fee: 1000,
    free: 0,
    affordable: 500,
    standard: 800,
    premium: 1200,
  },
  {
    id: 2,
    name: "Premium Plan",
    fee: 2000,
    free: 0,
    affordable: 1000,
    standard: 1500,
    premium: 2000,
  },
];

// 1. Endpoint to add a new plan
app.post("/plans", (req, res) => {
  // Handle plan addition logic here
  const newPlan = req.body;
  // Save the plan to the database or in-memory storage
  res.status(201).json(newPlan); // Send back the newly added plan
});

// 2. Endpoint to get all plans
app.get("/plans", (req, res) => {
  res.status(200).json(plans);
});

// 3. Endpoint to apply a waiver
app.put("/plans/:id/waive", (req, res) => {
  const { id } = req.params;
  const { waiverAmount } = req.body;

  const planIndex = plans.findIndex((plan) => plan.id === parseInt(id));
  if (planIndex !== -1) {
    plans[planIndex].fee -= waiverAmount;
    res.status(200).json(plans[planIndex]);
  } else {
    res.status(404).json({ message: "Plan not found" });
  }
});


app.post('/api/create-role', async (req, res) => {
  const { role } = req.body; // Get the role from the request body

  try {
    // Assuming you already have a user model with a role field
    const user = await User.findById(req.user._id); // Replace with the actual user fetching logic, e.g. from token

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assign the role to the user
    user.role = role;  // Assuming 'role' is a field in your user schema

    await user.save();

    res.status(200).json({ success: true, message: 'Role created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating role' });
  }
});























// Start Server
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
