import Replicate from "replicate";
import { config } from "../config";

const replicate = new Replicate({
  auth: config.replicateToken,
});

export const generate = async (prompt: string): Promise<string> => {
  const input = {
    prompt,
    aspect_ratio: "3:2",
  };

  console.log("🖼️ Generating image via Replicate...");

  const output: any = await replicate.run(
    "ideogram-ai/ideogram-v3-turbo",
    { input }
  );

  // If output is an array of FileOutput objects
  if (Array.isArray(output) && output.length > 0) {
    const first = output[0];
    if (typeof first === "string") return first;
    if (first.url) return first.url(); // call the function
  }

  // If single FileOutput object
  if (typeof output === "object" && output.url) {
    return output.url(); // call function
  }

  throw new Error("Unexpected Replicate output format");
};
