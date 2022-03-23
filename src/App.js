import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import jQuery from "jquery";
// import mousewheel from "./components/mousewheel";

// import my components
import Navigation from "./components/navigation";
import Cards from "./components/noteComponents/cards";
import AboutMeApp from "./components/aboutMeApp";
import NewCardForm from "./components/noteComponents/newCardForm";
import LoginForm from "./components/loginForm";

// import styles
// import "./index.css";

const MainApp = () => {
    const loadingJson = {
        content: [
            {
                id: 0,
                title: "loading...",
                notes: [{ content: "loading...", id: 0, mark: false }],
            },
        ],
    };
    // State Holder
    const [jsonDataUrl, setJsonDataUrl] = useState(
        "https://api.jsonstorage.net/v1/json/90192964-b43a-4291-8184-278f70f45ce8/ff047acd-2dc5-43f9-8dc4-3687717f0bdb?apiKey=5489b554-1a5e-4978-a915-b5fe3b8433af"
    );
    // user username
    const [username, setUsername] = useState("load");
    // user password
    const [password, setPassword] = useState("");
    const [allData, setAllData] = useState({});
    const [content, setContent] = useState(loadingJson);
    const [beChanging, setBeChanging] = useState(false);

    /*
  
  * FUNCTIONS
  
  */
    const clearBeforeChange = () => {
        setBeChanging(true);
    };
    const handleLogIn = (userData) => {
        const username = userData.username;
        const password = userData.password;
        if (username === "" || username === "load") {
          alert("You can't use this username.")
          return
        }

        console.log("FETCHING_FROM_SERVER");
        clearBeforeChange();

        fetchAllData();
        // const dataaa = await fetchContent(function (data) {
        //   setAllData(data);
        // });
        // await fetch(jsonDataUrl)
        //   .then((r) => r.json())
        //   .then((data) => {
        //     console.log(data);
        //     setAllData(data);
        //     // callback(data);
        //     // return data
        //   })
        //   .catch((e) => console.log("Booo"));
        // const initFetch = async () => {
        //   const gog = await fetchContent(function (data) {
        //     setAllData(data);
        //   });
        //   return gog;
        // };

        // console.log(await initFetch());
        // setAllData(await initFetch());
        // console.log(allData, allData[username]);

        // catch errors
        if (Object.entries(allData).length === 0) {
            alert("couldnt fetch from database");
        } else if (!allData[username]) {
            alert("User do not exist.");
        } else {
            console.log("DATA_FETCHED_SUCCESFULLY");
            setUsername(username);
            setPassword(password);
            setContent(allData[username]);
        }
    };
    const handleSignUp = (userData) => {
        const username = userData.username;
        const password = userData.password;

        console.log("FETCHING_FROM_SERVER");
        clearBeforeChange();
        fetchAllData();

        // check if username is valid
        if (username === ("load" | "")) {
            alert("This username can not be used.");
        }
        // catch errors
        else if (!allData) {
            alert("couldnt fetch from database");
        }
        // check if username already exist
        else if (allData[username]) {
            alert("User already exist. Log in.");
        } else {
            console.log("DATA_FETCHED_SUCCESFULLY");
            createNewUser(userData);
            setUsername(username);
            setPassword(password);
        }
    };
    const fetchAllData = async () => {
        console.log("FETCHING_FROM_SERVER");
        await fetchContent(function (data) {
            setAllData(data);
        });
    };
    const fetchContent = async (callback) => {
        try {
            const r = await fetch(jsonDataUrl);
            const data = await r.json();
            callback(data);
            return data;
        } catch (e) {
            return console.log("something went wrong");
        }

        //   $.getJSON(jsonDataUrl, function (data) {
        //     callback(data);
        //   });
        //   var request = $.ajax({
        //     type: 'GET',
        //     url: "http://google.com",
        //     async: true,
        //     success: function (data, textStatus, jqXHR) {
        //       alert("succes");
        //       // load sended json
        //       $.get(data.uri, function (data, textStatus, jqXHR) {
        //         //   var json = JSON.stringify(data);
        //         console.log(copyOf(data));
        //       });
        //     },
        //     error: function (event, jqxhr, settings) {
        //       if (settings.url.indexOf("nonexistentfile.htm") !== -1) {
        //         alert("something went wrong");
        //       } else if (settings.url.indexOf("nonexistentjsonfile.htm") !== -1) {
        //         alert("something went wrong");
        //       }
        //     },
        // });

        // var xhr = new XMLHttpRequest();

        // xhr.open("GET", jsonDataUrl, true);
        // xhr.responseType = "json";

        // xhr.onload = function () {
        //   var status = xhr.status;
        //   if (status === 200) {
        //     const dataOut = xhr.response;
        //     const data = copyOf(dataOut);
        //     console.log("dataUot", data);
        //     // setAllData(dataOut);
        //     callback(data);
        //   } else {
        //     alert("Sorry, can not fetch data from server. Error:  " + status);
        //   }
        // };
        // xhr.send();
    };
    const postContent = async () => {
        //   must done this with jquery because i cannot done it with xhr
        // fetch content to get actual data
        fetchAllData();
        // modify state
        const becontent = copyOf(allData);
        becontent[username] = content;
        // save state to data
        var data = JSON.stringify(becontent);

        $.ajax({
            url: jsonDataUrl,
            type: "PUT",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                alert("succes");
                // load sended json
                $.get(data.uri, function (data, textStatus, jqXHR) {
                    //   var json = JSON.stringify(data);
                    setAllData(copyOf(data));
                });
            },
            error: function (event, jqxhr, settings) {
                if (settings.url.indexOf("nonexistentfile.htm") !== -1) {
                    alert("something went wrong");
                } else if (
                    settings.url.indexOf("nonexistentjsonfile.htm") !== -1
                ) {
                    alert("something went wrong");
                }
            },
        });
    };
    const createNewUser = async (userData) => {
        console.log("CREATING_NEW_USER");
        //   must done this with jquery because i cannot done it with xhr
        // fetch content to get actual data
        await fetchContent(function (data) {
            setAllData(data);
        });
        // modify state
        const becontent = copyOf(allData);
        // becontent[username] = content;
        const userUsername = userData.username;
        const userPassword = userData.password;
        const newUser = {
            [userUsername]: {
                content: [
                    {
                        id: 0,
                        title: "Start by renaming this card",
                        notes: [
                            {
                                content:
                                    "And then you can add notes like this one.",
                                id: 0,
                                mark: false,
                            },
                        ],
                    },
                ],
                password: userPassword,
            },
        };

        const newbecontent = {
            ...becontent,
            ...newUser,
        };
        console.log(newbecontent);
        // becontent[username] = content;
        // save state to data
        var data = JSON.stringify(becontent);

        $.ajax({
            url: jsonDataUrl,
            type: "PUT",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                setContent({
                    content: [
                        {
                            id: 0,
                            title: "Start by renaming this card",
                            notes: [
                                {
                                    content:
                                        "And then you can add notes like this one.",
                                    id: 0,
                                    mark: false,
                                },
                            ],
                        },
                    ],
                    password: userPassword,
                });
                alert("Succesfully created new user: ", userUsername);
                // load sended json
                $.get(data.uri, function (data, textStatus, jqXHR) {
                    //   var json = JSON.stringify(data);
                    console.log("fetched data", copyOf(data));
                });
            },
            error: function (event, jqxhr, settings) {
                if (settings.url.indexOf("nonexistentfile.htm") !== -1) {
                    alert("something went wrong");
                } else if (
                    settings.url.indexOf("nonexistentjsonfile.htm") !== -1
                ) {
                    alert("something went wrong");
                }
            },
        });
        // save for sake
        postContent();
    };
    const UrlExists = (url, cb) => {
        jQuery.ajax({
            url: url,
            dataType: "text",
            type: "GET",
            complete: function (xhr) {
                if (typeof cb === "function") cb.apply(this, [xhr.status]);
            },
        });
    };

    const copyOf = (Data) => {
        return JSON.parse(JSON.stringify(Data));
    };

    const AddNewCardHandler = (titleName) => {
        if (content["content"].length !== 0) {
            var arrOfIds = content["content"].map((c) => c.id);
            var id =
                arrOfIds.reduce(function (a, b) {
                    return Math.max(a, b);
                }, 0) + 1;
        } else {
            id = 0;
        }
        // this will update content
        const becontent = copyOf(content);
        // console.log(becontent["content"], "fdf");
        becontent["content"].unshift({
            // unshift || push [to start, to end ]
            id: id,
            notes: [],
            title: titleName,
        });
        setContent(becontent);
        return;
    };
    const AddNewNoteHandler = (contentValue, cardId) => {
        let becontent = content;
        if (becontent["content"][cardId]["notes"].length !== 0) {
            var arrOfIds = becontent["content"][cardId]["notes"].map(
                (c) => c.id
            );
            var id =
                arrOfIds.reduce(function (a, b) {
                    return Math.max(a, b);
                }, 0) + 1;
        } else {
            id = 0;
        }
        becontent["content"][cardId]["notes"].push({
            content: contentValue,
            id: id,
            mark: false,
        });
        // this will update content
        setContent(becontent);
    };
    const deleteNote = (cardId, NoteId) => {
        const becontent = copyOf(content);
        for (let i = 0; i < becontent["content"][cardId]["notes"].length; i++) {
            if (becontent["content"][cardId]["notes"][i]["id"] === NoteId) {
                becontent["content"][cardId]["notes"].splice(i, 1);
                i--;
            }
        }

        setContent(becontent);
    };
    const deleteCard = async (cardId) => {
        const becontent = copyOf(content);
        for (let cardID = 0; cardID < becontent["content"].length; cardID++) {
            if (becontent["content"][cardID]["id"] === cardId) {
                becontent["content"].splice(cardID, 1);
                cardID--;
            }
        }
        // console.log(content, becontent);
        setContent(becontent);
    };
    const markNote = (cardId, noteId) => {
        const becontent = copyOf(content);
        for (let cardID = 0; cardID < becontent["content"].length; cardID++) {
            if (becontent["content"][cardID]["id"] === cardId) {
                for (
                    let noteID = 0;
                    noteID < becontent["content"][cardID]["notes"].length;
                    noteID++
                ) {
                    if (
                        becontent["content"][cardID]["notes"][noteID]["id"] ===
                        noteId
                    ) {
                        becontent["content"][cardID]["notes"][noteID]["mark"] =
                            !becontent["content"][cardID]["notes"][noteID][
                                "mark"
                            ];
                    }
                }
            }
        }
        // becontent["content"][cardId]["notes"][noteId]["mark"] =
        //   !becontent["content"][cardId]["notes"][noteId]["mark"];
        // console.log(content, becontent);

        setContent(becontent);
    };

    const [loginFormMode, setLoginFormMode] = useState("Log In");

    const toogleSignupForm = () => {
      changeLoginModeTop("Sign Up");
        setLoginFormMode("Sign Up");
        toogleOverlay();
        if (document.getElementById("menu-window-toogleOverlay").checked) {
            // console.log(document.getElementsByClassName("menu-window-center")[0].style)
            document.getElementsByClassName(
                "menu-window-center"
            )[0].style.transform = "translate(-50%, -50%) scale(0)";
            document.getElementById("overlay").style.transform = "scale(0)";
        } else {
            document.getElementsByClassName(
                "menu-window-center"
            )[0].style.transform = "translate(-50%, -50%) scale(1)";
            document.getElementById("overlay").style.transform = "scale(1)";
        }
    };

    const toogleOverlay = () => {
        document.getElementById("menu-window-toogleOverlay").checked =
            !document.getElementById("menu-window-toogleOverlay").checked;
    };
    const toogleLoginForm = () => {
      changeLoginModeTop("Log In");
        setLoginFormMode("Log In");
        toogleOverlay();
        if (document.getElementById("menu-window-toogleOverlay").checked) {
            // console.log(document.getElementsByClassName("menu-window-center")[0].style)
            document.getElementsByClassName(
                "menu-window-center"
            )[0].style.transform = "translate(-50%, -50%) scale(0)";
            document.getElementById("overlay").style.transform = "scale(0)";
        } else {
            document.getElementsByClassName(
                "menu-window-center"
            )[0].style.transform = "translate(-50%, -50%) scale(1)";
            document.getElementById("overlay").style.transform = "scale(1)";
        }
    };
    const changeLoginModeTop = (text) => {
        document.querySelectorAll(".logMode-list").forEach((item) => {
            item.classList.remove("active");
            if ((item.textContent == text)) {
                item.classList.add("active");
            }
        });
    };

    // const card = useRef();

    useEffect(() => {
        const getData = async () => {
            console.log("FETCHING_FROM_SERVER");
            await fetchContent(function (data) {
                setAllData(data);
            });
            console.log("DATA_FETCHED_SUCCESFULLY");
        };
        getData();
    }, [username]);
    // useEffect(() => {
    //   const dooIt = async () => {
    //     if (Object.entries(allData).length !== 0) {
    //       setContent(allData[username]);
    //     }
    //   };
    //   dooIt();
    // }, [allData]);

    return (
        <div className="pageContainer">
            <Navigation
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                toogleOverlay={toogleOverlay}
                toogleLoginForm={toogleLoginForm}
                postContent={postContent}
                toogleSignupForm={toogleSignupForm}
                createNewUser={createNewUser}
            />
            <LoginForm
                toogleOverlay={toogleOverlay}
                toogleLoginForm={toogleLoginForm}
                handleLogIn={handleLogIn}
                handleSignUp={handleSignUp}
                toogleSignupForm={toogleSignupForm}
                loginFormMode={loginFormMode}
                setLoginFormMode={setLoginFormMode}
            />
            <main id="main" className="main">
                <div
                    id="content"
                    className="wrapper"
                    onScroll={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div id="overlay" onClick={toogleOverlay}></div>
                    <NewCardForm NewCardHandler={AddNewCardHandler} />
                    <Cards
                        // ref={card}
                        content={content}
                        setContent={setContent}
                        newNoteHandler={AddNewNoteHandler}
                        deleteNote={deleteNote}
                        deleteCard={deleteCard}
                        noteMarkerer={markNote}
                        beChanging={beChanging}
                        setBeChanging={setBeChanging}
                    />
                </div>
            </main>
            <div id="secondPage" className="main">
                <AboutMeApp />
            </div>
        </div>
    );
};

export default MainApp;
