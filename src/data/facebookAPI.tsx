import { useState, useEffect } from "react";

interface Post {
  attachments: {
    data: {
      subattachments: {
        data: {
          media: {
            image: {
              src: string;
            };
          };
        }[];
      };
    }[];
  };
  message: string;
}

const accessToken =
  "EAAKI47hCLskBAPBLBpzAJPeX2j6tEbYLZClX1DtjEDLR2LtQGuqvfsrc7jG4IzHii8449k45tp84DNX7oUtZAIS2tPlwZBEmB94qSFjEqynv8m3BlpJszthM6aSZBMC0ky1ui474DSCGSszqQSAwUuqZAhDyNVn2FyBPFS388ZAeBZATdbqdNOZCVCYZA1NslSUCwkQELBAspXs4ZAzrS274BXYq9CazWZCvYEZD";

const FacebookPosts = () => {
  const [postData, setPostData] = useState<Post[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/me?fields=posts{message,attachments{subattachments{media{image{src}}}}}&access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((data) => setPostData(data.posts.data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul>
      {postData.map((post: Post, index: number) => (
        <li key={index}>
          <p>{post.message}</p>
          {post.attachments &&
            post.attachments.data.map((attachment) =>
              attachment.subattachments.data.map((subattachment) => (
                <img
                  src={subattachment.media.image.src}
                  width={200}
                  className={"flex-row"}
                  alt="House Image"
                />
              ))
            )}
        </li>
      ))}
    </ul>
  );
};

export default FacebookPosts;
