import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import jQuery from "jquery";
// import mousewheel from "./components/mousewheel";

// import my components
import Navigation from "./components/navigation";
import Cards from "./components/noteComponents/cards";
import AboutMeApp from "./components/aboutMeApp";
import NewCardForm from "./components/noteComponents/newCardForm";
// import styles
import "./index.css";

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

  /*
  
  * FUNCTIONS
  
  */

  useEffect(() => {
    const getTasks = async () => {
      console.log("FETCHING_FROM_SERVER");
      await fetchContent(function (data) {
        setAllData(data);
      });
      if (allData[username]) {
        //   no error
        setContent(allData[username]);
      } else if (username) {
        //   all errors
        if (allData.keys() >= 1) {
          console.log("corrupted data", allData);
          alert("We are sorry, but our database is corrupted");
        } else if (
          !UrlExists(jsonDataUrl, function (status) {
            if (status === 200) {
              // Execute code if successful
              return true;
            } else if (status === 404) {
              // Execute code if not successful
              return false;
            } else {
              // Execute code if status doesn't match above
              return false;
            }
          })
        ) {
          alert("Sorry our database do not exist");
        } else {
          alert("Wrong or unregistered username, please try log in again");
        }
        // set to default
        setContent(loadingJson);
      }
      // setContent(contentFomServer);
      // console.log(content, 'new content');
    };

    getTasks();
  }, [username]);

  const fetchContent = async (callback) => {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", jsonDataUrl, true);
    xhr.responseType = "json";

    xhr.onload = function () {
      var status = xhr.status;
      if (status === 200) {
        const dataOut = xhr.response;
        const data = copyOf(dataOut);
        // console.log("dataUot", data);
        // setAllData(dataOut);
        callback(data);
      } else {
        alert("Sorry, can not fetch data from server. Error:  " + status);
      }
    };
    xhr.send();
  };
  const postContent = async () => {
    //   must done this with jquery because i cannot done it with xhr
    // fetch content to get actual data
    fetchContent();
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
          console.log(copyOf(data));
        });
      },
      error: function (event, jqxhr, settings) {
        if (settings.url.indexOf("nonexistentfile.htm") != -1) {
          alert("something went wrong");
        } else if (settings.url.indexOf("nonexistentjsonfile.htm") != -1) {
          alert("something went wrong");
        }
      },
    });
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
      var arrOfIds = becontent["content"][cardId]["notes"].map((c) => c.id);
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
  const markNote = (cardId, noteId) => {
    const becontent = copyOf(content);
    for (var i = 0; i < becontent["content"].length; i++) {
      if (becontent["content"][i]["id"] === cardId) {
        for (var j = 0; j < becontent["content"][i]["notes"].length; j++) {
          if (becontent["content"][i]["notes"][j]["id"] === noteId) {
            becontent["content"][i]["notes"][j]["mark"] =
              !becontent["content"][i]["notes"][j]["mark"];
          }
        }
      }
    }
    // becontent["content"][cardId]["notes"][noteId]["mark"] =
    //   !becontent["content"][cardId]["notes"][noteId]["mark"];
    // console.log(content, becontent);

    setContent(becontent);
  };

  const signUp = () => {
    if (document.getElementById("menu-window-toogleOverlay").checked) {
        // console.log(document.getElementsByClassName("menu-window-center")[0].style)
        document.getElementsByClassName("menu-window-center")[0].style.transform =
          "translate(-50%, -50%) scale(0)";
        document.getElementById("overlay").style.transform = "scale(0)";
      } else {
        document.getElementsByClassName("menu-window-center")[0].style.transform =
          "translate(-50%, -50%) scale(1)";
        document.getElementById("overlay").style.transform = "scale(1)";
      }}      
        
  

  const toogleOverlay = () => {
    document.getElementById("menu-window-toogleOverlay").checked =
      !document.getElementById("menu-window-toogleOverlay").checked;
    };
const toogleLoginForm = () => {
    if (document.getElementById("menu-window-toogleOverlay").checked) {
    // console.log(document.getElementsByClassName("menu-window-center")[0].style)
    document.getElementsByClassName("menu-window-center")[0].style.transform =
      "translate(-50%, -50%) scale(0)";
    document.getElementById("overlay").style.transform = "scale(0)";
  } else {
    document.getElementsByClassName("menu-window-center")[0].style.transform =
      "translate(-50%, -50%) scale(1)";
    document.getElementById("overlay").style.transform = "scale(1)";
  }}      
    

  const card = useRef();

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
        signUp={signUp}
      />
      <main id="main" class="main">
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
