import Menulist from "./MenuList";
import "./stylesForComponents/hamburgerMenu.css";

const BurgerMenu = ({ menu }) => {
  const handleToogle = () => {
    // console.log(document.getElementsByClassName("menu__toggle")[0])
    if (
      document
        .getElementsByClassName("menu__box")[0]
        .classList.contains("transition_opening")
    ) {
      document
        .getElementsByClassName("menu__box")[0]
        .classList.remove("transition_opening");
    }
    if (
      document
        .getElementsByClassName("menu__box")[0]
        .classList.contains("transition_closing")
    ) {
      document
        .getElementsByClassName("menu__box")[0]
        .classList.remove("transition_closing");
    }
    if (document.getElementById("menu__toggle").checked) {
      // Returns true if checked
      document
        .getElementsByClassName("menu__box")[0]
        .classList.add("transition_opening");
    } else {
      // Returns false if not checked
      document
        .getElementsByClassName("menu__box")[0]
        .classList.add("transition_closing");
    }
  };

  return (
    <div id="burgerMenuButtonWrapper">
      <div className="LinksWrapper" id="burgerMenuButton">
        <input
          id="menu__toggle"
          type="checkbox"
          value="toogled menu"
          onChange={handleToogle}
        />
        <label className="menu__btn" for="menu__toggle">
          <span></span>
        </label>

        <Menulist menu={menu} />
      </div>
    </div>
  );
};

export default BurgerMenu;
