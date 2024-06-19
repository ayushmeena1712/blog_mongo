import bcrypt from 'bcrypt';
import { User } from '../model/user.model.js';
import { createJwt } from "../utils/token.utils.js";
import JWT from 'jsonwebtoken';
import { sendingMail } from '../utils/nodeMailer.utils.js';

const cycle = 8;

export const register = async (req, res) => {
  try {
    const { userName, password, email, fullName } = req.body;
    
    if ([fullName, email, userName, password].some(field => !field?.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (existedUser) {
      return res.status(409).json({ message: "User with email or username already exists" });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar is required" });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      return res.status(400).json({ message: "Avatar is required" });
    }

    const hashedPassword = await bcrypt.hash(password, cycle);

    const user = await User.create({
      fullName,
      avatar: avatar.url,
      email,
      password: hashedPassword,
      userName: userName.toLowerCase(),
    });

    const verificationToken = JWT.sign({ id: user._id }, process.env.JWTSECRET, { expiresIn: '1h' });

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const verificationUrl = `http://localhost:${process.env.PORT}/api/users/verify-email/${verificationToken}`;

    await sendingMail({
      from: "no-reply@example.com",
      to: email,
      subject: "Account Verification Link",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Hello, <strong>${userName}</strong>. Please verify your email by clicking the link below:</p>
          <p>
            <a href="${verificationUrl}"
               style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;"
               target="_blank">Verify Email</a>
          </p>
          <p>If you did not request this verification, please ignore this email.</p>
        </div>
      `,
    });

    return res.status(202).json({ message: "Check your email for verification" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { secret } = req.params;

    const decoded = JWT.verify(secret, process.env.JWTSECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.verificationToken !== secret || user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Other functions: login, logout
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if ([userName, password].some(field => !field.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ $or: [{ userName }, { email: userName }] });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email to login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = createJwt({ _id: user._id });
    res.cookie("token", token);

    return res.status(200).json({ message: "User is verified" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).send("Logout successful");
}

export const forgotPassword = async (req, res) => {
  try {
    const { emailOrUsername } = req.body;
    const user = await User.findOne({ $or: [{ userName: emailOrUsername }, { email: emailOrUsername }] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verificationToken = JWT.sign({ id: user._id }, process.env.JWTSECRET, { expiresIn: '1h' });

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 3600000;
    await user.save();

    const verificationUrl = `http://localhost:${process.env.PORT}/api/users/verify-forgot-password/${verificationToken}`;
    await sendingMail({
      from: "no-reply@example.com",
      to: user.email, // Ensure you're sending the email to the correct user email
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Hello, <strong>${user.userName}</strong>. Please reset your password by clicking the link below:</p>
          <p>
            <a href="${verificationUrl}"
               style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;"
               target="_blank">Reset Password</a>
          </p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return res.status(202).json({ message: "Check your email for password reset link" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const verifyForgotPassword = async (req, res) => {
  try {
    const { secret } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const decoded = JWT.verify(secret, process.env.JWTSECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.verificationToken !== secret || user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}