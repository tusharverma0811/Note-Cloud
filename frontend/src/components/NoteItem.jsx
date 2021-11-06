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

  const updateNote = async(note)=>{
    try{
      const response = await editNote(id,note.title,note.description);
      if(response.hasOwnProperty("error")){
        setEditModal(false);
        props.showAlert(response.error,"danger");
      }else if(response.hasOwnProperty("errors")){
        setEditModal(false);
        props.showAlert("Please Try Again","danger");
      }else{
        setEditModal(false);
        props.showAlert("Note Updated Successfully","success");
      }
    }catch(err){
      setEditModal(false);
      props.showAlert("Some Internal Error Occured","info");
    }
    
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
    <EditNoteModal show={editModal} onHide={closeEdit} titlei={title} descriptioni={description} update={updateNote} ></EditNoteModal>
    </>
  );
}

export default NoteItem;
