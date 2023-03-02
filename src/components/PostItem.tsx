import { Post } from "../data/facebookAPI";

interface Props {
  postData: Post[];
}

const PostItem = ({ postData }: Props) => {
  return (
    <ul>
      {postData.map((post: Post, index: number) => (
        <li
          key={index}
          id={post.id}
          className={`bg-gray-300 items-center mb-5 py-8 px-5 mx-5
          max-w-screen-xl md:grid md:grid-cols-2
          2xl:mx-auto sm:py-16 lg:px-6 rounded-xl`}
        >
          <div>
            <img
              src={post.full_picture}
              alt={`Facebook post main image`}
              className={`h-52 2xl:h-80 min-w-full mx-auto object-cover rounded-t-lg`}
            />
            <div className="grid grid-cols-2 md:grid-cols-4">
              {post.attachments &&
                post.attachments.data.map((attachment: any) =>
                  attachment.subattachments.data
                    .map((subattachment: any) => (
                      <img
                        src={subattachment.media.image.src}
                        alt={`Facebook post image ${index}`}
                        className={`h-28 2xl:h-48
                        min-w-full object-cover mx-auto`}
                      />
                    ))
                    .slice(1, 5)
                )}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p>{post.message}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostItem;

//TODO: Style the posts
