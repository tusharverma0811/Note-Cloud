import React from "react";
import { Modal, Button } from "react-bootstrap";
import CloseIcon from "@material-ui/icons/Close";
import "../Stylesheets/EditNote.css";
import "../Stylesheets/CreateArea.css";

function EditNoteModal(props) {
  const { titleI, descriptionI } = props;
  const [newNote, setNewNote] = React.useState({
    title: titleI,
    description: descriptionI,
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

  return (
    <Modal
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
            props.update(newNote)
        }}>Update Note</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditNoteModal;
