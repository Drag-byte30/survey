import React from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


const Headlines = ({ title }) => {
  return (
    <h2 style={{ width:"300px", border: "2px solid black", padding:"10px",display:"flex", justifyContent:"space-between",columnGap:"10px" }}>{title}  <FontAwesomeIcon icon={faCaretDown} /></h2>
  );
};

export default Headlines;