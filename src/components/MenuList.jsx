import React from "react";

const Menulist = ({menu}) => {
  const toogle = (event) => {
    if (event.target.tagName !== "INPUT")
      document.getElementById("menu__toggle").checked =
        !document.getElementById("menu__toggle").checked;
  };
  return (
    <ul className="menu__box ">
      <li>
        <div
          className="menu__item"
          onClick={(event) => {
            toogle(event);
          }}
        >
          <div className="logo">
            <div>
              <img className="imageIcon" src={process.env.PUBLIC_URL + '/img/favicon.ico'} alt="Icon" />
            </div>
          </div>
        </div>
      </li>
      <li>
        <a
          className="menu__item"
          href="#main"
          onClick={(event) => {
            toogle(event);
          }}
        >
          Home
        </a>
      </li>
      <li>
        <a
          className="menu__item"
          href="#main"
          onClick={(event) => {
            toogle(event);
          }}
        >
          {menu[0]}
        </a>
      </li>
      <li>
        <a
          className="menu__item"
          href="#main"
          onClick={(event) => {
            toogle(event);
          }}
        >
          {menu[1]}
        </a>
      </li>
      <li>
        <a
          className="menu__item"
          href="#main"
          onClick={(event) => {
            toogle(event);
          }}
        >
          {menu[2]}
        </a>
      </li>
      <li>
        <a
          className="menu__item"
          href="#secondPage"
          onClick={(event) => {
            toogle(event);
          }}
        >
          {menu[3]}
        </a>
      </li>
    </ul>
  );
};

export default Menulist;
