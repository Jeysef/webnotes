import { useState } from "react";

// import my components
import LoginForm from "./loginForm";
import BurgerMenu from "./burgerMenu";
import MenuButtons from "./menuButtons";

const Navigation = ({
    username,
    setUsername,
    password,
    setPassword,
    toogleOverlay,
    postContent,
}) => {
    const menu = ["Save", "Colours", "Log in", "About Me"];
    /*

  * FUNCTIONS

    */

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
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                left: "0",
                            }}
                            onClick={() => postContent()}
                        ></div>
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
                            onClick={() => toogleOverlay()}
                        ></div>
                        <p>{menu[2]}</p>
                        <LoginForm
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            toogleOverlay={toogleOverlay}
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
