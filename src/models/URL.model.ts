import mongoose, { Schema, Document } from "mongoose";

export interface IShortenURL extends Document {
  urlCode: string;
  originalUrl: string;
  shortUrl: string;
  clickCount: number;
}

// hack: this is ugly fix for OverwriteModelError: Cannot overwrite `ShortenURL` model once compiled.
delete mongoose.connection.models["ShortenURL"];

const URLSchema: Schema = new Schema(
  {
    urlCode: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model<IShortenURL>("ShortenURL", URLSchema);
