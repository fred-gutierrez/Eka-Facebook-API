import React from "react";
import HomesItem from "../components/HomesItem";
import facebookAPI from "../data/facebookAPI";

export default function Homes() {
  return (
    <div>
      Homes
      {facebookAPI.map((data) => (
        <HomesItem name={data.name} />
      ))}
    </div>
  );
}
