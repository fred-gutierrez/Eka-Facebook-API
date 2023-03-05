import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../data/facebookAPI";

interface Props {
  postData: Post[];
}

const PostItem = ({ postData }: Props) => {
  return (
    <ul>
      {postData.map((post: Post, index: number) => {
        // * Price
        const price = post.message.match(
          /(\$|₡)\d{1,4}(,\d{3})*(\.\d{3})*(\.\d+)?/g
        );

        // * Title
        const title = post.message.substring(0, post.message.indexOf("\n"));

        // * Location
        const location = post.message.match(/📍(.*?)\n/);
        const locationString = location !== null ? "📍 " + location[1] : "";

        // * Alquiler o Venta
        const alquilerVentaMatch = post.message.match(
          /(alquilo|alquiler|vendo|venta)/i
        );
        const alquilerVenta = alquilerVentaMatch
          ? alquilerVentaMatch[1].toLowerCase() === "alquilo"
            ? "Alquiler"
            : "Venta"
          : null;

        // * Baños and Habitaciones
        function parseSpanishNumber(numberString: string) {
          switch (numberString.toLowerCase()) {
            case "una":
              return 1;
            case "dos":
              return 2;
            case "tres":
              return 3;
            // Add more cases as needed for other Spanish numbers
            default:
              return parseInt(numberString);
          }
        }

        const habitacionMatch = post.message.match(
          /(\d+|\buna\b|\bdos\b|\btres\b)\s*(habitaci[oó]n|(?:es)|dormitorio)s?/i
        );
        const banoMatch = post.message.match(
          /(\d+)\s*(?:batería(?:s)? de\s+)?baño(?:s)?/i
        );

        const habitaciones = habitacionMatch
          ? parseSpanishNumber(habitacionMatch[1])
          : 0;
        const banos = banoMatch ? parseInt(banoMatch[1]) : 0;

        // * Metros cuadrados
        const metrosMatch = post.message.match(
          /(\d+(?:\.\d+)?)\s*(?=m²|M2|metros\s+cuadrados|mts|de terreno|de construcci[oó]n)/i
        );
        const metros = metrosMatch ? parseFloat(metrosMatch[1]) : 0;

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
            <div>
              <div className="mt-4 lg:ml-5 grid grid-cols-2">
                <h1 className={`text-lg`}>{title}</h1>
                <div className="mx-auto">
                  <h1 className={`text-xl font-bold`}>{price}</h1>
                  <h1 className={`text-md text-center`}>{alquilerVenta}</h1>
                </div>
              </div>
              <div className="mt-4 lg:ml-5">
                <h1 className={`text-md`}>{locationString}</h1>
              </div>
              <div className="mt-4 lg:ml-5 grid grid-cols-2">
                <div>
                  {habitaciones ? (
                    <div className="inline-flex items-center mx-1">
                      <FontAwesomeIcon
                        className="mr-1"
                        icon={["fas", `bed`]}
                        size="1x"
                      />
                      <span>
                        {habitaciones} Dormitorio{habitaciones > 1 ? "s" : ""}
                      </span>
                    </div>
                  ) : null}
                  {banos ? (
                    <div className="inline-flex items-center mx-1">
                      <FontAwesomeIcon
                        className="mr-1"
                        icon={["fas", `bath`]}
                        size="1x"
                      />
                      <span>
                        {banos} Baño{banos > 1 ? "s" : ""}
                      </span>
                    </div>
                  ) : null}
                  {metros ? (
                    <div className="inline-flex items-center mx-1">
                      <FontAwesomeIcon
                        className="mr-1"
                        icon={["far", `map`]}
                        size="1x"
                      />
                      <span>{metros}m2</span>
                    </div>
                  ) : null}
                  <div className="inline-flex items-center mx-1">
                    <FontAwesomeIcon
                      className="mr-1"
                      icon={["fas", `house`]}
                      size="1x"
                    />
                    <span>Residencial</span>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href={`https://www.facebook.com/BienesRaicesEka/posts/${post.id}`}
                    target={"_blank"}
                  >
                    <button
                      className={`bg-blue-500 hover:bg-blue-400 text-white 
                font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 
                rounded w-32`}
                    >
                      Ver Detalles
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostItem;

//TODO: Style the posts
