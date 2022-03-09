import React from "react"

function Header({ course }){
  return(
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

function Part({ part, exercises}){

  return(
    <div>
      <p> {part} {exercises}</p>
    </div>

  )
}

function Content({ course }){
    //Use map
    var content_array = course.parts.map(function(part){
        return (
        <div key={part.id}>
          <Part part={part.name} exercises={part.exercises} />
        </div>
      )
    })

    return(
      <div>
        {content_array}
      </div>

    )
  }

function Total({ course }){
    // .reduce() reduces an array to a single val. Here, it recuded the course.parts array into one value: the total

    var total = course.parts.reduce((total, item)=> {
      return total + item.exercises
    }, 0);

    return(
      <div>
        <p>Total Excercises: {total}</p>
      </div>
    )
}

function Course({ course }){

    const array_test = course.map(function(element, index){
    return (
      <div key={index}>
        <Header course={element} />
        <Content course={element}/>
        <Total course={element}/>
        
      </div>
    )
  })
  
    return(
        <div>
          {array_test}
        </div>
    )

}

export default Course