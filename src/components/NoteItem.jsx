import React, { useContext, useState } from "react";
import NoteContext from "../contexts/NoteContext";
import EditNoteModal from "./EditNoteModal";
import "../Stylesheets/NoteStyles.css";

function NoteItem(props) {

  
  const {deleteNote,editNote} = useContext(NoteContext);

  const[editModal,setEditModal] = useState(false);

  const openEdit = ()=>{
    setEditModal(true);
  }

  const closeEdit = ()=>{
    setEditModal(false);
  }

  const updateNote = (note)=>{
    editNote(id,note.title,note.description)
    setEditModal(false);
    props.showAlert("Note Updated Successfully","success");
  }
  const {title,description,id} = props;

  return (
    <>
    <div className="note">
      <h1>{title}</h1>
      <hr/>
      <p>{description}</p>
      <button onClick={()=>{
          deleteNote(props.id)
          props.showAlert("Note Deleted Successfully","success");
      }}><i className="fas fa-trash"></i></button>
      <button onClick={openEdit}><i className="far fa-edit"></i></button>
    </div>
    <EditNoteModal show={editModal} onHide={closeEdit} titleI={title} descriptionI={description} update={updateNote} ></EditNoteModal>
    </>
  );
}

export default NoteItem;
