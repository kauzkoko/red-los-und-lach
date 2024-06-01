import { promises as fs } from "fs";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Path to your text file
    const filePath = "./whisper.txt";

    // Read the content of the file
    const content = await fs.readFile(filePath, "utf8");

    // Return the content as the response
    return {
      content,
    };
  } catch (error) {
    // Handle errors (e.g., file not found)
    return {
      error: "File not found or cannot be read",
    };
  }
});
