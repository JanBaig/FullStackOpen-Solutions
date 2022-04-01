import axios from "axios";
import React from "react";
import noteService from "../Services/notes";

function Person({ data }){

    // Function for deleting
    function deletingBtn(){
        const baseUrl = 'http://localhost:3001/persons';

        var result = window.confirm(`Delete #${data.id}?`);

        if (result){ // If the user clicks OK
            noteService.remove(data.id); 
            window.location.reload(true);  
        }

    }

    return(
        <tr>
            <td>{data.name}</td>
            <td>{data.number}</td>
            <td>
                <button onClick={deletingBtn}>Delete</button>
            </td>
        </tr>
        
    )
}

export default Person