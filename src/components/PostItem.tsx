import { Post } from "../data/facebookAPI";

interface Props {
  postData: Post[];
}

const PostItem = ({ postData }: Props) => {
  return (
    <ul className="container">
      {postData.map((post: Post, index: number) => (
        <li key={index}>
          <p>{post.message}</p>
          <img
            className="h-48"
            src={post.full_picture}
            alt={`Facebook post main image`}
          />
          {post.attachments &&
            post.attachments.data.map((attachment: any) =>
              attachment.subattachments.data
                .map((subattachment: any) => (
                  <img
                    src={subattachment.media.image.src}
                    className={"inline-flex h-32 p-1"}
                    alt={`Facebook post image ${index}`}
                  />
                ))
                .slice(1)
            )}
        </li>
      ))}
    </ul>
  );
};

export default PostItem;
