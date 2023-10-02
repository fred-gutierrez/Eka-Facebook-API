import postData from "../data/postsData.json";
import Header from "../components/Inicio/Header";
import RecentlyAdded from "../components/Inicio/RecentlyAdded";

export default function Inicio() {
  return (
    <>
      <Header />
      <RecentlyAdded postData={postData} />
    </>
  );
}
