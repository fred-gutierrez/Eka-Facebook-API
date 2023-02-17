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
  "EAAKI47hCLskBAHGu7FBYEZA8iLsSZAjZBytfTb4nMZBEcHO33x1rmUDglUdhmmfx7T0ZC5he0DZBI6cb0OAAC8YrffgYUOnQtD3gBOBfuesavGVnKmrY6KaSi2I0VoBi66sT9CwZAWaOU5E30lZAsGAZCDRjUfgzcSql7bdCCR5q2gbcV6bXc5GZCHbCYSrOT1KluFXFRLsihINZBdcnIYzDfca5ejMqmanr0UZD";

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
