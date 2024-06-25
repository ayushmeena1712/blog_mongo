import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.utils.js";
import JWT from "jsonwebtoken";
import { sendingMail } from "../utils/nodeMailer.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.utils.js";

const cycle = 8;

const register = async (req, res) => {
  try {
    const { userName, password, email, fullName } = req.body;
    
 
    if ([fullName, email, userName, password].some((field) => !field?.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (existedUser) {
      return res.status(409).json({ message: "User with email or username already exists" });
    } 
    if (!req.file) {
      return res.status(400).json({ message: "User Image is required" });
    } 
    const userImageLocalpath = req.file.path;

    const avatar = await uploadOnCloudinary(userImageLocalpath); 
    if (!avatar) {
      return res.status(400).json({ message: "User Image upload issue or something else" });
    }

    const hashedPassword = await bcrypt.hash(password, cycle);

    const user = await User.create({
      fullName,
      avatar: avatar.url,
      email,
      password: hashedPassword,
      userName: userName.toLowerCase(),
    });

    const verificationToken = JWT.sign(
      { id: user._id },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );

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



const verify = async (req, res) => {
  try {
    const { secret } = req.params;

    const decoded = JWT.verify(secret, process.env.JWTSECRET);

    const user = await User.findById(decoded.id);

    if (
      !user ||
      user.verificationToken !== secret || 
      user.verificationTokenExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Email successfully verified" });
    window.origin.href = "/";
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if ([userName, password].some((field) => !field.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      $or: [{ userName }, { email: userName }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email to login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log('Refresh token on login generated are : ', refreshToken);
    user.refreshToken = refreshToken;
    const id = user._id;
    await user.save();

    const userforverify = await User.findById(id);
    console.log(userforverify);

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    return res
      .status(200)
      .json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    console.log("error in login ", error);
    return res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).send("Logout successful");
};

const forgotPassword = async (req, res) => {
  try {
    const { emailOrUsername } = req.body;
    const user = await User.findOne({
      $or: [{ userName: emailOrUsername }, { email: emailOrUsername }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verificationToken = JWT.sign(
      { id: user._id },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );

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

    return res
      .status(202)
      .json({ message: "Check your email for password reset link" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyForgotPassword = async (req, res) => {
  try {
    const { secret } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const decoded = JWT.verify(secret, process.env.JWTSECRET);
    const user = await User.findById(decoded.id);

    if (
      !user ||
      user.verificationToken !== secret ||
      user.verificationTokenExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password has been reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const refreshAuthToken = async (req, res) => {
  const Token = req.body.refreshToken;
  console.log("req.cookies : ", req.body);
  if (!Token) {
    console.log('No refresh token found in cookies');
    return res.status(401).json({ message: "Unauthorized no refresh token is their" });
  }
  console.log('Received refresh token:', Token);
try {
  
    const decodedToken = JWT.verify(
      Token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if(user){
      console.log("user responseToken in teh database : ", user.refreshToken);
    }

    if (!user || user.refreshToken !== Token) {
      console.log("refresh token mismatch");
      return res.status(403).json({ message: "Forbidden" });
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: 'Strict', secure: true });
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, sameSite: 'Strict', secure: true });

    console.log('New tokens generated:', { accessToken, refreshToken: newRefreshToken });
    return res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } 
  catch (error) {
    console.error('Error in refresh token endpoint:', error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  register,
  verify,
  login,
  logout,
  forgotPassword,
  verifyForgotPassword,
  refreshAuthToken,
};