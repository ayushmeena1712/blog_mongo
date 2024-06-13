import mongoose, {Schema} from "mongoose"; 
import bcrypt from "bcrypt"


const userSchema = new Schema({
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
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
            type: String
        }

      },
      {
          timestamps: true
      }
)


export const User = mongoose.model("User", userSchema);