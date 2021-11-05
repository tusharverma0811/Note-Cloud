import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import NoteContext from '../contexts/NoteContext';
import NoteItem from "./NoteItem";
import { Container,Row,Col } from 'react-bootstrap';

export default function Notes(props) {
    const {notes,getNotes} = useContext(NoteContext);
    let history = useHistory();
    useEffect(()=>{
        if(localStorage.getItem("token"))
            getNotes();
        else{
            history.push("/login");
        }
    },[getNotes,notes,history])

    return (
        <div>
            <Container fluid>
                <Row>
                {notes.map((note)=>{
                    return(<Col xs={12} sm={8} md={4} lg={3} xl={2} > <NoteItem key={note._id} id={note._id} title={note.title} description={note.description} showAlert={props.showAlert}/></Col>)
                })}
                </Row>
            </Container>
        </div>
    )
}
