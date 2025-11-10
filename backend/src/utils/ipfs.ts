import axios from "axios";
import { create } from "ipfs-http-client";
import { config } from "../config";

const ipfs = create({
    url: config.ipfsApiUrl,
});

export const uploadToIPFS = async (imageUrl: string) => {
    console.log("⬇️ Downloading image:", imageUrl);

    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    console.log("⬆️ Uploading to IPFS...");
    const result = await ipfs.add(buffer);

    console.log("✅ Uploaded:", result.cid.toString());
    return `ipfs://${result.cid.toString()}`;
};
