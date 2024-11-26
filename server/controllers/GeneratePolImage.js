import * as dotenv from "dotenv";
import axios from "axios";
import { createError } from "../error.js";
dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const prompt = req.body.prompt; 
    if (!prompt) {
      throw createError(400, "Prompt is required");
    }
    console.log(prompt);
    const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    console.log(`Fetching image for prompt: ${prompt}`);
    

    const pollinationResponse = await axios.get(pollinationUrl, { responseType: "arraybuffer" });

    
    const imageBase64 = Buffer.from(pollinationResponse.data).toString("base64");

    
    const imgurResponse = await axios.post(
      "https://api.imgur.com/3/image",
      {
        image: imageBase64, 
        type: "base64", 
      },
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`, 
        },
      }
    );

    return res.status(200).json({ 
      photo: imgurResponse.data.data.link 
    });
  } catch (error) {
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};
