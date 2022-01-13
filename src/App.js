import React, { useState, useEffect, useRef } from "react";
// import my components
import Navigation from "./components/navigation";
import Cards from "./components/noteComponents/cards";
import AboutMeApp from "./components/aboutMeApp";
import NewCardForm from "./components/noteComponents/newCardForm";
// import styles
import "./index.css";

const MainApp = () => {
  // State Holder

  const [content, setContent] = useState({
    content: [
      {
        id: 0,
        notes: [
          { content: "and this is note", id: 0, mark: false },
          { content: "and this is note2", id: 1, mark: false },
        ],
        title: "card1",
      },
      {
        id: 1,
        notes: [
          { content: "and this is note", id: 0, mark: false },
          { content: "and this is note2", id: 1, mark: false },
        ],
        title: "card2",
      },
      {
        id: 2,
        notes: [
          { content: "and this is note", id: 0, mark: false },
          { content: "and this is note2", id: 1, mark: false },
        ],
        title: "card3",
      },
    ],
  });
  // {"content": [{"id": 0, "notes": [{"content": "and this is note", "id": 0, "mark": false}], "title": "HI this is card"}]}

  // [
  // "user1":{
  //   "id":0,
  //   "password":{"hash": hash("password"), "salt": this.id},

  //   "content":
  //   {"title": "card1", "id": 0, "notes": [
  //   {"title": "note1", "id": 0, "mark": false}
  //   ]}
  //   ], "colors":{"background": "linear-gradient(var(--bgorange), var(--bggray)", "colorScheme": "light"}
  //   },
  //   "user2":{
  //   "id":1,
  //   "password":{"hash": hash("password"), "salt": this.id},

  //   "content":
  //   {"title": "card1", "id": 0, "notes": [
  //   {"title": "note1", "id": 0, "mark": false}
  //   ]}
  //   ], "colors":{"background": "linear-gradient(var(--bgorange), var(--bggray)", "colorScheme": "dark"}
  //   }
  //   ]

  // get data from server and set content
  // useEffect(() => {
  //   const getTasks = async () => {
  //     const contentFomServer = await fetchContent();
  //     setContent(contentFomServer);
  //     console.log(content);
  //   };
  //   getTasks();
  // }, []);

  // const fetchContent = async () => {
  //   const response = await fetch(
  //     "https://json.extendsclass.com/bin/138ae146c385"
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   const bedata = data["content"];
  //   console.log(data);
  //   return bedata;
  // };

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

  return (
    <div className="pageContainer">
      <Navigation />
      <main id="main" class="main">
        <div id="content" className="wrapper">
          <div id="overlay" onClick={(e) => {e.target.style.display = "none"; console.log(e.target)}}>
          </div>
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
