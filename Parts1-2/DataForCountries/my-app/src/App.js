import React, { useState, useEffect } from "react";
import axios from 'axios';
import Weather from './Weather';

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  // Have this hold the name or the obj itself?
  const [single, setSingle] = useState({});
  const [run, setRun] = useState(false);

  function changed(event){
    setInput(event.target.value);
    // Resetting the state so that the previous country searched is disregarded
    setSingle({});
  }

  //Fetching from Country API
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
            setSingle(element);

          }}> view </button>
        </li>
        </div>
      )
    })

    // Render Conditions
    var render;
    if (filtered.length == 1){
      render = <SingleData country={filtered[0]}/>
    }
    else if (filtered.length > 10){
      render = <p>Be Specfic!</p>
    }
    else { // in between 1-10
      render = 
      <div>
        
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

    return (
      <div>

        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]} </p>
        <p>Population: {country.population} </p>
        <p>Language(s): {Object.keys(country.languages).map((lang, index) => <li key={index}>{country.languages[lang]}</li>)}</p>
        <img src={country.flags.png} width="100" height = "50"></img>

        <h3>Weather in {country.capital[0]}</h3>
        
        <Weather capital = {country.capital[0]}/>
        
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

// How can I set the state to be true when we call the singleData component?