// Creating a Node Server

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
var morgan = require('morgan');
const cors = require('cors');


// Defining the MiddleWare

morgan.token('data', function func (req, res) {
    return JSON.stringify(req.body)
})
app.use(express.json());

// For the Frontend
app.use(express.static('build'))

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

// Displaying the Data
app.get('/api/persons', (req, res) => {
    res.json(persons);

})

// Displays Info
app.get('/info', (req, res) => {
    var length = persons.length;
    res.write('<h1>PhoneBook Info</h1>')
    res.write(`The PhoneBook has info for ${length} people. `)
    res.write(Date());
    res.end();
})

// Displays Single Person
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const note = persons.find(note => note.id == id);  

    // If invalid note, then note = undefined and error is fired
    if (note) { 
        res.json(note)
    } else {
        res.status(404).end()
    }

})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id != id);

    // IF the ID DNE
    res.status(204).end()
    
})

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

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number

    }

    persons = persons.concat(person);
    res.json(person);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}...`)
})

// Recall that we are randomly generating the person ID