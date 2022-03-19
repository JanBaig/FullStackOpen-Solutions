import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  // Have this hold the name or the obj itself?
  const [single, setSingle] = useState({});

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

        <button onClick={() => {
            setSingle(element)
            console.log(element);

          }}> view </button>
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
    else { // in between 1-10
      render = 
      <div>
        {/* <SingleData country={single}/> */}
        
        {console.log(Object.keys(single).length === 0)}
        {Object.keys(single).length === 0? countryList : <SingleData country={single}/>}
        
      </div>;
    }

    return(
      <div>
        {render}
      </div>
    )
  }

  // Rendering specfic statistics
  function SingleData( {country} ){ // an object
    console.log(country);
   
    return (
      <div>

        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]} </p>
        <p>Population: {country.population} </p>
        <p>Language(s): {Object.keys(country.languages).map((lang, index) => <li key={index}>{country.languages[lang]}</li>)}</p>
        <img src={country.flags.png} width="200" height = "100"></img>

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


//Problems: 
//1. Need to re-initialize the single data state (after single data component is rendered)so that the user can click on other buttons 
//2. Need to display the single data (not on btn click) outside of a list (it is in fitlered and filtered is a list). How to un-list?

// Very helpful: https://youtu.be/eGaaw1Py2aY 
