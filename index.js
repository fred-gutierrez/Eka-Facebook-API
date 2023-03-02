const PORT = 8000;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import fs from "fs";

dotenv.config();

const app = express();

app.use(cors());

fetch(
  `https://graph.facebook.com/me?fields=posts{message,full_picture,attachments{subattachments{media{image{src}}}}}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
)
  .then((res) => res.json())
  .then((data) => {
    const postsById = {};
    data.posts?.data?.forEach((post) => {
      if (post.id in postsById) {
        console.warn(`Duplicate post ID: ${post.id}`);
      } else {
        postsById[post.id] = post;
      }
    });
    const filteredData = Object.values(postsById).filter((post) => {
      const words = post.message?.split(" ");
      return words?.length >= 15;
    });
    if (filteredData.length > 0) {
      fs.writeFileSync(
        "./src/data/postsData.json",
        JSON.stringify(filteredData)
      );
    } else {
      console.error("Error: No data found in response");
    }
  })
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server is running on  port ${PORT}`));
