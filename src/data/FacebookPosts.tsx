import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import postsData from "./postsData.json";
import Pagination from "../components/Pagination";

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
  id: string;
}

const FacebookPosts = () => {
  const [postData, setPostData] = useState<Post[]>([]);

  useEffect(() => {
    setPostData(postsData);
  }, []);

  return (
    <>
      <PostItem postData={postData} />
      {/* <Pagination /> */}
    </>
  );
};

export default FacebookPosts;
