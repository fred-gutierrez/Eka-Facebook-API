import { Post } from "../data/facebookAPI";

interface Props {
  postData: Post[];
}

const PostItem = ({ postData }: Props) => {
  return (
    <ul>
      {postData.map((post: Post, index: number) => (
        <li key={index}>
          <p>{post.message}</p>
          {post.attachments &&
            post.attachments.data.map((attachment: any) =>
              attachment.subattachments.data.map((subattachment: any) => (
                <img
                  src={subattachment.media.image.src}
                  className={"inline-flex h-32 p-1"}
                  alt={`Facebook post image ${index}`}
                />
              ))
            )}
        </li>
      ))}
    </ul>
  );
};

export default PostItem;
