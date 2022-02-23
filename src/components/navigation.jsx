// import { useState } from "react";

// import my components
import LoginForm from "./loginForm";
import BurgerMenu from "./burgerMenu";
// import MenuButtons from "./menuButtons";

const Navigation = ({
  username,
  setUsername,
  password,
  setPassword,
  toogleOverlay,
  toogleLoginForm,
  postContent,
  signUp,
  createNewUser,
}) => {
  const toogleBackgroundColourMenu = () => {};
  const inSidemenu = false;
  const menu = ["Save", "Colours", "Log in", "Sign Up", "About Me"];
  // const menu2 = [
  //   {
  //     title: "Save",
  //     style: { cursor: username === "load" ? "default" : "pointer" },
  //     className: function () {
  //       if (inSidemenu) {
  //         return "menu-item";
  //       } else {
  //         if (username === "load") {
  //           return "topBottomNavigation-menu-button btn-save-pasive";
  //         } else {
  //           return "topBottomNavigation-menu-button btn-save-active";
  //         }
  //       }
  //     },
  //     onClick: function () {
  //       if (username !== "load") {
  //         postContent();
  //       }
  //     },
  //     content: function () {
  //       return <p>{this.title}</p>;
  //     },
  //   },
  //   {
  //     title: "Colours",
  //     style: null,
  //     className: function () {
  //       if (inSidemenu) {
  //         return "menu-item";
  //       } else {
  //         return "topBottomNavigation-menu-button flex-between";
  //       }
  //     },
  //     onClick: toogleBackgroundColourMenu(),
  //     content: function () {
  //       return (
  //         <>
  //           <p>{this.title}</p>
  //           <div className="BackgroundColorDropMenu">
  //             <div style={{ borderRadius: "0.25rem" }}>
  //               <div className="NotePopupTitle">
  //                 <span
  //                   className="button"
  //                   style={{
  //                     justifyContent: "center",
  //                     width: "100%",
  //                   }}
  //                 >
  //                   Change backgroung color
  //                 </span>
  //                 <span
  //                   onClick={() => toogleBackgroundColourMenu()}
  //                   className="button"
  //                   title="Close Menu"
  //                 >
  //                   &times;
  //                 </span>
  //               </div>
  //               <a className="button">
  //                 <colors style={{ width: "100%" }}>
  //                   <white onClick="changeBgColor(note[1], 4, 'main')"></white>
  //                   <red onClick="changeBgColor(note[1], 0, 'main')"></red>
  //                   <blue onClick="changeBgColor(note[1], 1, 'main')"></blue>
  //                   <green onClick="changeBgColor(note[1], 2, 'main')"></green>
  //                   <gray onClick="changeBgColor(note[1], 3, 'main')"></gray>
  //                 </colors>
  //               </a>
  //             </div>
  //           </div>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     title: "Log In",
  //     style: null,
  //     className: function () {
  //       if (inSidemenu) {
  //         return "menu-item";
  //       } else {
  //         return "topBottomNavigation-menu-button ";
  //       }
  //     },
  //     onClick: function () {
  //       toogleOverlay();
  //       toogleLoginForm();
  //     },
  //     content: function () {
  //       return (
  //         <LoginForm
  //           username={username}
  //           setUsername={setUsername}
  //           password={password}
  //           setPassword={setPassword}
  //           toogleOverlay={toogleOverlay}
  //           toogleLoginForm={toogleLoginForm}
  //           createNewUser={createNewUser}
  //         />
  //       );
  //     },
  //   },
  //   {
  //     title: "Sign Up",
  //     style: null,
  //     className: function () {
  //       if (inSidemenu) {
  //         return "menu-item";
  //       } else {
  //         return "topBottomNavigation-menu-button ";
  //       }
  //     },
  //     onClick: function () {
  //       signUp();
  //     },
  //     content: function () {
  //       return <p>{this.title}</p>;
  //     },
  //   },
  //   {
  //     title: "About Me",
  //     style: null,
  //     className: function () {
  //       if (inSidemenu) {
  //         return "menu-item";
  //       } else {
  //         return "topBottomNavigation-menu-button ";
  //       }
  //     },
  //     onClick: function () {
  //       signUp();
  //     },
  //     content: function () {
  //       return <a href="#secondPage">{this.title}</a>;
  //     },
  //   },
  // ];
  /*

  * FUNCTIONS

    */

  let deferredPrompt;
  const addBtn = document.querySelector(".a2hs");

  return (
    <nav id="topBottomNavigation" className="topBottomNavigation">
      <div className="logo">
        <div>
          <img
            className="imageIcon"
            src={process.env.PUBLIC_URL + "/img/favicon.ico"}
            alt="Icon"
          />
          <a href="#main"></a>
        </div>
      </div>
      <div className="topBottomNavigation-menu-wrapper ms-hiddenSm">
        {/* <MenuButtons /> */}
        <ul className="topBottomNavigation-menu-list">
          <li
            className={
              username == "load"
                ? "topBottomNavigation-menu-button btn-save-pasive"
                : "topBottomNavigation-menu-button btn-save-active"
            }
            style={{ cursor: username == "load" ? "default" : "pointer" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0",
              }}
              onClick={() => {
                if (username != "load") {
                  postContent();
                }
              }}
            ></div>
            {/* save */}
            <p>{menu[0]}</p>
            <div className="ttt"></div>
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
                    style={{
                      justifyContent: "center",
                      width: "100%",
                    }}
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
                <button className="button">
                  <colors style={{ width: "100%" }}>
                    <white onClick="changeBgColor(note[1], 4, 'main')"></white>
                    <red onClick="changeBgColor(note[1], 0, 'main')"></red>
                    <blue onClick="changeBgColor(note[1], 1, 'main')"></blue>
                    <green onClick="changeBgColor(note[1], 2, 'main')"></green>
                    <gray onClick="changeBgColor(note[1], 3, 'main')"></gray>
                  </colors>
                </button>
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
              onClick={() => {
                toogleOverlay();
                toogleLoginForm();
              }}
            ></div>
            <p>{menu[2]}</p>
            {/* <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              toogleOverlay={toogleOverlay}
              toogleLoginForm={toogleLoginForm}
            /> */}
          </li>
          <li className="topBottomNavigation-menu-button">
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0",
              }}
              onClick={() => signUp()}
            ></div>
            <p>{menu[3]}</p>
          </li>
          <li className="topBottomNavigation-menu-button">
            <a href="#secondPage">{menu[4]}</a>
          </li>
          <li className="topBottomNavigation-menu-button">
            <p>user: {username}</p>
          </li>
        </ul>
      </div>
      <BurgerMenu menu={menu} />
    </nav>
    // <MenuButtons />
  );
};

export default Navigation;
