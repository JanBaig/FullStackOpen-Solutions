
// Keeping all console.logs in a seperate module

// Printing normal logs
const info = (...params) => {
    console.log(...params)
}

// Printing errors
const error = (...params) => {
console.error(...params)
}
  
module.exports = {
info, error
}