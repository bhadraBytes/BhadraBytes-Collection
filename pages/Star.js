import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Star = ({ filled, onClick }) => {
  return filled ? (
    <AiFillStar className="star filled" onClick={onClick} />
  ) : (
    <AiOutlineStar className="star" onClick={onClick} />
  );
};

export default Star;
