import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const LoginForm = ({
    toogleOverlay,
    toogleLoginForm,
    handleLogIn,
    handleSignUp,
    toogleSignupForm,
    loginFormMode,
    setLoginFormMode,
}) => {
    const [vusername, setVusername] = useState("");
    const [vpassword, setVpassword] = useState("");

    const submit = () => {
        toogleLoginForm();

        if (loginFormMode === "Log In") {
            handleLogIn({ username: vusername, password: vpassword });
        } else if (loginFormMode === "Sign Up") {
            handleSignUp({ username: vusername, password: vpassword });
        }
    };

    // const list = document.querySelectorAll(".logMode-list");
    const activeLink = (e) => {
        const clicked = e.target;
        document
            .querySelectorAll(".logMode-list")
            .forEach((item) => item.classList.remove("active"));
        clicked.classList.add("active");

        if (clicked.textContent === "Log In") {
            setLoginFormMode("Log In");
        } else if (clicked.textContent === "Sign Up") {
            // document.getElementById("logMode-btn").value = "Sign Up";
            setLoginFormMode("Sign Up");
        }
    };

    // list.forEach((item) => {
    //   item.addEventListener("click", activeLink);
    // });
    return (
        <>
            <div className="menu-window-center">
                <div style={{ borderRadius: "0.25rem" }}>
                    <div className="NotePopupTitle">
                        <div
                            className="NotePopupTitleCild logMode-wrapper"
                            
                        >
                            <div className="logMode">
                                <ul>
                                    <li
                                        className="logMode-list active"
                                        onClick={activeLink}
                                    >
                                        Log In
                                    </li>
                                    <li
                                        className="logMode-list"
                                        onClick={activeLink}
                                    >
                                        Sign Up
                                    </li>
                                    <div className="logMode-indicator">
                                        <div>
                                            <div></div>
                                        </div>
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <span
                                className="login-form-x"
                                onClick={() => {
                                    toogleLoginForm();
                                }}
                            >
                                <FaTimes />
                            </span>
                            <div className="logMode-bottomPanel"></div>
                        </div>
                        <div className="login-form-wrapper">
                            {/* <div className="login-form-title"></div> */}
                            <form
                                className="login-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    submit();
                                }}
                            >
                                <div>username</div>
                                <input
                                    class="logMode-input"
                                    type="text"
                                    name="login-username"
                                    onChange={(e) => {
                                        setVusername(e.target.value);
                                    }}
                                />
                                <div>password</div>
                                <input
                                    class="logMode-input"
                                    type="password"
                                    name="login-password"
                                    onChange={(e) => {
                                        setVpassword(e.target.value);
                                    }}
                                />
                                <input
                                    id="logMode-btn"
                                    type="submit"
                                    value={loginFormMode}
                                    className="addNoteBtn"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <input
                id="menu-window-toogleOverlay"
                type="checkbox"
                style={{ transform: "scale(0)", position: "absolute" }}
            />
        </>
    );
};
export default LoginForm;
