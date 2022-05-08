
// Creating a Node Server

const express = require('express');
const app = express();
// Using the env variables 
require('dotenv').config();
let port = process.env.PORT;
var morgan = require('morgan');
const cors = require('cors');
const personData = require('./models/person')

if (port == null || port == "") {
  port = 3001;
}

// For the Frontend
app.use(express.static('build'))

// Defining the MiddleWare
morgan.token('data', function func (req, res) {
    return JSON.stringify(req.body)
})
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use(cors());

const generateId = () => {
    const newId = Math.random() * 100;
    return Math.round(newId);
}

var persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Default
app.get('/', (req, res) => {
    res.send("Hello!");
})

// Displaying All the Data
app.get('/api/persons', (req, res) => {
    //res.json(persons);

    personData.find({}).then(result => {
        res.json(result)
    })

    //mongoose.connection.close();

    // MONGOOSE is defined in the other file, not this one... shows error

})

// Displays General PhoneBook Info
app.get('/info', (req, res) => {
    var length = persons.length;
    res.write('<h1>PhoneBook Info</h1>')
    res.write(`The PhoneBook has info for ${length} people. `)
    res.write(Date());
    res.end();
})

// Displays Single Person (Included the next parameter for error handling)
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    
    // .then() executes the callback function if the search is successful
    personData.findById(id)
    .then(foundPerson=> {
        if (foundPerson){
            res.json(foundPerson)

        } else { 
            // If the note == null (Not found)
            res.status(404).end()
        }
    })
    .catch((error)=> {
        console.log(error.name)
        next(error)
    })
    
})

// Deleting a Person
app.delete('/api/persons/:id', (req, res, next) => {
    // persons = persons.filter(person => person.id != id);
    const ID = req.params.id.toString()

    personData.deleteOne( {_id: ID} )
    .then(deletedNote => {
        console.log(deletedNote)
    })
    .catch(error => next(error))

    // IF the ID DNE
    //res.status(204).end()
    
})

// Creating a new Person using the client's given information (Server determines the resource's address)
app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (body.name.length <= 0){
        return res.status(400).json(
            {error: 'Name missing'}
        );
    }

    if (body.number.length <= 0){
        return res.status(400).json(
            {error: 'Number missing'}
        );
    }

    const newPerson = new personData({
        name: body.name,
        number: body.number,
        id: generateId()
    })

    console.log(newPerson)
    newPerson.save().then(savedPerson => {
        res.json(savedPerson);
        console.log(savedPerson)
    })

    // persons = persons.concat(person);
    // res.json(person);
})

// Updating a existing Person using the Client's given information (Server does not determine the resouce's address)
app.put('/api/persons/:id', (req, res) => {
    const body = req.body
    
    personData.find({name: body.name})
    .then((duplicate) => {
        console.log('A duplicate was found...', duplicate)
        personData.findOneAndUpdate({ name: body.name }, { number: body.number }, {new: true}).then(updated => {
            res.json(updated)
        })
    })
    .catch(error => console.log('No duplicates. Error: ', error.message))

})

app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
});


// For error Handling (Middleware)
const errorHandler = (error, req, res, next) => {

    console.log(error.name)
    console.log(error.message)
    if (error.name === 'CastError'){
        return res.status(400).send({ error: "Misformatted ID"})
    }

    // If the error isn't a CastError, we pass it to the default express Error Handler
    
    next(error)

}
app.use(errorHandler)


// Recall that we are randomly generating the person ID (Can fix this later on to be ordered)

// PUT vs POST: PUT if the client determines the resulting resource's address, POST if the server does it

