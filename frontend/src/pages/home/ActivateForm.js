import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";
import './style.css';
 
const ActivateForm = ({type , header ,text ,loading}) => {
  return (
    <div className="blur">
    <div className="popup">
      <div
        className={`popup_header ${
          type === "success" ? "success_text" : "error_text"
        }`}
      >
        {header}
      </div>
      <div className="popup_message">{text}</div>
      <PropagateLoader color="#1876f2" size={30} loading={loading} />
    </div>
  </div>
  )
}

export default ActivateForm