import bcrypt from 'bcrypt';
import { User } from '../model/user.model.js';
import {createJwt, verifyJwt} from "../utils/token.utils.js"
import JWT from 'jsonwebtoken';
import { sendingMail } from '../utils/nodeMailer.utils.js';
import { json } from 'express';

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
       
    const hashedPassword = await bcrypt.hash(password, cycle);
    const verifyCationData = JWT.sign(
      {
        data : {
          email,
          fullName,
          userName,
          hashedPassword
        }
      },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    )

    if(verifyCationData){
      try {
        sendingMail({
          from: "no-reply@example.com",
          to: `${email}`,
          subject: "Account Verification Link",
          html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Hello, <strong>${userName}</strong>. Please verify your email by clicking the link below:</p>
            <p>
              <a href="http://localhost:${process.env.PORT}/api/users/verify-email/${verifyCationData}"
                 style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;"
                 target="_blank">Verify Email</a>
            </p>
            <p>If you did not request this verification, please ignore this email.</p>
          </div>
        `,
        })
      } catch (error) {
        res.status(404).send("Something went wrong. Please try again Later");
      };

      return res.status(202).json({message: "check your email for verification"});
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


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

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = createJwt({_id : user._id});
    console.log(`token is ${JSON.stringify(token)}`);

    // cookie wala kaam
    res.cookie("token", token);

    return res.status(200).json({ message: "User is verified" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).send("logout successful");
}

export const verify = async (req, res) =>{  
  const data = JWT.verify(req.params.token, process.env.JWTSECRET).data;
  if(!data){
    return res.status(400).send(`Bad request Your verification link is expired. Please try again`);
  }

  const user = await User.create({
    email: data.email,
    password: data.hashedPassword,
    fullName: data.fullName,
    userName: data.userName
  });
 
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(201).json({ message: "Successfully created the user", user: createdUser });
}

export const forgotPassword = async(req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email }).select(
    "-password"
  );
  if(!user) return res.status(403).json({ message: "User not found"});

  const verificationOfUser = await JWT.sign(
    {
      id: user.id,
    },
    process.env.JWTSECRET,
    {
      expiresIn: '1h'
    }
  )

  sendingMail({
    from: "no-reply@example.com",
    to: `${user.email}`,
    subject: "Account Verification Link",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Hello, <strong>${userName}</strong>. Please verify your email by clicking the link below:</p>
      <p>
        <a href="http://localhost:${process.env.PORT}/api/users/verify-email/${verificationOfUser}"
           style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;"
           target="_blank">Verify Email</a>
      </p>
      <p>If you did not request this verification, please ignore this email.</p>
    </div>
  `,
  })
  res.status(200).json({message: "Check your email to update your account password"});
}