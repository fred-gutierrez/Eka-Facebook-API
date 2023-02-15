import React, { useState, useEffect } from "react";

interface Post {
  message: string;
  full_picture: string;
}

interface PostsData {
  data: Post[];
  paging: {};
}

// ! This is the fetch field = `https://graph.facebook.com/249327931806447?fields=posts{message,attachments{subattachments{media{image{src}}}}}&access_token=${accessToken}`

const accessToken: string =
  "EAAKI47hCLskBAMBWzxORQm5csZBZCihJWgdqcJhIE9ZAxk8VcI3W9y3vaI0ZBgkhYoZCeTfSPWTvFDZBrYZC05IgnguAt6J9nW4calzq6sHOCyeaFFEZBXYyETt8ST2gn3deai5gdKbJD0DDhPjIu0eiZBX7WRJjby0AbPf7uXejT6ZBpKWpnckZCaEzkN1HZCZBViqZBZAN12WgL0Qnv6fODRIcZAsSB1yvdgRZBFe8ZD";

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
            <img src={post.full_picture} width={200} alt="House Image" />
          </li>
        ))}
    </ul>
  );
};

export default FacebookPosts;
