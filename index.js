const PORT = 8000;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.get("/propiedades", (req, res) => {
  fetch(
    `https://graph.facebook.com/me?fields=posts{message,full_picture,attachments{subattachments{media{image{src}}}}}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.json(data.posts.data);
    })
    .catch((error) => res.json(error));
});

app.listen(PORT, () => console.log(`Server is ruunning on  port ${PORT}`));
