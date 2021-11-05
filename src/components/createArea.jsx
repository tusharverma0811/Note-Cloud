import React, { useContext } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import NoteContext from "../contexts/NoteContext";


function CreateArea(props) {
    const[newNote,setNewNote] = React.useState({
        title:"",
        description:""
    });
    
    const {addNote} = useContext(NoteContext);
    const[isExpanded,setExpansion]= React.useState(false);

    function handleChange(event){
        const{name,value} = event.target;

        setNewNote((prevNote)=>{
            return({
                ...prevNote,
                [name]: value
            });
        })
    }

    function expand(){
      setExpansion(true);
    }

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input
          name="title"
          placeholder="Title"
          value={newNote.title}
          onChange={handleChange}
          className="titleInput"
          autoComplete="off"
        />}
        <textarea
          name="description"
          onClick={expand}
          placeholder="Take a note..."
          rows={isExpanded?3:1}
          value={newNote.description}
          onChange={handleChange}
        />
        <Zoom in={isExpanded?true:false}>
        <Fab
          onClick={(event) => {
            addNote(newNote.title,newNote.description)
            setNewNote({
                title:"",
                description:""
            });
            setExpansion(false);
            props.showAlert("Note Added Successfully","success");
            event.preventDefault();
          }}
        >
          <AddIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
