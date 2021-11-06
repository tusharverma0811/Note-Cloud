import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import NoteState from "./contexts/NoteState";
import AuthState from "./contexts/AuthState";

ReactDOM.render(
  <>
    <NoteState>
      <AuthState>
        <App />
      </AuthState>
    </NoteState>
  </>,
  document.getElementById("root")
);
