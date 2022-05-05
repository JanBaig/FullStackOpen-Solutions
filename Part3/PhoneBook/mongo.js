const mongoose = require('mongoose'); 
let password = "";
let nameIn = "";
let numberIn = "";

if (process.argv.length < 5 && process.argv.length < 3){
    console.log('Please provide follow: node mongo.js <password> <name> <phoneNum>')
    process.exit(1);
}

password = process.argv[2];

const url = `mongodb+srv://janatB:${password}@cluster0.rqtkb.mongodb.net/phoneBookDB?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const personData = new mongoose.model('person', personSchema);

if (process.argv.length == 5){

    nameIn = process.argv[3];
    numberIn = process.argv[4];

    const data = new personData({
        name: nameIn,
        number: numberIn,
        id: Math.floor(Math.random()*100)
    })

    data.save().then(result =>{
        console.log(`Added [${nameIn} ${numberIn}] into phoneBookDB`);
        mongoose.connection.close();
    })

} 
else if (process.argv.length == 3){
    console.log("PhoneBook: ")
    personData.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

// Testing with this comment