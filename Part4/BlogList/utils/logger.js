
// Keeping all console.logs in a seperate module

// Printing normal logs
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test'){
        console.log(...params)
    }
}

// Printing errors
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test'){
        console.error(...params)
    }
}
  
module.exports = {
    info, error
}