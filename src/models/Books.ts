import mongoose, { Schema, Document } from "mongoose";

export interface BookDocument extends Document {
  title: string;
  author: string;
}

const bookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<BookDocument>("Book", bookSchema);
