import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema(
      {
            category: {
                  type: String,
                  required: true,
                  unique: true,
                  lowercase: true,
                  trim: true,
                  index: true
            },
            blogs:[
                  {
                        type: Schema.Types.ObjectId,
                        ref: "Blog"
                  }
            ]
      }
)

export const Category = mongoose.model("Category", categorySchema);