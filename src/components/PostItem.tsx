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
        const locationString = location !== null ? location[1] : "";

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
          /(\d+(?:\.\d+)?)\s*(?=m²|M2|metros\s+cuadrados|mts|de terreno|de construcci[oó]n|terreno)/i
        );
        const metros = metrosMatch ? parseFloat(metrosMatch[1]) : 0;

        // * Residencial|Lote|Bodega|Casa|Apartamento|Terreno
        const propertiesArray =
          post.message
            .match(
              /\b(residencial|lote|bodega|casa|apartamento|terreno|local)\b/gi
            )
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) || [];
        const propertyType = [
          ...new Set(
            propertiesArray.includes("Residencial")
              ? ["Residencial"]
              : [propertiesArray[0]]
          ),
        ];

        type Interior = {
          ifStatement: number | boolean;
          icon: any;
          desc: string;
          display: number;
        };

        const interiorDetails: Interior[] = [
          {
            ifStatement: habitaciones,
            icon: "bed",
            desc: ` Dormitorio${habitaciones > 1 ? "s" : ""}`,
            display: habitaciones,
          },
          {
            ifStatement: banos,
            icon: "bath",
            desc: ` Baño${banos > 1 ? "s" : ""}`,
            display: banos,
          },
          {
            ifStatement: metros >= 45 ? metros : false,
            icon: "map",
            desc: "m2",
            display: metros,
          },
        ];

        type Property = {
          propType: string;
          icon: any;
        };

        const propertiesType: Property[] = [
          {
            propType: "Residencial",
            icon: "house-user",
          },
          {
            propType: "Terreno",
            icon: "mountain-sun",
          },
          {
            propType: "Casa",
            icon: "house-chimney",
          },
          {
            propType: "Apartamento",
            icon: "building-user",
          },
          {
            propType: "Local",
            icon: "shop",
          },
          {
            propType: "Bodega",
            icon: "warehouse",
          },
        ];

        return (
          <li
            key={index}
            id={post.id}
            className={`
            bg-gray-100 border-2 border-gray-200
            shadow-lg shadow-gray-200
            items-center
            mb-6 md:mb-6 py-8 md:py-6 px-5 mx-5
            max-w-screen-xl md:grid md:grid-cols-2
            xl:mx-auto rounded-xl`}
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
                    attachment.subattachments.data.map((subattachment: any) => (
                      <img
                        src={subattachment.media.image.src}
                        alt={`Facebook post image ${index}`}
                        className={`h-28 md:h-40 2xl:h-44 lg:h-40
                        min-w-full rounded-lg object-cover mx-auto`}
                      />
                    ))
                  )}
              </div>
            </div>
            <div>
              <div className="mt-4 md:ml-5 grid grid-cols-2">
                <h1 className={`text-lg md:text-xl`}>{title}</h1>
                <div className="mx-auto">
                  <h1 className={`text-xl sm:text-2xl font-bold`}>{price}</h1>
                  <h1 className={`text-lg text-center font-light`}>
                    {alquilerVenta}
                  </h1>
                </div>
              </div>
              {locationString && (
                <div className="mt-4 md:ml-5 flex items-center">
                  <FontAwesomeIcon
                    className="mr-2 text-red-500"
                    icon={["fas", `location-dot`]}
                    size="sm"
                  />
                  <h1 className={`text-lg font-light`}>{locationString}</h1>
                </div>
              )}
              <div className="mt-4 md:ml-5 grid grid-cols-2">
                <div>
                  {interiorDetails.map((intDetails) =>
                    intDetails.ifStatement ? (
                      <div className="flex items-center my-1">
                        <FontAwesomeIcon
                          className="mr-1 text-gray-800"
                          icon={[
                            intDetails.ifStatement === metros ? "far" : "fas",
                            intDetails.icon,
                          ]}
                          size="lg"
                        />
                        <span>
                          {intDetails.display}
                          {intDetails.desc}
                        </span>
                      </div>
                    ) : null
                  )}
                  {propertiesType.map(
                    (property) =>
                      propertyType.includes(property.propType) && (
                        <div className="flex items-center my-1">
                          <FontAwesomeIcon
                            className="mr-1 text-gray-800"
                            icon={["fas", property.icon]}
                            size="lg"
                          />
                          <span>{property.propType}</span>
                        </div>
                      )
                  )}
                </div>
                <div className="text-center">
                  <a
                    href={`https://www.facebook.com/BienesRaicesEka/posts/${post.id}`}
                    target={"_blank"}
                  >
                    <button
                      className={`bg-orange-500 hover:bg-orange-400 text-white 
                font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 
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
