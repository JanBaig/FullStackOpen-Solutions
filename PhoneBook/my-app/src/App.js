import React, {useEffect, useState} from "react";
import Input from "./Components/Input"
import Person from "./Components/Person";
import axios from 'axios';

function App() {

  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")
  const [search, setSearch] = useState("")
  const [persons, setPersons] = useState([])

  // Fetching data from the JSON server
  useEffect(() => {
    // Make sure to run the JSON server first
    axios.get('http://localhost:3001/persons')
    .then(response => {
    setPersons(response.data);
    })
  }, [])
  
  function addData(event){
    event.preventDefault();

    const newObj = {
      name: newName,
      number: newNum
    }

    var noDuplicates = persons.every((element)=>element.name != newName)

    if (noDuplicates){
      
      
      // Writing to the Server
      axios 
      .post('http://localhost:3001/persons', newObj)
      .then(response => {
        setPersons(persons.concat(newObj));
       
      })

    }
    else{
      alert(`${newName} is alread in the PhoneBook.`)
    }

    // Want to reset if passes conditions or not
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

