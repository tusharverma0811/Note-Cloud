import React from 'react'
import CreateArea from './createArea'
import Header from './Header'
import Notes from './Notes'

const Home = (props) => {
    return (
        <>
          <Header></Header>
          <CreateArea alert={props.alert} showAlert={props.showAlert}/>
          <Notes alert={props.alert} showAlert={props.showAlert}/>  
        </>
    )
}

export default Home;
