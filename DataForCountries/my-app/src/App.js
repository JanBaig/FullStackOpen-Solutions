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

  // Display the Data
  function DisplayData(){

    // Filtering based on search value (Case insensitive)
    var filtered = data.filter(element => element.name.common.toLowerCase().includes(input.toLowerCase()))

    var countryList = filtered.map((element, index) => {
      return (
        <div key={index}>

        <li>
          {element.name.common} 
        <button>view</button>
        </li>
        </div>
      )
    })

    // Render Conditions
    // PROBLEM: can't pass in filtered for more than one
    var render;
    if (filtered.length == 1){
      render = <SingleData country={filtered}/>
    }
    else if (filtered.length > 10){
      render = <p>Be Specfic!</p>
    }
    else {
      render = 
      <div>
        <ul>{countryList}</ul>
        
      </div>;
    }

    return(
      <div>
        {render}
      </div>
    )
  }

  // Rendering specfic statistics
  function SingleData( {country} ){
   
    return (
      <div>

        <h2>{country[0].name.common}</h2>
        <p>Capital: {country[0].capital[0]} </p>
        <p>Population: {country[0].population} </p>
        <p>Language(s): {Object.keys(country[0].languages).map((lang, index) => <li key={index}>{country[0].languages[lang]}</li>)}</p>
        <img src={country[0].flags.png} width="200" height = "100"></img>

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


