import React from "react";

function Input({ placeholder, value, setting}){

    return(
        <div>
          <input placeholder={placeholder} value={value} onChange={(event)=> setting(event.target.value)}/>
        </div>
    )
}

export default Input