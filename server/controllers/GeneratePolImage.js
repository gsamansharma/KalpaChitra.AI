import * as dotenv from "dotenv";
import axios from "axios";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateImage = async (req, res, next) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      throw createError(400, "Prompt is required");
    }

    console.log(`Generating image for prompt: "${prompt}"`);

    // Fetch image from Pollinations API
    const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    const pollinationResponse = await axios.get(pollinationUrl, { responseType: "arraybuffer" });

    // Convert the response to base64 format
    const imageBase64 = `data:image/png;base64,${Buffer.from(pollinationResponse.data).toString("base64")}`;

    // Upload the base64 image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: "generated_images", // Optional: Organize images into a specific folder
    });

    console.log(`Image uploaded to Cloudinary: ${uploadResponse.secure_url}`);

    // Send the uploaded image URL as a response
    return res.status(200).json({
      photo: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Error generating image:", error.message);

    // Pass the error to the next middleware with an appropriate status
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};
