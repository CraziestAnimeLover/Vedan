
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // We'll use nodemailer to send emails

// Register Function
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);

        // If no role provided, default to 'student'
        const newRole = role || 'student';

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role: newRole, // Assigning the role here
            profile: {
                // No profile photo here
            },
            vedannId: 'Not Assigned', // Default Vedan ID
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Login Function
// Login Function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Generate JWT token with role and Vedan ID
        const tokenData = {
            userId: user._id,
            role: user.role,
            vedannId: user.vedannId,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Prepare user data
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile,
            role: user.role,
            vedannId: user.vedannId,
        };

        return res.status(200).cookie("token", token, { 
            maxAge: 86400000, 
            httpOnly: true, 
            sameSite: 'None', 
            secure: process.env.NODE_ENV === 'production' // Ensure cookies are only secure in production
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};


// Logout Function
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Forgot Password Function
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "No user found with this email",
                success: false
            });
        }

        const resetToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset Link',
            text: `Hello ${user.fullname},\n\nYou have requested to reset your password. Please click the following link to reset it:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD, 
            }
        });

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: "Password reset link sent to your email.",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Reset Password Function
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: "Token is required." });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password has been reset successfully." });
    } catch (error) {
        console.error("Error verifying token:", error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired. Please request a new password reset link.",
                success: false,
            });
        }
        return res.status(401).json({
            message: "Invalid token.",
            success: false,
        });
    }
};

// Update Profile Function
// Update Profile Function
  // For password hashing (if needed)

  export const updateProfile = async (req, res) => {
    try {
      const { userId } = req.user;  // Get the user ID from the token
  
      // Prepare the updated profile data
      const updatedData = {
        fullname: req.body.fullname || req.user.fullname,
        email: req.body.email || req.user.email,
        phoneNumber: req.body.phoneNumber || req.user.phoneNumber,
        role: req.body.role || req.user.role,
        vedanId: req.body.vedanId || req.user.vedanId,
        profile: req.body.profile || req.user.profile,
      };
  
      if (req.file) {
        // If there's a file uploaded, handle it (e.g., profile picture)
        updatedData.profilePhoto = req.file.path;  // assuming file is uploaded to a folder and path is stored
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        message: 'Profile updated successfully',
        updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  };
  


  

export const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming the user role is stored in the JWT token
        
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: "Access Denied" });
        }

        next();
    };
};

// Profile Update Function for Librarian/Student
export const updateLibraryProfile = async (req, res) => {
    const { mobile, email, social, address, GST, PAN, Name, VedanId } = req.body;
    const userId = req.userId;  // Assuming middleware sets req.userId from the JWT token

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found.", success: false });
        }

        // Validate required fields
        if (!mobile && !email && !address) {
            return res.status(400).json({ message: "At least one field (mobile, email, address) is required.", success: false });
        }

        // Update fields based on the role
        if (mobile) user.profile.mobile = mobile;
        if (email) user.profile.email = email;
        if (social) user.profile.social = social; // Array of social links
        if (address) user.profile.address = address;

        // Only allow GST/PAN/Founder ID to be updated if the role is 'librarian' or 'founder'
        if (user.role === 'librarian' && (!GST || !PAN)) {
            return res.status(400).json({ message: "GST and PAN are required for Librarians.", success: false });
        }
        

        // Update founder details if role is 'founder'
        if (user.role === 'founder') {
            if (Name) user.profile.Name = Name;
            if (VedanId) user.profile.VedanId = VedanId;
        }

        // Handle profile image upload if provided
        if (req.file) {
            // Assuming file is uploaded to a folder and path is stored
            user.profile.profilePhoto = req.file.path;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

