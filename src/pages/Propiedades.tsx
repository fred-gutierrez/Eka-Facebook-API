import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import postsData from "../data/postsData.json";
import Pagination from "../components/Pagination";
import { Route, Routes } from "react-router-dom";

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

const Propiedades = () => {
  const [postData, setPostData] = useState<Post[]>([]);

  useEffect(() => {
    setPostData(postsData);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<PostItem postData={postData} />} />
        {/* <Route
          path="/1"
          element={<PostItem postData={postData.slice(10, 20)} />}
        />
        <Route
          path="/2"
          element={<PostItem postData={postData.slice(20, 30)} />}
        /> */}
      </Routes>
      {/* <Pagination /> */}
    </>
  );
};

export default Propiedades;
