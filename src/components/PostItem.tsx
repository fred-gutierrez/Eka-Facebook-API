import { Post } from "../data/facebookAPI";

interface Props {
  postData: Post[];
}

const PostItem = ({ postData }: Props) => {
  return (
    <ul>
      {postData.map((post: Post, index: number) => {
        const price = post.message.match(
          /(\$|₡)\d{1,4}(,\d{3})*(\.\d{3})*(\.\d+)?/g
        );

        return (
          <li
            key={index}
            id={post.id}
            className={`bg-gray-300 items-center mb-5 py-8 px-5 mx-5
          max-w-screen-xl lg:grid lg:grid-cols-2
          xl:mx-auto lg:px-6 rounded-xl`}
          >
            <div className="grid grid-cols-2 gap-1">
              <img
                src={post.full_picture}
                alt={`Facebook post main image`}
                className={`h-52 min-w-full min-h-full object-cover rounded-lg`}
              />
              <div className="grid grid-cols-2 gap-1">
                {post.attachments &&
                  post.attachments.data.map((attachment: any) =>
                    attachment.subattachments.data
                      .map((subattachment: any) => (
                        <img
                          src={subattachment.media.image.src}
                          alt={`Facebook post image ${index}`}
                          className={`h-28 md:h-40 2xl:h-44 lg:h-40
                        min-w-full rounded-lg object-cover mx-auto`}
                        />
                      ))
                      .slice(1, 5)
                  )}
              </div>
            </div>
            <div className="mt-4 lg:ml-5">
              <p>{price}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostItem;

//TODO: Style the posts
