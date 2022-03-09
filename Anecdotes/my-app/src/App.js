import React, { useState } from 'react';

function App() {
  
  const [anecdotesDisplay, setAnecdotesDisplay] = useState("");
  const [counter, setCounter] = useState(0);
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  function clickedOrder(){
    setAnecdotesDisplay(anecdotes[counter]);
    setCounter(counter+1);
    
    if (counter === anecdotes.length){
      setCounter(0);
    }
  }

  function clickedRandom(){
    // Randomly choosing an index
    setAnecdotesDisplay(anecdotes[Math.floor(Math.random()*anecdotes.length)])
  }

  function voting(){
    // need to find current index of the array
    for (let i=0; i<anecdotes.length; i++){
      if (anecdotes[i] == anecdotesDisplay){

        //coping the array
        var copy = [...points] 
        copy[i] += 1;
        setPoints(copy)

        return (
          <div>
            <p>Current votes: {points[i]}</p>
          </div>
        );

      }
    }
  }

  //Getting the current index
  var curr_index =0;
  for (let i=0; i<anecdotes.length; i++){
    if (anecdotes[i] == anecdotesDisplay){
      curr_index=i;
    }
  }

  //Most voted
  var largest=0;
  var large_index=0;
  for (let i=0; i<points.length; i++){
    if (points[i]> largest){
      largest = points[i];
      large_index=i;
    }
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <div>
        {anecdotesDisplay}
        <p>Votes: {points[curr_index]}</p>
      </div>
      <button onClick={voting}>Vote</button>
      <button onClick={clickedRandom}>Click Here</button>

      <h2>Most Voted Anecdote</h2>
      {anecdotes[large_index]}
      <p>Votes: {largest}</p>

    </div>
  );
}

export default App;

// Improvement: Need to stop using so many for loops. Find another way

