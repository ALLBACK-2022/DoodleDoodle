import axios from 'axios';
import React, { useEffect } from 'react';
import GetImage from './GetImage';

const baseURL = 'http://localhost:5000/results/similarity';
function GetSimilarity({setName, setValue}){
    function getResult(){
        fetch(baseURL, {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
            },
            body: JSON.stringify({
                "draw-id" : 1
            }),
        }).then(res => res.json())
        .then(res => setName(res.name))
        .then(res => setValue(res.value))
        return res
    }
    return getResult()
}

export default GetSimilarity