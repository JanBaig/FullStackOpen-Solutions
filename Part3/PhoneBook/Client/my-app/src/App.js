import React, {useEffect, useState} from "react";
import Input from "./Components/Input"
import Person from "./Components/Person";
import axios from 'axios';
import noteService from './Services/notes';
import './index.css';
import Notification from "./Components/Notification";

function App() {

  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")
  const [search, setSearch] = useState("")
  const [persons, setPersons] = useState([])
  const [notif, setNotif] = useState(null);

  // Fetching data from the JSON server
  useEffect(() => {

    // Make sure to run the JSON server first
    
    // Getting all the notes stored in the backend
    noteService.getAll()
    .then(initialNotes => {
      setPersons(initialNotes);
    })

  }, [])
  
  function addData(event){
    event.preventDefault();

    const newObj = {
      name: newName,
      number: newNum,
      id: persons.length +1
    }

    var noDuplicates = persons.every((element)=>element.name != newName)
 
    if (noDuplicates){
      
      // Savings the notes to the Backend Server (POST request)
      
      noteService.create(newObj)

        // Returned note is actually just the response.data
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote));
        setNotif(`${newObj.name} added successfully`);
      })
      .catch(error => {
        if (error.response){
          setNotif('Error: ' + error.response.data.error)
        } 
        else if (error.request){
          console.log(error.request);
        }
      })

      setTimeout(() => {
          setNotif(null);
        }, 5000)

    }

    else{
      // The goal now is to replace the previous number with the new number. (The name stays the same)

      var prevObj = {};

      for (var i=0; i<persons.length; i++){
        if (persons[i].name == newObj.name){
          prevObj = persons[i];
        }
      }

      axios.put(`/api/persons/${prevObj.id}`, newObj)
      .then((response) => {
        setPersons(persons.map(obj => obj.id !== prevObj.id ? obj : response.data))
        setNotif(`${newObj.name}'s number replaced`);

      })
      .catch((error) => {
        setNotif("Error: "+ error.response.data.error)
      })

      setTimeout(() => {
        setNotif(null);
      }, 5000)
      
    }

    // Want to reset regardless 
    setNewName("");
    setNewNum("");
    
  }

  function fiteredDisplay(){

   // .toLowerCase() for case insensitivity
    const filtered = persons.filter((element)=>{
      return element.name.toLowerCase().includes(search.toLowerCase());
    })

    var  displayObj = filtered.map(function(data, index){
      return(
        <Person key={index} data={data}/>
          
      )
    })

    return(

        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Delete Options</th>
            </tr>
            {displayObj}
          </tbody>
        </table>

    )
}

  return (
    <div >

      <h1>Phone Book</h1>
      
      <form onSubmit={addData}>
        <div>

          {notif == null ? <Notification message={null} /> : <Notification message={notif} />}

          <h3>Search Bar</h3>

          <Input 
            placeholder={"Search for ..."}  
            value={search}
            setting={setSearch}
          />

          <h3>Add New</h3>

          <Input 
            placeholder={"Enter Name"}  
            value={newName}
            setting={setNewName}
          />

          <Input 
            placeholder={"Enter Number"} 
            value={newNum} 
            setting={setNewNum}
          />

          <br />

          <button type="submit">Add</button>
        </div>
      </form>

      <h3>Numbers</h3>
    
      {fiteredDisplay()}
      
    </div>
  );
}

export default App;