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
    const [moveTextCaretPosition, setMoveTextCaretPosition] = useState(false);

    const copyOf = (Data) => {
        return JSON.parse(JSON.stringify(Data));
    };

    function saveCaretPosition(context) {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        range.setStart(context, 0);
        var len = range.toString().length;
        // console.log(len, range.toString(), range, selection, context);

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
        // let arg = restoreCaretPosition.arg;
        // arg is number which move cursor to the right
        // console.log("context", context);
        // console.log(moveTextCaretPosition);
        // if (context.textContent.length == len && moveTextCaretPosition) {
        //   // console.log("aded 1 enter more");
        //   context.appendChild(document.createElement("br"));
        // }

        // if (arg) {
        //   var pos = getTextNodeAtPosition(context, len);
        // } else {
        var pos = getTextNodeAtPosition(context, len);
        // }
        let arg = 1;
        console.log(pos);
        selection.removeAllRanges();
        var range = new Range();
        if (context.textContent.length >= pos.length + arg) {
            range.setStart(pos.node, pos.position + arg);
        } else {
            range.setStart(pos.node, pos.position);
        }
        console.log(range);
        selection.addRange(range);
    };

    useEffect(() => {
        if (restoreCaretPosition.context) {
            restoreCaret();
            setMoveTextCaretPosition(false);
            // console.log("restoring caret");
        }
    }, [restoreCaretPosition]);
    const setRestoreCaretPositionFunction = (restoreCaretinfo) => {
        // console.log("notrestored ", restoreCaretPosition);
        // console.log("restoring setRestoreCaretPosition");
        // console.log("context", restoreCaretPosition.context);
        setRestoreCaretPosition(restoreCaretinfo);

        setRestoreCaretPosition((old) => {
            return {
                selection: old.selection,
                context: old.context,
                range: old.range,
                len: old.len,
                arg: 0,
            };
        });

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
                    if (
                        becontent["content"][cardID]["notes"][noteID]["id"] ===
                        noteid
                    ) {
                        becontent["content"][cardID]["notes"][noteID][
                            "content"
                        ] = text;
                        break;
                    }
                }
            }
        }

        setContent(becontent);
        // console.log("content seted", becontent);
    };
    const onInputToNote = (event, noteId) => {
        var restoreCaretinfo = saveCaretPosition(event.target);
        //   // Prism.highlightElement(this);
        //   setRestoreCaretPositionFunction(restoreCaretinfo);
        // console.log(event.key);
        if (moveTextCaretPosition) {
            // console.log("enter key pressed");
            setRestoreCaretPositionFunction({ ...restoreCaretinfo, arg: 1 });
        } else {
            setRestoreCaretPositionFunction({ ...restoreCaretinfo, arg: 0 });
        }

        // console.log(event.target.innerHTML);
        changeNoteTextValue(event.target.innerHTML, noteId);
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
                            NoteTitleClickedId === note.id
                                ? noteTitle.value
                                : note.content,
                    }}
                    data-cardid={cardId}
                    data-noteid={note.id}
                    // value={
                    //   NoteTitleClickedId === note.id ? noteTitle.value : note.content
                    // }
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.keyCode === 13) {
                            // console.log("enter key pressed");
                            // WARNING -- execCommand is depricated
                            document.execCommand(
                                "insertHTML",
                                false,
                                "<br />\u00A0"
                            );

                            // var range = window.getSelection().getRangeAt(0);
                            // console.log("running insertHTML");
                            // range.insertNode(document.createElement("br"));
                            // range.insertNode(document.createTextNode("\u00A0"));

                            // e.target.appendChild(document.createElement("br"));
                            // e.target.appendChild(document.createTextNode("\u00A0"));
                            // onInputToNote(e, note.id, range);
                            setMoveTextCaretPosition(true);
                            // onInputToNote(e, note.id);
                            e.preventDefault();
                        }

                        // if (e.key === "Enter" || e.keyCode === 13) {
                        //   // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
                        //   document.execCommand("insertHTML", false, "<br/>");
                        //   // const selectedTextRange = userSelection.getRangeAt(0);
                        //   // selectedTextRange.surroundContents(strongElement);

                        //   changeNoteTextValue(e.target.innerHTML, note.id);
                        //   // prevent the default behaviour of return key pressed
                        //   e.preventDefault();
                        //   // return false;
                        // }
                    }}
                    onInput={(e) => {
                        onInputToNote(e, note.id);
                        // var restoreCaretinfo = saveCaretPosition(e.target);
                        // //   // Prism.highlightElement(this);
                        // //   setRestoreCaretPositionFunction(restoreCaretinfo);
                        // console.log(e.key);
                        // if (moveTextCaretPosition) {
                        //   console.log("enter key pressed");
                        //   setRestoreCaretPositionFunction({ ...restoreCaretinfo, arg: 0 });
                        // } else {
                        //   setRestoreCaretPosition({ ...restoreCaretinfo, arg: 0 });
                        // }
                        // console.log(e.target.innerHTML);
                        // changeNoteTextValue(e.target.innerHTML, note.id);
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
