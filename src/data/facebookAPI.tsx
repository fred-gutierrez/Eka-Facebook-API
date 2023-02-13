import React, { useState, useEffect } from "react";

interface Post {
  message: string;
  full_picture: string;
}

interface PostsData {
  data: Post[];
  paging: {};
}

const FacebookPosts = () => {
  const [postData, setPostData] = useState<PostsData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(
      "https://graph.facebook.com/249327931806447?fields=posts{message,full_picture}&access_token=EAAKI47hCLskBAMBiPXTHBC8ZBNgcGryp5veP8wuaMiUODZAkYdxvz83gT0xdy9ZALAYJRWXT4FH6Be5eDc0ntUO8Sofed1og3Hp04eEssizeIZAdqNZCqPijLXXmYAnOBRMlUxMiSRg5LVUY27IF5C2HPzCOPtY8xdpKbnJSvqeXTZBmn4qxVeBxNgFoa7YkXKeXK1luelAbKOBh6T8RBHSGWfBFC7wIIZD"
    )
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.posts);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {postData &&
        postData.data.map((post: Post, index: number) => (
          <li key={index}>
            <p>{post.message}</p>
            <img src={post.full_picture} alt="" />
          </li>
        ))}
    </ul>
  );
};

export default FacebookPosts;
