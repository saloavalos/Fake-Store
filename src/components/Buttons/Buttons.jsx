import { useState } from "react";
import sprite from "/sprite.svg";
import "./buttons.scss";

// FIXME - use only one return instead of CloseButton and Button
// only one and use the needed classes

// I have to catch the onClick else it won't work
export const CloseButton = ({ onClick }) => {
  return (
    <a className="close-button" onClick={onClick}>
      <svg className="all-svg-icons close-icon">
        <use href={sprite + "#close"} />
      </svg>
    </a>
  );
};

export const Button = ({ text }) => {
  return <div>{text}</div>;
};
