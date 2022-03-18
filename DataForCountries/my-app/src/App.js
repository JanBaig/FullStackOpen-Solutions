import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  function changed(event){
    setInput(event.target.value);
  }

  //Fetching from API
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setData(response.data);
      
    })

  }, [])


  // Display the Data - Case sensitive?
  function DisplayData(){

    // Filtering based on search value
    var filtered = data.filter(element => element.name.common.includes(input))

    var display = filtered.map((element, index) => {
      return (
        <li key={index}>
         {element.name.common}
        </li>
      )
    })

    if (filtered.length == 1){
      console.log("here");
    }

    return(
      <div>
        <ul>
          {display}
        </ul>

      </div>
    )

  }



  return (
    <div>
      <h2>Data for Countries</h2>
      <input type={'text'} value={input} onChange={changed}/>


      <DisplayData />

    </div>

    
  );
}

export default App;


