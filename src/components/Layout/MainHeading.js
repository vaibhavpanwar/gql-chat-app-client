import React from "react";
import { useSelector } from "react-redux";
const MainHeading = () => {
  const heading = useSelector((state) => state.heading);
  return <h2 className="main-heading">{heading}</h2>;
};

export default MainHeading;
