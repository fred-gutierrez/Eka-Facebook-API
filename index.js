const PORT = 8000;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import fs from "fs";

dotenv.config();

const app = express();

app.use(cors());

let existingData = [];
try {
  existingData = JSON.parse(fs.readFileSync("./src/data/postsData.json"));
} catch (err) {
  console.warn("No existing data found.");
}

fetch(
  `https://graph.facebook.com/me?fields=posts{message,full_picture,attachments{subattachments{media{image{src}}}}}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
)
  .then((res) => res.json())
  .then((data) => {
    const newPosts = [];
    data.posts?.data?.forEach((post) => {
      // Check if post ID already exists in the existing data
      const existingPost = existingData.find((p) => p.id === post.id);
      if (existingPost) {
        // If post already exists, update it with new data
        Object.assign(existingPost, post);
      } else {
        // If post is new, add it to the newPosts array
        newPosts.push(post);
      }

      // Modify the post's attachments
      if (post.attachments && post.attachments.data.length > 0) {
        post.attachments.data.forEach((attachment) => {
          let firstImage;
          if (attachment.media && attachment.media.image) {
            firstImage = attachment.media.image.src;
            delete attachment.media.image;
          }

          if (
            attachment.subattachments &&
            attachment.subattachments.data.length > 0
          ) {
            const subattachments = attachment.subattachments.data.slice(1, 5);
            subattachments.forEach((subAttachment) => {
              if (subAttachment.media && subAttachment.media.image) {
                subAttachment.media.image.src =
                  subAttachment.media.image.src.replace(
                    /^http:\/\//i,
                    "https://"
                  );
              }
            });
            if (firstImage) {
              subattachments.unshift({
                media: {
                  image: {
                    src: firstImage.replace(/^http:\/\//i, "https://"),
                  },
                },
              });
            }
            attachment.subattachments.data = subattachments;
          }
        });
      }
    });

    const filteredData = Object.values(existingData.concat(newPosts)).filter(
      (post) => {
        const words = post.message?.split(" ");
        return words?.length >= 15;
      }
    );
    if (filteredData.length > 0) {
      fs.writeFileSync(
        "./src/data/postsData.json",
        JSON.stringify(filteredData)
      );
      console.log(
        `Wrote ${newPosts.length} new posts and updated ${
          existingData.length - newPosts.length
        } existing posts.`
      );
    } else {
      console.error("Error: No data found in response");
    }
  })
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// TODO: Fix the fact that facebook images expire after a few days (URL signature expired) - https://stackoverflow.com/questions/30477877/facebook-image-url-gets-expired

// TODO: Revise that when something new is posted, it doesn't remove the older posts ($1600)

// TODO: Make that when more than 15 posts are rendered, they're moved to a different page
