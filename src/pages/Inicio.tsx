import postData from "../data/postsData.json";
import Header from "../components/Inicio/Header";
// import RecentlyAdded from "../components/RecentlyAdded";
import RecentlyAdded from "../components/Propiedades/RecentlyAddedTEST";

export default function Inicio() {
  return (
    <>
      <Header />
      {/* <RecentlyAdded postData={postData} /> */}
      <RecentlyAdded postData={postData} />
    </>
  );
}
