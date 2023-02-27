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
  full_picture: string;
  id: string;
}

const FacebookPosts = () => {
  const [postData, setPostData] = useState<Post[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/propiedades`)
      .then((res) => res.json())
      .then((data) => {
        setPostData(data);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return <PostItem postData={postData} />;
};

export default FacebookPosts;

//TODO: Save the post data without having to run npm run start:backend
