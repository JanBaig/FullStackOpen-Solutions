import React, {useState} from "react";

function Statistics(props){
    //The prop is going to be a JS object
    var array = props.data;
    var display = array.map((element) => 
    <tr key={element.id}>
      <td>{element.id}: </td>
      <td>{element.value}</td>
    </tr>);

    return(
      <div>
        <table>
          <tbody>
            {display}
          </tbody>
        </table>
      </div>
    )
}

function Buttons(props){

  return(
    <div>
      <button onClick={props.functionality}>{props.type}</button>
    </div>

  )
}

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);
    const [avg, setAvg] = useState(0);
    const [positive, setPositive] = useState(0);

    function onClicked1(){
      setGood(good+1);
      setTotal(total+1)
      setAvg((good+bad+neutral)/3)
      setPositive(good/(bad+neutral+good)*100)

    };

    function onClicked2(){
      setNeutral(neutral+1);
      setTotal(total+1)
      setAvg((good+bad+neutral)/3)
      setPositive(good/(bad+neutral+good)*100)

    };

    function onClicked3(){
      setBad(bad+1);
      setTotal(total+1)
      setAvg((good+bad+neutral)/3)
      setPositive(good/(bad+neutral+good)*100)

    };

    const stats = [
      {id: "Good", value: good}, 
      {id: "Neutral", value: neutral},
      {id: "Bad", value:bad}, 
      {id: "Total", value:total}, 
      {id: "Avg", value: avg}, 
      {id: "Positive", value: positive + "%"}
    ]
    //Display insufficient data passed if not all pressed
    // Display enter data if none passed

    const dataGiven = total > 0 ;
  
    return (
      <div>
        <h2>Give Feedback</h2>
        <Buttons type="Good" functionality={onClicked1}/>
        <Buttons type="Neutral" functionality={onClicked2}/>
        <Buttons type="Bad" functionality={onClicked3}/>

        {dataGiven ? <Statistics data={stats}/> : <div>No feedback given</div>}

      </div>

    )
}

export default App;