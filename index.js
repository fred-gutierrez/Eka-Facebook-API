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
    fs.writeFileSync(
      "./src/data/postsData.json",
      JSON.stringify(data.posts.data)
    );
  })
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server is running on  port ${PORT}`));
