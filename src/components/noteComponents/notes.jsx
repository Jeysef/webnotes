import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Notes = ({
  content,
  setContent,
  contentNotes,
  deleteNote,
  cardId,
  cardEd,
  noteMarkerer,
  beChanging,
  setBeChanging,
}) => {
  Notes.propTypes = {
    contentNotes: PropTypes.array,
    deleteNote: PropTypes.func,
    cardId: PropTypes.number,
    noteMarkerer: PropTypes.func,
    beChanging: PropTypes.bool,
    setBeChanging: PropTypes.func,
  };
  const [noteTitle, setNoteTitle] = useState({ value: "", id: -1 });
  const [savedSelection, setsavedSelection] = useState();
  // -----------

  // ------------

  const copyOf = (Data) => {
    return JSON.parse(JSON.stringify(Data));
  };
  // const onChangeHandler = (event) => {
  //   console.log(event.target);
  //   let targetValue = event.target.textContent;
  //   //save caret position(s), so can restore when component reloads
  //   let savedCaretPosition = doSave(event.target);
  //   setCaretPosition(
  //     {
  //       newValue: targetValue,
  //       caretPosition: savedCaretPosition,
  //     },
  //     () => {
  //       //restore caret position(s)
  //       doRestore(
  //         document.getElementsByClassName("NoteTextarea")[noteTitle.id],
  //         CaretPosition
  //       );
  //     }
  //   );
  // };
  useEffect(() => {
    if (noteTitle.id !== -1) {
      const becontent = copyOf(content);
      for (var j = 0; j < becontent["content"][cardId]["notes"].length; j++) {
        if (becontent["content"][cardId]["notes"][j]["id"] === noteTitle.id) {
          becontent["content"][cardId]["notes"][j]["content"] = noteTitle.value;
          break;
        }
      }

      setContent(becontent);
    }
  }, [noteTitle]);
  useEffect(() => {
    if (beChanging) {
      setNoteTitle({ value: "", id: -1 });
      setBeChanging(false);
    }
  }, [beChanging]);

  if (contentNotes) {
    return contentNotes.map((note) => (
      <li
        draggable="false"
        className={`Note p-3 flex-between bg_white ${
          note["mark"] ? " NoteMark" : ""
        }`}
        key={note.id}
        onDoubleClick={() => {
          noteMarkerer(cardId, note.id);
        }}
      >
        <div className="NoteDropMenu">
          <div className="NoteBlockMenuWrapper border-radius-1">
            <div className="NotePopupTitle flex-between">
              <input className="button" type="text" />
              <span className="button" title="Close Menu">
                &times;
              </span>
            </div>
            <div className="button">
              <span> color</span>
            </div>
          </div>
        </div>
        <div
          className="NoteTextarea"
          // contentEditable
          // suppressContentEditableWarning="true"
          spellCheck="false"
          onInput={(e) => {
            // onChangeHandler.bind(this);
            // onChangeHandler(e);
            // doSave("ff", note.id);
            // setNoteTitle({ value: e.target.textContent, id: note.id });


            console.log(e.target);
            // doRestore(e.target, note.id);
          }}
        >
          {noteTitle.id === note.id ? noteTitle.value : note.content}
        </div>
        <div className="flex-evenly">
          {/*  button for menu  */}

          <div className="LinksWrapper dropdownMenuWrapper MenuNoteId">
            <div className="dropdownMenu">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
          {/*   button for remove */}
          <button
            className="LinksWrapper"
            onClick={() => {
              deleteNote(cardEd, note.id);
            }}
          >
            <div className="deleteNote">
              <FaTimes />
            </div>
          </button>
        </div>
      </li>
    ));
  } else {
    return null;
  }
};
export default Notes;
