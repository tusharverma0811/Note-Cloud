import React from "react";
import { Alert } from "react-bootstrap";

const MyAlert = (props) => {
  if(!props.alert)
    return null;
 
  const capitalize = (word) => {
    if(word==="danger")
    {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <Alert variant={props.alert.type} dismissible>
        <Alert.Heading>{props.alert.type==="danger"?"Error":capitalize(props.alert.type)}</Alert.Heading>
        <p>
         <strong>{capitalize(props.alert.msg)}</strong>
        </p>
      </Alert>
  );
};

export default MyAlert;
