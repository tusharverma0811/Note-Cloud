import React, { useContext,useEffect } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import NoteContext from "../contexts/NoteContext";
import "../Stylesheets/CreateArea.css";


function CreateArea(props) {
    const[newNote,setNewNote] = React.useState({
        title:"",
        description:""
    });
    
    const {addNote} = useContext(NoteContext);
    const[isExpanded,setExpansion]= React.useState(false);
    const ref = React.useRef(null);
    function handleChange(event){
        const{name,value} = event.target;

        setNewNote((prevNote)=>{
            return({
                ...prevNote,
                [name]: value
            });
        })
    }

    
    useEffect(() => {
      function clickedOutside(event){
        if(ref.current && !ref.current.contains(event.target)){
          setExpansion(false);
        }
      }
      document.addEventListener('click', clickedOutside, true);
      return () => {
          document.removeEventListener('click', clickedOutside, true);
      };
  });

    function expand(){
      setExpansion(true);
    }

  return (
    <div>
      <form ref={ref} className="create-note">
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
          type="submit"
          onClick={(event) => {
            event.preventDefault();
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
