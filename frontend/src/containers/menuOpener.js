import React from "react";
import "../css/home/menuOpener.css";

const MenuOpener = props => {
  return (
    <div
      className={
        props.hasClicked ? "containerOpener change" : "containerOpener"
      }
      onClick={props.handleClick}
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
};

export default MenuOpener;
