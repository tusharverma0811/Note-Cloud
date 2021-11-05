import React from "react";
import { Button } from "react-bootstrap";
import "../Stylesheets/EditNote.css";

function EditNoteModal(props) {
  const { titlei, descriptioni } = props;
  const [newNote, setNewNote] = React.useState({
    title: titlei,
    description: descriptioni,
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setNewNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  return <>
  {props.show &&
    <div className="overlay">
      <div className="reg">
      
      <form className="edit-note">
      <h4 className="editTitle">Edit Note</h4>
        <input
          name="title"
          placeholder="Title"
          value={newNote.title}
          onChange={handleChange}
          className="titleInput"
          autoComplete="off"
          autofocus
        />
        <textarea
          name="description"
          value={newNote.description}
          onChange={handleChange}
        />
        <Button variant="secondary" className="cancelEdit" size="lg" onClick={()=>{
          props.onHide();
        }}>Cancel</Button>
        <Button variant="warning" className="editBtn" size="lg" onClick={()=>{
          props.update(newNote)
        }}>Update Note</Button>
        </form>
      </div>
    </div>}
  </>;
}

export default EditNoteModal;


  /* <Modal
     {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Edit Note</Modal.Title>
        <CloseIcon onClick={props.onHide} id="close" />
      </Modal.Header>

      <Modal.Body>
        <form className="create-note">
          <input
            name="title"
            placeholder="Title"
            value={newNote.title}
            onChange={handleChange}
            className="titleInput"
          />
          <textarea
            name="description"
            placeholder="Take a note..."
            rows={3}
            value={newNote.description}
            onChange={handleChange}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{
          props.update(newNote);
        }}>Update Note</Button>
      </Modal.Footer>
    </Modal> */

