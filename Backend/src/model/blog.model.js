import mongoose, {Schema} from "mongoose"; 


const blogSchema = new Schema({
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
      },
      {
            timestamps: true,
      }
)

export const blog = mongoose.model("Blog", blogSchema);