import React, { useState } from "react";
import NoteContext from "./NoteContext";

const host = "http://localhost:5000";
const NoteState = (props) => {
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  //Get all notes
  const getNotes = async () => {
    try {
      const respone = await fetch(`${host}/api/notes/getnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
      });

      const data = await respone.json();
      if (!data.hasOwnProperty("error")) {
        setNotes(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Add a note
  const addNote = async (title, description) => {
    //Adding note in backend(DB)
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      return data;

    } catch (err) {
      const res = {error:err};
      return res;  
    }

   
  };

  //Delete a note
  const deleteNote = async (id) => {
    //Delete from DB
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Edit a Note
  const editNote = async (id, title, description) => {
    //Updating Note in the backend
    try {
     const response =  await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <NoteContext.Provider
        value={{ notes, addNote, deleteNote, editNote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
//UI change Codes written previously

//Adding Note to UI
// const data = await respone.json();

//Code to add note on client side
//   if (!data.hasOwnProperty("errors")) {
//     const newNote = {
//       _id: data._id,
//       title: title,
//       description: description,
//     };

//     setNotes(notes.concat(newNote));
//   }

//Deleting Note from UI

// const data = await response.json();
// Code to delete note on client side

// if (!data.hasOwnProperty("error")) {
//   const newNotes = notes.filter((note) => {
//     return note._id !== id;
//   });

// setNotes(newNotes);
// }

//

//Updating a edited Note in UI
//Code to update note on client side.
// for (let index = 0; index < notes.length; index++) {
//   const element = notes[index];

//   if (element._id === id) {
//     element.title = title;
//     element.description = description;
//     break;
//   }
// }
