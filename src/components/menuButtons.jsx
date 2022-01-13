// import styles
import "./stylesForComponents/menuButton.css";

export default function MenuButtons() {
    const toogle = () => {
        // console.log(document.getElementsByClassName("menu-toggle")[0])
        if (
          document
            .getElementsByClassName("menu-box")[0]
            .classList.contains("transition_opening")
        ) {
          document
            .getElementsByClassName("menu-box")[0]
            .classList.remove("transition_opening");
        }
        if (
          document
            .getElementsByClassName("menu-box")[0]
            .classList.contains("transition_closing")
        ) {
          document
            .getElementsByClassName("menu-box")[0]
            .classList.remove("transition_closing");
        }
        if (document.getElementById("menu-toggle").checked) {
          // Returns true if checked
          document
            .getElementsByClassName("menu-box")[0]
            .classList.add("transition_opening");
        } else {
          // Returns false if not checked
          document
            .getElementsByClassName("menu-box")[0]
            .classList.add("transition_closing");
        }
      };
    
    return (
        <ul className="menu-box ms-hiddenSm topBottomNavigation-menu-list">
          <li>
            <div
              className="menu-item menu-item1 topBottomNavigation_button"
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
              className="menu-item topBottomNavigation_button"
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
              className="menu-item"
              href="#main"
              onClick={(event) => {
                toogle(event);
              }}
            >
              Colors
            </a>
          </li>
          <li>
            <a
              className="menu-item"
              href="#main"
              onClick={(event) => {
                toogle(event);
              }}
            >
              Log in
            </a>
          </li>
          <li>
            <a
              className="menu-item"
              href="#main"
              onClick={(event) => {
                toogle(event);
              }}
            >
              Save
            </a>
          </li>
          <li>
            <a
              className="menu-item"
              href="#secondPage"
              onClick={(event) => {
                toogle(event);
              }}
            >
              About me
            </a>
          </li>
        </ul>
      );
}
