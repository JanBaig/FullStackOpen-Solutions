import React, {useState} from "react";
import Input from "./Components/Input"
import Person from "./Components/Person";

function App() {

  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")
  const [search, setSearch] = useState("")
  const [persons, setPersons] = useState([
    {name: "Janat", number: "123 456 789"},
    {name: "Henry", number: "123 456 789"},
    {name: "Jonah", number: "123 456 789"},
    {name: "Derek", number: "123 456 789"}
  ])
  
  function addData(event){
    event.preventDefault();

    const newObj = {
      name: newName,
      number: newNum
    }

    var noDuplicates = persons.every((element)=>element.name != newName)

    if (noDuplicates){
      setPersons(persons.concat(newObj));
    }
    else{
      alert(`${newName} is alread in the PhoneBook.`)
    }

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

