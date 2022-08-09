import sprite from "/sprite.svg";
import "./buttons.scss";

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

export const Button = ({ text, icon, color, onClick }) => {
  return (
    <a className="btn-global" onClick={onClick}>
      {icon && (
        <svg className="all-svg-icons" style={{ stroke: color }}>
          <use href={sprite + `#${icon}`} />
        </svg>
      )}
      {text}
    </a>
  );
};
export default Button;
