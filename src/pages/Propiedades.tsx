import { nanoid } from "nanoid";
import React from "react";
import PropiedadesItem from "../components/PropiedadesItem";
import facebookAPI from "../data/facebookAPI";

export default function Propiedades() {
  return (
    <div>
      Propiedades
      <PropiedadesItem />
    </div>
  );
}
