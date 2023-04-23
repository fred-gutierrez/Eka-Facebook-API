import { Link } from "react-router-dom";
import { Post } from "../types/postTypes";
import postData from "../data/postsData.json";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Inicio() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    getMainImage(postData[currentIndex])
  );

  function getMainImage(post: Post): string | undefined {
    return post.attachments?.data?.[0]?.subattachments.data[0].media?.image
      ?.src;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === postData.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, [currentIndex, postData]);

  useEffect(() => {
    setCurrentImage(getMainImage(postData[currentIndex]));
  }, [currentIndex]);

  return (
    <>
      <div className="relative">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center blur-[5px] transition-all duration-700"
          style={{
            backgroundImage: `url(${currentImage})`,
          }}
        ></div>
        <div className="relative py-56 md:py-72 px-8">
          <h1 className="text-center text-white md:text-4xl text-2xl font-bold">
            ¡Casas en Venta, Renta y Propiedades
            <br />
            Comerciales!
          </h1>
          <div className="text-center">
            <Link to="/propiedades">
              <button
                className={`bg-green-500 hover:bg-green-400 text-white 
                font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 
                w-52 mt-7 rounded-full text-center`}
              >
                Ver Propiedades
                <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  className="text-white ml-2 font-bold"
                  size="lg"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
