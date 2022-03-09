import React from "react";

function Person({ data }){

    return(
        <tr>
            <td>{data.name}</td>
            <td>{data.number}</td>
        </tr>
        
    )
}

export default Person