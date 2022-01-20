import PropTypes from "prop-types";
import React from "react";
import { FaTimes } from "react-icons/fa";

const Notes = ({ contentNotes, deleteNote, cardId, noteMarkerer }) => {
  Notes.PropTypes = {
    contentNotes: PropTypes.array,
    deleteNote: PropTypes.func,
    cardId: PropTypes.number,
    noteMarkerer: PropTypes.func,
  };
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
        <p className="NoteTextarea" contentEditable="true" spellCheck="false">
          {note.content}
        </p>
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
              deleteNote(cardId, note.id);
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
