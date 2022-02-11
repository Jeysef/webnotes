import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
// import my components
import Navigation from "./components/navigation";
import Cards from "./components/noteComponents/cards";
import AboutMeApp from "./components/aboutMeApp";
import NewCardForm from "./components/noteComponents/newCardForm";
// import styles
import "./index.css";

const MainApp = () => {
    // State Holder
    const [dUrl, setDUrl] = useState(
        "https://api.jsonstorage.net/v1/json/90192964-b43a-4291-8184-278f70f45ce8/ff047acd-2dc5-43f9-8dc4-3687717f0bdb?apiKey=5489b554-1a5e-4978-a915-b5fe3b8433af"
    );
    const [username, setUsername] = useState("load");
    const [password, setPassword] = useState("");
    const [allData, setAllData] = useState({});
    const [content, setContent] = useState({
        "content": [
            {
                "id": 0,
                "title": "loading...",
                "notes": [
                    {
                        "content": "loading...",
                        "id": 0,
                        "mark": false,
                    },
                ],
            },
        ],
    });

    // get data from server and set content

    useEffect(() => {
        const getTasks = async () => {
            console.log("FETCHING FROM SERVER");

            const contentFomServer = await fetchContent();

            // setAllData(contentFomServer);
            console.log("alldata", allData);
            if (allData[username]) {
                setContent(allData[username]);
            } else if (username != "load" && username) {
                alert(
                    "Wrong or unregistered username, please try log in again"
                );
                setContent({
                    content: [
                        {
                            id: 0,
                            title: "loading...",
                            notes: [
                                {
                                    content: "loading...",
                                    id: 0,
                                    mark: false,
                                },
                            ],
                        },
                    ],
                });
            }
            // setContent(contentFomServer);
            // console.log(content, 'new content');
        };

        getTasks();
    }, [username]);

    const fetchContent = async () => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", dUrl, true);
        xhr.responseType = "json";
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                const dataOut = xhr.response;
                console.log("dataUot", dataOut);
                setAllData(dataOut);
            } else {
                alert("Something went wrong: " + status);
            }
        };
        xhr.send();
    };

    const postContent = async () => {
        // var parameters = JSON.stringify({
        //     username: "myname",
        //     password: "mypass",
        // });

        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", dUrl, true);

        // // xhr.setRequestHeader("Accept", "application/json");
        // xhr.setRequestHeader("application/json", "charset=utf-8");

        // xhr.send(JSON.stringify(parameters));
        // xhr.onload = () => alert(xhr.response);

        fetchContent();
        const becontent = copyOf(allData);
        becontent[username] = content;

        console.log("dfsfdfd", becontent);

        var data = JSON.stringify(becontent);

        $.ajax({
            url: dUrl,
            type: "PUT",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                alert("succes");
                // load created json
                $.get(data.uri, function (data, textStatus, jqXHR) {
                    var json = JSON.stringify(data);
                    console.log(copyOf(json));
                });
            },
        });
    };

    /*

  * FUNCTIONS

  */
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
        for (var i = 0; i < becontent["content"][cardId]["notes"].length; i++) {
            if (becontent["content"][cardId]["notes"][i]["id"] === NoteId) {
                becontent["content"][cardId]["notes"].splice(i, 1);
                i--;
            }
        }

        setContent(becontent);
    };
    const deleteCard = async (cardId) => {
        // await fetch(`https://json.extendsclass.com/bin/138ae146c385`, {
        //   method: "DELETE",
        // });
        const becontent = copyOf(content);
        for (var i = 0; i < becontent["content"].length; i++) {
            if (becontent["content"][i]["id"] === cardId) {
                becontent["content"].splice(i, 1);
                i--;
            }
        }
        // console.log(content, becontent);
        setContent(becontent);
    };
    // mark Note
    const markNote = (cardId, noteId) => {
        const becontent = copyOf(content);
        becontent["content"][cardId]["notes"][noteId]["mark"] =
            !becontent["content"][cardId]["notes"][noteId]["mark"];
        // console.log(content, becontent);

        setContent(becontent);
    };

    const card = useRef();

    const toogleOverlay = () => {
        document.getElementById("menu-window-toogleOverlay").checked =
            !document.getElementById("menu-window-toogleOverlay").checked;
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

    return (
        <div className="pageContainer">
            <Navigation
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                toogleOverlay={toogleOverlay}
                postContent={postContent}
            />
            <main id="main" class="main">
                <div id="content" className="wrapper">
                    <div id="overlay" onClick={toogleOverlay}></div>
                    <NewCardForm NewCardHandler={AddNewCardHandler} />
                    <Cards
                        ref={card}
                        content={content}
                        newNoteHandler={AddNewNoteHandler}
                        deleteNote={deleteNote}
                        deleteCard={deleteCard}
                        noteMarkerer={markNote}
                        setContent={setContent}
                    />
                </div>
            </main>
            <div id="secondPage" class="main">
                <AboutMeApp />
            </div>
        </div>
    );
};

export default MainApp;
