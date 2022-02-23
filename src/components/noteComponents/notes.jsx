import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
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
  const [NoteTitleClickedId, setNoteTitleClickedId] = useState(-1);
  const [restoreCaretPosition, setRestoreCaretPosition] = useState({
    selection: undefined,
    context: undefined,
    range: undefined,
    len: undefined,
    arg: 0,
  });

  const copyOf = (Data) => {
    return JSON.parse(JSON.stringify(Data));
  };

  function saveCaretPosition(context) {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    range.setStart(context, 0);
    var len = range.toString().length;

    return {
      selection: selection,
      context: context,
      range: range,
      len: len,
    };
  }
  function getTextNodeAtPosition(root, index) {
    // console.log("root", root);
    const NODE_TYPE = NodeFilter.SHOW_TEXT;
    var treeWalker = document.createTreeWalker(
      root,
      NODE_TYPE,
      function next(elem) {
        if (index > elem.textContent.length) {
          index -= elem.textContent.length;
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    );
    var c = treeWalker.nextNode();
    return {
      node: c ? c : root,
      position: index,
    };
  }

  const restoreCaret = () => {
    let selection = restoreCaretPosition.selection;
    let context = restoreCaretPosition.context;
    // let range = restoreCaretPosition.range;
    let len = restoreCaretPosition.len;
    let arg = restoreCaretPosition.arg;
    // arg is number which move cursor to the right
    // console.log("context", context);
    if (arg) {
      var pos = getTextNodeAtPosition(context, len + arg);
    } else {
      var pos = getTextNodeAtPosition(context, len);
    }
    selection.removeAllRanges();
    var range = new Range();
    range.setStart(pos.node, pos.position);
    selection.addRange(range);
  };

  useEffect(() => {
    if (restoreCaretPosition.context) {
      restoreCaret();
      // console.log("restoring caret");
    }
  }, [restoreCaretPosition]);
  const setRestoreCaretPositionFunction = (restoreCaretinfo) => {
    // console.log("notrestored ", restoreCaretPosition);
    // console.log("restoring setRestoreCaretPosition");
    // console.log("context", restoreCaretPosition.context);
    setRestoreCaretPosition(restoreCaretinfo);
    // console.log("restored ", restoreCaretPosition);
  };

  const changeNoteTextValue = (text, noteid) => {
    // console.log("notetext", text);
    setNoteTitle({ value: text, id: noteid });
    setNoteTitleClickedId(noteid);
    // console.log("items", cardId, noteid, text);
    const becontent = copyOf(content);

    for (var cardID = 0; cardID < becontent["content"].length; cardID++) {
      if (becontent["content"][cardID]["id"] === cardId) {
        for (
          var noteID = 0;
          noteID < becontent["content"][cardID]["notes"].length;
          noteID++
        ) {
          if (becontent["content"][cardID]["notes"][noteID]["id"] === noteid) {
            becontent["content"][cardID]["notes"][noteID]["content"] = text;
            break;
          }
        }
      }
    }

    setContent(becontent);
    // console.log("content seted", becontent);
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
        <div
          className="NoteTextarea"
          spellCheck="false"
          contentEditable={true}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{
            __html:
              NoteTitleClickedId === note.id ? noteTitle.value : note.content,
          }}
          data-cardid={cardId}
          data-noteid={note.id}
          value={
            NoteTitleClickedId === note.id ? noteTitle.value : note.content
          }
          onInput={(e) => {
            var restoreCaretinfo = saveCaretPosition(e.target);
            // Prism.highlightElement(this);
            setRestoreCaretPositionFunction(restoreCaretinfo);
            if (e.key === "Enter" || e.keyCode === 13) {
              setRestoreCaretPositionFunction({ ...restoreCaretinfo, arg: 1 });
            }
            changeNoteTextValue(e.target.textContent.toString(), note.id);
            // setRestoreCaretPosition({...restoreCaretinfo, arg: 0});
          }}
        >
          {/* {NoteTitleClickedId === note.id ? noteTitle.value : note.content} */}
          {/* {note.content} */}
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
