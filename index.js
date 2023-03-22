import dotenv from "dotenv";
import fs from "fs";
import download from "download";
import axios from "axios";

dotenv.config();

let existingData = [];
try {
  existingData = JSON.parse(fs.readFileSync("./src/data/postsData.json"));
} catch (err) {
  console.warn("No existing data found.");
}

if (!fs.existsSync("./images")) {
  fs.mkdirSync("./images");
}

const fetchData = async () => {
  await fetch(
    `https://graph.facebook.com/me?fields=posts{message,attachments{subattachments{media{image{src}}}}}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
  )
    .then((res) => res.json())
    .then((data) => {
      const newPosts = [];
      data.posts?.data?.forEach((post) => {
        const existingPost = existingData.find((p) => p.id === post.id);
        if (existingPost) {
          Object.assign(existingPost, post);
        } else {
          newPosts.unshift(post);
        }

        // * Modify the post's attachments
        const postAttachments = post.attachments;
        if (postAttachments && postAttachments.data.length > 0) {
          postAttachments.data.forEach((attachment) => {
            const postSubAttachments = attachment.subattachments;
            if (postSubAttachments && postSubAttachments.data.length > 0) {
              const slicedSubAttachments = postSubAttachments.data.slice(0, 5);
              slicedSubAttachments.forEach(async (subAttachment) => {
                if (subAttachment.media && subAttachment.media.image) {
                  subAttachment.media.image.src =
                    subAttachment.media.image.src.replace(
                      /^http:\/\//i,
                      "https://"
                    );

                  // * Download Image
                  const imageUrl = subAttachment.media.image.src;
                  const filename = imageUrl.substring(
                    imageUrl.lastIndexOf("/") + 1,
                    imageUrl.lastIndexOf("?")
                  );
                  const folderPath = `./images/${post.id}/`;
                  if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                  }
                  const imagePath = `./images/${post.id}/${filename}`;

                  await download(imageUrl).then((data) => {
                    fs.writeFileSync(imagePath, data);
                  });

                  subAttachment.media.image.src = imagePath;

                  if (fs.existsSync(imagePath)) {
                    console.log(`Image ${filename} already exists.`);
                    return;
                  }

                  if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                  }

                  const image = await axios({
                    method: "get",
                    url: imageUrl,
                    responseType: "stream",
                  });

                  const writer = fs.createWriteStream(imagePath);
                  image.data.pipe(writer);

                  writer.on("finish", () => {
                    console.log(`Image saved to ${imagePath}`);
                  });

                  writer.on("error", (err) => {
                    console.error(`Error saving image: ${err}`);
                  });
                }
              });
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

// TODO: Make that when more than 10 posts are rendered, they're moved to a different page
