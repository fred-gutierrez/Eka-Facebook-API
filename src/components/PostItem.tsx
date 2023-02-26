import { Post } from "../data/facebookAPI";

interface Props {
  postData: Post[];
}

const PostItem = ({ postData }: Props) => {
  return (
    <ul>
      {postData.map((post: Post, index: number) => (
        <li key={index}>
          {/* <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg"> */}
          <img
            src={post.full_picture}
            alt={`Facebook post main image`}
            className="h-48 self-center inline-flex"
          />
          {post.attachments &&
            post.attachments.data.map((attachment: any) =>
              attachment.subattachments.data
                .map((subattachment: any) => (
                  <img
                    src={subattachment.media.image.src}
                    alt={`Facebook post image ${index}`}
                    className="h-32 p-1 self-center inline-flex"
                  />
                ))
                .slice(1)
            )}
          {/* </div>
          <div className="p-6 flex flex-col justify-start"> */}
          <p>{post.message}</p>
          {/* </div> */}
        </li>
      ))}
    </ul>
  );
};

export default PostItem;
