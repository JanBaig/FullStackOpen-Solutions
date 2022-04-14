// Creating a Node Server

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

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

// Displays Single Persons
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`)
})


// Implement error handling for creating new entries. The request is not allowed to succeed, if:

// The name or number is missing
// The name already exists in the phonebook

// Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.: