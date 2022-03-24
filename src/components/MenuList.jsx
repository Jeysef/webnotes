const Menulist = ({
    menu,
    username,
    toogleLoginForm,
    postContent,
    toogleSignupForm,
    createNewUser,
}) => {
    const toogleMobMenu = (event) => {
        if (event.target.tagName !== "INPUT")
            document.getElementById("menu-toggle").checked =
                !document.getElementById("menu-toggle").checked;
    };
    return (
        <ul className="menu-box ">
            <li>
                <div
                    className="menu-item"
                    onClick={(event) => {
                        toogleMobMenu(event);
                    }}
                >
                    <div className="logo">
                        <div>
                            <img
                                className="imageIcon"
                                src={
                                    process.env.PUBLIC_URL + "/img/favicon.ico"
                                }
                                alt="Icon"
                            />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a
                    className="menu-item"
                    href="#main"
                    onClick={(event) => {
                        toogleMobMenu(event);
                    }}
                >
                    Home
                </a>
            </li>
            <li
                className={
                    username === "load" || username === ""
                        ? "menu-item"
                        : "menu-item btn-save-active"
                }
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        left: "0",
                        top: "0",
                    }}
                    onClick={(event) => {
                        if (
                            event.target.parentElement.classList.contains(
                                "btn-save-active"
                            )
                        ) {
                            postContent();
                        }
                        toogleMobMenu(event);
                    }}
                ></div>
                {/* save */}
                <p>{menu[0]}</p>
            </li>
            {/* <li>
                <a
                    className="menu-item"
                    href="#main"
                    onClick={(event) => {
                        toogleMobMenu(event);
                    }}
                >
                    {menu[1]}
                </a>
            </li> */}
            <li className="menu-item">
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        left: "0",
                        top: "0",
                    }}
                    onClick={(event) => {
                        toogleLoginForm();
                        toogleMobMenu(event);
                    }}
                ></div>
                <p>{menu[2]}</p>
            </li>
            <li className="menu-item">
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        left: "0",
                        top: "0",
                    }}
                    onClick={(event) => {
                        toogleSignupForm();
                        toogleMobMenu(event);
                    }}
                ></div>
                <p>{menu[3]}</p>
            </li>
            <li className="menu-item">
                <a
                    href="#secondPage"
                    onClick={(event) => {
                        toogleMobMenu(event);
                    }}
                >
                    {menu[4]}
                </a>
            </li>
        </ul>
    );
};

export default Menulist;
