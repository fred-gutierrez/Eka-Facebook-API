import React, { useState, useEffect } from "react";

interface Post {
  attachments: string;
  message: string;
}

interface Attachments {
  subattachments: string | undefined;
  data: Attachments[];
}

interface SubAttachments {
  media: any;
  data: SubAttachments[];
}

interface PostsData {
  data: Post[];
}

// ! This is the fetch field = `https://graph.facebook.com/249327931806447?fields=posts{message,attachments{subattachments{media{image{src}}}}}&access_token=${accessToken}`

const accessToken: string =
  "EAAKI47hCLskBAKGexIO4nnNMFAyDxa6smaZCZCwc0H92ZBqorJr6HvchfXyZAhZB6pZAphUMxJZAutEsIQ0mKHfeUzAb6R9puvTBWAwJZB9mTSwxtxqNV3OOF9RGwTqi8u3X3IoxjmvVucNfE7qSdjC7nT4bOUWhr82pPlv4OFTvQu7eWgXDRnzH6gdsYBs4VnSeqKNP0lySOzI12dqUXkblK2I5bnfoSL0ZD";

const FacebookPosts = () => {
  const [postData, setPostData] = useState<PostsData | null>(null);
  const [attachmentsData, setAttachmentsData] = useState<Attachments | null>(
    null
  );
  const [subAttachmentsData, setSubAttachmentsData] =
    useState<SubAttachments | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/249327931806447?fields=posts{message,attachments{subattachments{media{image{src}}}}}&access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.posts);
        setAttachmentsData(data.attachments);
        setSubAttachmentsData(data.subattachments);
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
            {attachmentsData?.data.map((attachments: Attachments) =>
              subAttachmentsData?.data.map((subattachments: SubAttachments) => (
                <img
                  src={subattachments.media.image.src}
                  width={200}
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
