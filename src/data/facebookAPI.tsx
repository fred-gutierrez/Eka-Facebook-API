import React, { useState, useEffect } from "react";

interface Post {
  message: string;
  full_picture: string;
}

interface PostsData {
  data: Post[];
  paging: {};
}

const accessToken: string =
  "EAAKI47hCLskBAA4FqgpX7ZAgYhsSxVtvqzZBUR5eJWK5C8omA5G9HwwuyFCqZBeYpI93HYIavAL3OdwwhmZCXo6sXgJmICCqWtpusaSZBcPSeRx5M9wtZBeQP7aoqRkXXDhPeF2rzm07aboZCoVlxXho8cXHzl01kfvn1qb7Ik59B8omp2x8bb7sYPsQbHsD0IaX90R3AOrRq3K2ZCKntsZBy4LT5I4BZCKtsZD";

const FacebookPosts = () => {
  const [postData, setPostData] = useState<PostsData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/249327931806447?fields=posts{message,full_picture}&access_token=${accessToken}`
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
