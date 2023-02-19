import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import PostItem from "../components/PostItem";
import "firebase/compat/database";

export interface Post {
  attachments: {
    data: {
      subattachments: {
        data: {
          media: {
            image: {
              src: string;
            };
          };
        }[];
      };
    }[];
  };
  message: string;
  full_picture: string;
}

const accessToken =
  "EAAKI47hCLskBAPJjPr2nyUcZCyENV5QtB8LgZBwFU97PhQdKoOcUhNZC5O4iToqtfZBFrGrwxOhhEyd54w6Pbmq3ZCrxiEK7Qvu1kFP5BWZCLD3bLZC9FwoQjP0xJ1qokMDu434lUSBxJtMSe3XeVmZCxfbpQWjh2NXiZA86jMSZApz15oVZCCGWQvNCuc8Yghm59lgILaqBYEompU2cc9C0iebqtHpigYBCQQZD";

const FacebookPosts = () => {
  const [postData, setPostData] = useState<Post[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyA26FdJWg9uHZXEo-12VidTdpAzqtOqzEM",
      authDomain: "eka-bienes-raices.firebaseapp.com",
      projectId: "eka-bienes-raices",
      storageBucket: "eka-bienes-raices.appspot.com",
      messagingSenderId: "1085739121193",
      appId: "1:1085739121193:web:ddebcadabd83877dde3a38",
      measurementId: "G-5BFQ5Q1J56",
    };
    firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
    const postsRef = database.ref("posts");

    fetch(
      `https://graph.facebook.com/me?fields=posts{message,full_picture,attachments{subattachments{media{image{src}}}}}&access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.posts.data);
        postsRef.set(data.posts.data);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return <PostItem postData={postData} />;
};

export default FacebookPosts;
