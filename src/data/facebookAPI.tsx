import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";

export interface Post {
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
  "EAAKI47hCLskBABQtkTSi7WtHNZAImbk3yGm6hOlnd4HWpsXTBjyfGA4eOrfeGewaNznJvjqufPTrIbOwbLkVad51FZAaxmv88loxbhwaDKM1ZCbm7GaZC1iBrGNa71Adt26sqZC3fqSuZCcdjQtnoZATR6AOCrjCo626D4JoAmQhfDLfkNwC3R4HgLJYWeAnBHjpE1YdQGfrhT2QgdcqTGNYFvb798qR60ZD";

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

  return <PostItem postData={postData} />;
};

export default FacebookPosts;
