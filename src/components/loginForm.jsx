import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const LoginForm = ({username, setUsername, password, setPassword}) => {
  const [vusername, setVusername] = useState("");
  const [vpassword, setVpassword] = useState("");

  const submit = () => {


    toogle();
    // => app.js => func fetch data
      //You can reload the url like so
    // var newUrl=setParam(window.location.href,"user", username);
    // window.history.pushState("", "Page Title Here", newUrl);
    // url.searchParams.set('user', username);


    setUsername(vusername);
    setVusername("");
    setPassword(vpassword);
    setVpassword("");
  };
  function setParam(uri, key, val) {
    return uri
        .replace(RegExp("([?&]"+key+"(?=[=&#]|$)[^#&]*|(?=#|$))"), "&"+key+"="+encodeURIComponent(val))
        .replace(/^([^?&]+)&/, "$1?");
}
  function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

  const toogle = () => {
    document.getElementById("menu-window-toogle").checked =
      !document.getElementById("menu-window-toogle").checked;
    if (document.getElementById("menu-window-toogle").checked) {
      // console.log(document.getElementsByClassName("menu-window-center")[0].style)
      document.getElementsByClassName("menu-window-center")[0].style.transform = "scale(0)";
      document.getElementById("overlay").style.transform = "scale(0)";
    } else {
      document.getElementsByClassName("menu-window-center")[0].style.transform = "scale(1)";
      document.getElementById("overlay").style.transform = "scale(1)";
    }
  };

  return (
    <>
      <div className="menu-window-center">
        <div style={{ borderRadius: "0.25rem" }}>
          <div className="NotePopupTitle">
            <span
              className="button"
              style={{
                justifyContent: "center",
                width: "100%",
                display: "grid",
                overflow: "visible",
              }}
            >
              Please log in
              <span className="login-form-x" onClick={toogle}>
                <FaTimes />
              </span>
            </span>
            <div class="login-form-wrapper">
              {/* <div className="login-form-title"></div> */}
              <form
                class="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <div>username</div>
                <input
                  type="text"
                  name="login-username"
                  onChange={(e) => {
                    setVusername(e.target.value);
                  }}
                />
                <div>password</div>
                <input
                  type="password"
                  name="login-password"
                  onChange={(e) => {
                    setVpassword(e.target.value);
                  }}
                />
                <input type="submit" value="Log in" className="addNoteBtn" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <input
        id="menu-window-toogle"
        type="checkbox"
        style={{ transform: "scale(0)", position: "absolute" }}
      />
    </>
  );
};
export default LoginForm;
