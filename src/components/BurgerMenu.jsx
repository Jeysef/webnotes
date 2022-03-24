import Menulist from "./menuList";
import "./stylesForComponents/menuButton.css";

const BurgerMenu = ({
    menu,
    username,
    toogleLoginForm,
    postContent,
    toogleSignupForm,
    createNewUser,
}) => {
    const handleToogle = () => {
      document.getElementById("menu-window-toogleOverlay").checked = true
      document.getElementsByClassName(
        "menu-window-center"
    )[0].style.transform = "translate(-50%, -50%) scale(0)";
    document.getElementById("overlay").style.transform = "scale(0)";
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
        <div id="burgerMenuButtonWrapper">
            <div className="LinksWrapper" id="burgerMenuButton">
                <input
                    id="menu-toggle"
                    type="checkbox"
                    value="toogled menu"
                    onChange={handleToogle}
                />
                <label className="menu-btn" for="menu-toggle">
                    <span></span>
                </label>

                <Menulist
                    menu={menu}
                    username={username}
                    toogleLoginForm={toogleLoginForm}
                    postContent={postContent}
                    toogleSignupForm={toogleSignupForm}
                    createNewUser={createNewUser}
                />
            </div>
        </div>
    );
};

export default BurgerMenu;
