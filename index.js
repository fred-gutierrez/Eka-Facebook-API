import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

let existingData = [];
try {
  existingData = JSON.parse(fs.readFileSync("./src/data/postsData.json"));
} catch (err) {
  console.warn("No existing data found.");
}

const fetchData = async () => {
  fetch(
    `https://graph.facebook.com/me?fields=posts{message,full_picture,attachments{subattachments{media{image{src}}}}}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
  )
    .then((res) => res.json())
    .then((data) => {
      const newPosts = [];
      data.posts?.data?.forEach((post) => {
        // * Check if post ID already exists in the existing data
        const existingPost = existingData.find((p) => p.id === post.id);
        if (existingPost) {
          // * If post already exists, update it with new data
          Object.assign(existingPost, post);
        } else {
          // * If post is new, add it to the newPosts array
          newPosts.unshift(post);
        }

        // * Modify the post's attachments
        const postAttachments = post.attachments;
        if (postAttachments && postAttachments.data.length > 0) {
          postAttachments.data.forEach((attachment) => {
            let firstImage;
            if (attachment.media && attachment.media.image) {
              firstImage = attachment.media.image.src;
              delete attachment.media.image;
            }

            const postSubAttachments = attachment.subattachments;
            if (postSubAttachments && postSubAttachments.data.length > 0) {
              const slicedSubAttachments = postSubAttachments.data.slice(1, 5);
              slicedSubAttachments.forEach((subAttachment) => {
                if (subAttachment.media && subAttachment.media.image) {
                  subAttachment.media.image.src =
                    subAttachment.media.image.src.replace(
                      /^http:\/\//i,
                      "https://"
                    );
                }
              });
              if (firstImage) {
                slicedSubAttachments.unshift({
                  media: {
                    image: {
                      src: firstImage.replace(/^http:\/\//i, "https://"),
                    },
                  },
                });
              }
              postSubAttachments.data = slicedSubAttachments;
            }
          });
        }
      });

      const filteredData = Object.values([...newPosts, ...existingData]).filter(
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
};

fetchData();

// TODO: Fix the fact that facebook images expire after a few days (URL signature expired) - https://stackoverflow.com/questions/30477877/facebook-image-url-gets-expired

// TODO: Make that when more than 15 posts are rendered, they're moved to a different page
