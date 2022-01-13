// import React, { Component } from "react";
// import Cards from "./cards";
// import Notes from "./notes";
// import AddNewCardHandler from "../App";
import { useState } from "react";

function NewCardForm({ NewCardHandler }) {
  // on change set text to NewCardText
  // var NewCardText = ""
  const [NewCardText, setNewCardText] = useState("");

  var NewCardHandleFunc = (event) => {
    var textValue = event.target.value;
    NewCardHandler(textValue);
    setNewCardText("");

    // setValue(event.target.AddNewCardText);
  };

  return (
    <form className="addNewCard">
      <input
        spellCheck="false"
        className="addNewCardInput"
        type="text"
        placeholder="Add another Card"
        value={NewCardText}
        // onClick={(e) => e.preventDefault}

        onKeyPress={(event) => {
          if (event.key === "Enter") {
            if (NewCardText !== "") {
            }
            event.preventDefault();
            NewCardHandleFunc(event);
          }
        }}
        onChange={(e) => {
          setNewCardText(e.target.value);
        }}
        autoFocus
      />
    </form>
  );
}

export default NewCardForm;
