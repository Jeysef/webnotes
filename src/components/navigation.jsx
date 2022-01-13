import { useState } from "react";
// import my components
import LoginForm from "./loginForm";
import BurgerMenu from "./burgerMenu";
import MenuButtons from "./menuButtons";

const Navigation = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const menu = ["Save", "Colours", "Log in", "About Me"];
  /*

  * FUNCTIONS

  */
  const toogle = () => {
    if (!document.getElementById("menu-window-toogle").checked) {
      document.getElementsByClassName("menu-window-center")[0].style.transform =
        "scale(0)";
      document.getElementById("overlay").style.transform = "scale(0)";
    } else {
      document.getElementsByClassName("menu-window-center")[0].style.transform =
        "scale(1)";
      document.getElementById("overlay").style.transform = "scale(1)";
    }
    document.getElementById("menu-window-toogle").checked =
      !document.getElementById("menu-window-toogle").checked;
  };
  let deferredPrompt;
  const addBtn = document.querySelector(".a2hs");

  return (
    <nav id="topBottomNavigation" class="topBottomNavigation">
      <div className="logo">
        <div>
          <img
            className="imageIcon"
            src={process.env.PUBLIC_URL + "/img/favicon.ico"}
            alt="Icon"
          />
        </div>
      </div>
      <div className="topBottomNavigation-menu-wrapper ms-hiddenSm">
        {/* <MenuButtons /> */}
         <ul className="topBottomNavigation-menu-list">
          <li className="topBottomNavigation-menu-button">
            <p>{menu[0]}</p>
          </li>
          <li
            className="topBottomNavigation-menu-button flex-between"
            onClick="toogleBackgroundColourMenu()"
          >
            <p>{menu[1]}</p>
            <div className="BackgroundColorDropMenu">
              <div style={{ borderRadius: "0.25rem" }}>
                <div className="NotePopupTitle">
                  <span
                    className="button"
                    style={{ justifyContent: "center", width: "100%" }}
                  >
                    Change backgroung color
                  </span>
                  <span
                    onClick="toogleBackgroundColourMenu()"
                    className="button"
                    title="Close Menu"
                  >
                    &times;
                  </span>
                </div>
                <a className="button">
                   <colors style={{ width: "100%" }}>
                    <white onClick="changeBgColor(note[1], 4, 'main')"></white>
                    <red onClick="changeBgColor(note[1], 0, 'main')"></red>
                    <blue onClick="changeBgColor(note[1], 1, 'main')"></blue>
                    <green onClick="changeBgColor(note[1], 2, 'main')"></green>
                    <gray onClick="changeBgColor(note[1], 3, 'main')"></gray>
                  </colors> 
                </a> 
              </div> 
            </div>
          </li>
          <li className="topBottomNavigation-menu-button">
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0",
              }}
              onClick={toogle}
            ></div>
            <p>{menu[2]}</p>
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          </li>
          <li className="topBottomNavigation-menu-button">
            <a href="#secondPage">{menu[3]}</a>
          </li>
        </ul> 
      </div>
      <BurgerMenu menu={menu} />
    </nav>
    // <MenuButtons />
  );
};

export default Navigation;
