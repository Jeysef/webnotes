import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaArrowsAlt } from "react-icons/fa";
// import my components
import Notes from "./notes";
// import propTypes from "prop-types";
// import stylesheet
import "../stylesForComponents/dragNDrop.css";

const Cards = ({
  content,
  newNoteHandler,
  deleteNote,
  deleteCard,
  noteMarkerer,
  setContent,
  beChanging,
  setBeChanging,
}) => {
  //   Cards.propTypes = {
  //     content: propTypes.array,
  //     newNoteHandler: propTypes.func,
  //     deleteNote: propTypes.func,
  //     deleteCard: propTypes.func,
  //     noteMarkerer: propTypes.func,
  //     setContent: propTypes.func,
  //   };
  const [draggable, setDraggable] = useState(false);
  const [noteTitle, setnoteTitle] = useState({ value: "", id: 0 });

  const [cardTitle, setCardTitle] = useState({ value: "", id: -1 });

  // drag'n drop
  const [dragging, setDragging] = useState(false);

  const setDataDND = (content) => {
    setContent(content);
  };

  useEffect(() => {
    setDataDND(content);
  }, [setDataDND, content]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, itemIDND) => {
    e.dataTransfer.dropEffect = "move";
    // e.target.style.cursor = 'move';
    // console.log("Starting to drag", itemIDND);

    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = itemIDND;

    setTimeout(() => {
      setDragging(true);
      document.getElementsByClassName("blacker_when_mooving_card")[
        dragItem.current
      ].style.transform = "scale(1)";
    }, 0);
  };
  const copyOf = (Data) => {
    return JSON.parse(JSON.stringify(Data));
  };
  const handleDragEnter = (e, itemIdDND) => {
    // console.log("Entering a drag target", itemIdDND);
    if (dragItemNode.current !== e.target) {
      // console.log("Target is NOT the same as dragged item");
      setDataDND((oldData) => {
        let newdataDND = copyOf(oldData);
        newdataDND["content"].splice(
          itemIdDND,
          0,
          newdataDND["content"].splice(dragItem.current, 1)[0]
        );
        dragItem.current = itemIdDND;
        localStorage.setItem("List", JSON.stringify(newdataDND));
        return newdataDND;
      });
    }
  };
  const handleDragEnd = (e) => {
    setDragging(false);
    // console.log(
    //   dragItem.current,
    //   document.getElementsByClassName("blacker_when_mooving_card")[
    //     dragItem.current
    //   ]
    // );
    document.getElementsByClassName("blacker_when_mooving_card")[
      dragItem.current
    ].style.transform = "scale(0)";
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);

    dragItemNode.current = null;
  };
  const getStyles = (itemIdDND, cardId) => {
    if (
      //   dragItem.current.grpI === item.grpI &&
      dragItem.current === itemIdDND
    ) {
      document.getElementsByClassName("blacker_when_mooving_card")[
        dragItem.current
      ].style.transform = "scale(1)";
    } else {
      document.getElementsByClassName("blacker_when_mooving_card")[
        dragItem.current
      ].style.transform = "scale(0)";
    }
    return "Card";
  };

  const handleAddNewNote = (e, cardId) => {
    e.preventDefault();
    if (!noteTitle.value) {
      alert("Please add a text");
      return;
    }
    newNoteHandler(noteTitle.value, cardId);
    setnoteTitle("");
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const handleDeleteCard = async (cardId, carded) => {
    document.getElementsByClassName("Card")[carded].style.transform =
      "scale(0.5)";
    document.getElementsByClassName("Card")[carded].style.opacity = "0";
    await delay(250);
    deleteCard(cardId);
  };
  useEffect(() => {
    if (cardTitle.id !== -1) {
      const becontent = copyOf(content);
      for (var i = 0; i < becontent["content"].length; i++) {
        if (becontent["content"][i]["id"] === cardTitle.id) {
          becontent["content"][i]["title"] = cardTitle.value;
          break;
        }
      }

      setContent(becontent);
    }
  }, [cardTitle]);
  useEffect(() => {
    if (beChanging) {
      setCardTitle({ value: "", id: -1 });
      setBeChanging(false);
    }
  }, [beChanging]);
  // |
  // |
  // RETURN JSX -------------------------
  if (content["content"]) {
    return content["content"].map((card, carded) => (
      <section
        className="Card ms-depth-8 "
        key={card.id}
        draggable={draggable}
        onDragStart={(e) => handletDragStart(e, carded)}
        onDragEnter={
          dragging
            ? (e) => {
                handleDragEnter(e, carded);
              }
            : null
        }
        // className={dragging ? getStyles(carded, card.id) : "Card"}
      >
        <div className="blacker_when_mooving_card"></div>
        <header className="flex-between">
          <input
            className="CardTitle"
            placeholder={"card " + card.id}
            style={{
              background: "transparent",
            }}
            spellCheck="false"
            value={cardTitle.id === card.id ? cardTitle.value : card.title}
            onChange={(e) => {
              setCardTitle({ value: e.target.value, id: card.id });
            }}
          />

          <div className="flex-evenly">
            {/*  button for menu  */}

            <div
              className="LinksWrapper"
              style={{ cursor: "all-scroll" }}
              onMouseDown={(e) => {
                setDraggable(true);
                handletDragStart(e, carded);
              }}
              onMouseLeave={(e) => {
                setDraggable(false);
              }}
            >
              <button className="mooveAroundWrapper ">
                <FaArrowsAlt />
              </button>
            </div>
            <div className="LinksWrapper ">
              <button
                className="deleteCard"
                onClick={() => {
                  handleDeleteCard(card.id, carded);
                }}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* <div className="LinksWrapper">
                        <button
                            className="deleteCard"
                            onClick={() => {
                                handleDeleteCard(card.id, carded);
                            }}
                        >
                            <FaTimes />
                        </button>
                    </div> */}
        </header>
        <ul>
          <Notes
            content={content}
            setContent={setContent}
            contentNotes={card["notes"]}
            deleteNote={deleteNote}
            cardId={card.id}
            cardEd={carded}
            noteMarkerer={noteMarkerer}
            beChanging={beChanging}
            setBeChanging={setBeChanging}
          />
        </ul>
        <footer draggable="false">
          <form onSubmit={(e) => handleAddNewNote(e, carded)}>
            <textarea
              value={noteTitle.id === card.id ? noteTitle.value : ""}
              onChange={(e) => {
                // console.log("tar", e.target);
                setnoteTitle({
                  value: e.target.value,
                  id: card.id,
                });
              }}
              spellCheck="false"
              className="textarea addCardTextarea"
              rows="2"
            ></textarea>
            <input type="submit" value="Add card" className="addNoteBtn" />
          </form>
        </footer>
      </section>
    ));
    // </div>
  } else {
    return null;
  }
};
export default Cards;
