// import logo from './logo.svg';
import { useState } from "react";
import "./index.css";
import LoginForm  from "./components/loginForm";
import BurgerMenu from "./components/BurgerMenu";

const HeaderApp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const menu = ["Save", "Add to home screen", "Log in", "About Me"]
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
  const addBtn = document.querySelector('.a2hs');

  window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});

  return (
    <>
      <div className="logo">
        <div>
          <img className="imageIcon" src={process.env.PUBLIC_URL + '/img/favicon.ico'} alt="Icon" />
        </div>
      </div>
      <div className="wrapper mob-hide">
        <ul>
          <li className="bookmark">
            <p >{menu[0]}</p>
          </li>
          <li
            className="bookmark flex-between a2hs"
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
          <li className="bookmark">
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
            <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
          </li>
          <li className="bookmark">
            <a href="#secondPage">{menu[3]}</a>
          </li>
        </ul>
      </div>
      <BurgerMenu  menu={menu}/>
    </>
  );
};

export default HeaderApp;
