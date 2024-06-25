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
        blogImage: {
          type: String,
          required: true
        },
        categoryId:
        {
          type: Schema.Types.ObjectId,
          ref: "Category",
          required: true
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        }
      },
      {
            timestamps: true,
      }
)

export const Blog = mongoose.model("Blog", blogSchema);