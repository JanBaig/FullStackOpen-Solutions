import React from "react";
import axios from "axios";
const baseURL = '/api/login'

function login(credentials){

    const response = axios.post(baseURL, credentials)
    return response

}

export default { login }