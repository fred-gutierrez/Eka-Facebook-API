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
}

const accessToken =
  "EAAKI47hCLskBAATlKSvZBf2MZCZAK1Pby2zMcvfeKqQK14D10ffrZBa1NyKeqAHDJUtXJgcI9SJLohZCtooZAactQKKnodJl8DfBNf3J9vxJxO9o6nzV4PIKBJwkZABEsFxXnVHMSCLe2U2BTMOHEDJYNlCEy86FOxv492b5vxMKgcZBynnAzdZACFI5m61kUN6vv0Rj5ArZC2xYkybDZCZAZACxhoHNzRTZA5n1sZD";

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
      `https://graph.facebook.com/me?fields=posts{message,attachments{subattachments{media{image{src}}}}}&access_token=${accessToken}`
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
