import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    userImage: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,  
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpires: {
        type: Date,
    }
  },
  {
      timestamps: true
  }
);

export const User = mongoose.model("User", userSchema);